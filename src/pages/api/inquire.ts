import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

const FROM_ADDRESS = 'S.A.G.E. Therapy Center <hello@sagetherapycenter.com>';
const TO_ADDRESS = 'sagetherapycenter@gmail.com';

function field(label: string, value: string | null): string {
  if (!value || !value.trim()) return '';
  return `
    <tr>
      <td style="padding:8px 12px;font-family:sans-serif;font-size:14px;color:#6b7280;white-space:nowrap;vertical-align:top">${label}</td>
      <td style="padding:8px 12px;font-family:sans-serif;font-size:14px;color:#111827;vertical-align:top">${value.trim()}</td>
    </tr>`;
}

function buildHtml(data: Record<string, string>): string {
  const rows = [
    field('Name', data.firstName),
    field('Email', data.email),
    field('Phone', data.phone),
    field('Preferred contact', data.preferredContact),
    field('Looking for', data.service),
    field('Session preference', data.sessionPreference),
    field('Source page', data.sourcePath),
    field('Context', data.context),
  ].filter(Boolean).join('');

  const messageRow = data.message?.trim()
    ? `<tr><td colspan="2" style="padding:16px 12px 8px;font-family:sans-serif;font-size:13px;color:#6b7280;font-weight:600;text-transform:uppercase;letter-spacing:0.05em">Message</td></tr>
       <tr><td colspan="2" style="padding:0 12px 16px;font-family:sans-serif;font-size:14px;color:#111827;line-height:1.6;white-space:pre-wrap">${data.message.trim()}</td></tr>`
    : '';

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>New Session Request</title></head>
<body style="margin:0;padding:0;background:#f9fafb">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%">
        <tr>
          <td style="background:#4a4761;border-radius:12px 12px 0 0;padding:24px 28px">
            <p style="margin:0;font-family:sans-serif;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:#9db8a6">S.A.G.E. Therapy Center</p>
            <p style="margin:8px 0 0;font-family:serif;font-size:22px;color:#ffffff">New Session Request</p>
          </td>
        </tr>
        <tr>
          <td style="background:#ffffff;border-radius:0 0 12px 12px;padding:12px 16px 20px">
            <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse">
              ${rows}
              ${messageRow}
            </table>
            <p style="margin:20px 12px 0;font-family:sans-serif;font-size:12px;color:#9ca3af;line-height:1.5">
              Submitted via sagetherapycenter.com. Reply directly to this email to respond to ${data.firstName?.trim() || 'the client'}.
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function buildText(data: Record<string, string>): string {
  const lines = [
    'S.A.G.E. Therapy Center — New Session Request',
    '---',
    data.firstName && `Name: ${data.firstName.trim()}`,
    data.email && `Email: ${data.email.trim()}`,
    data.phone && `Phone: ${data.phone.trim()}`,
    data.preferredContact && `Preferred contact: ${data.preferredContact.trim()}`,
    data.service && `Looking for: ${data.service.trim()}`,
    data.sessionPreference && `Session preference: ${data.sessionPreference.trim()}`,
    data.sourcePath && `Source page: ${data.sourcePath.trim()}`,
    data.message?.trim() && `\nMessage:\n${data.message.trim()}`,
    '---',
    `Submitted via sagetherapycenter.com`,
  ].filter(Boolean);
  return lines.join('\n');
}

export const POST: APIRoute = async ({ request }) => {
  let data: Record<string, string> = {};

  try {
    const form = await request.formData();
    for (const [key, value] of form.entries()) {
      if (typeof value === 'string') data[key] = value;
    }
  } catch {
    return new Response(JSON.stringify({ success: false }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  // Honeypot — bot filled the hidden field; respond 200 to avoid detection
  if (data.website) {
    return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  }

  const apiKey = import.meta.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('[inquire] RESEND_API_KEY is not set');
    return new Response(JSON.stringify({ success: false }), { status: 503, headers: { 'Content-Type': 'application/json' } });
  }

  const resend = new Resend(apiKey);
  const firstName = data.firstName?.trim() || 'New client';

  try {
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: TO_ADDRESS,
      replyTo: data.email?.trim() || undefined,
      subject: `New Session Request — ${firstName}`,
      html: buildHtml(data),
      text: buildText(data),
    });

    if (error) {
      console.error('[inquire] Resend error:', error);
      return new Response(JSON.stringify({ success: false }), { status: 502, headers: { 'Content-Type': 'application/json' } });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    console.error('[inquire] Unexpected error:', err);
    return new Response(JSON.stringify({ success: false }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};
