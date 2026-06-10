import { NextResponse } from "next/server";

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const DEFAULT_TO_EMAIL = "ramos.analista@gmail.com";

function clean(value) {
  return String(value || "").trim();
}

function escapeHtml(value) {
  return clean(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "RESEND_API_KEY nao configurada." }, { status: 500 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Dados invalidos." }, { status: 400 });
  }

  const nome = clean(body.nome);
  const contato = clean(body.contato);
  const necessidade = clean(body.necessidade || body.projeto);

  if (!nome || !contato || !necessidade) {
    return NextResponse.json({ error: "Preencha nome, contato e necessidade." }, { status: 400 });
  }

  const from = process.env.RESEND_FROM || "Synaliz <onboarding@resend.dev>";
  const to = process.env.CONTACT_TO_EMAIL || DEFAULT_TO_EMAIL;
  const nomeHtml = escapeHtml(nome);
  const contatoHtml = escapeHtml(contato);
  const necessidadeHtml = escapeHtml(necessidade).replace(/\n/g, "<br>");
  const previewText = clean(necessidade).slice(0, 120);

  const resendResponse = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `Novo contato Synaliz: ${nome}`,
      text: [
        "Novo contato pelo site da Synaliz",
        "",
        `Nome: ${nome}`,
        `Contato: ${contato}`,
        "",
        "Necessidade:",
        necessidade,
      ].join("\n"),
      html: `
        <div style="margin:0;padding:0;background:#07111b;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#07111b;padding:32px 14px;">
            <tr>
              <td align="center">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;border:1px solid rgba(0,245,255,.22);border-radius:24px;overflow:hidden;background:#0d1b28;color:#f4f6f8;font-family:Arial,Helvetica,sans-serif;">
                  <tr>
                    <td style="padding:28px 28px 18px;background:linear-gradient(135deg,#0f2a3d,#07111b);">
                      <p style="margin:0 0 10px;color:#00f5ff;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">Synaliz | Novo contato</p>
                      <h1 style="margin:0;color:#ffffff;font-size:28px;line-height:1.08;">Alguém quer conversar sobre um site.</h1>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:24px 28px 8px;">
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                        <tr>
                          <td style="padding:14px 16px;border:1px solid rgba(184,202,212,.18);border-radius:16px;background:rgba(255,255,255,.045);">
                            <p style="margin:0 0 4px;color:#b8cad4;font-size:12px;text-transform:uppercase;letter-spacing:1.2px;">Nome</p>
                            <p style="margin:0;color:#ffffff;font-size:18px;font-weight:700;">${nomeHtml}</p>
                          </td>
                        </tr>
                        <tr><td height="10"></td></tr>
                        <tr>
                          <td style="padding:14px 16px;border:1px solid rgba(184,202,212,.18);border-radius:16px;background:rgba(255,255,255,.045);">
                            <p style="margin:0 0 4px;color:#b8cad4;font-size:12px;text-transform:uppercase;letter-spacing:1.2px;">Contato</p>
                            <p style="margin:0;color:#ffffff;font-size:18px;font-weight:700;">${contatoHtml}</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:10px 28px 28px;">
                      <div style="padding:18px;border-radius:18px;background:rgba(0,245,255,.08);border:1px solid rgba(0,245,255,.24);">
                        <p style="margin:0 0 8px;color:#00f5ff;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1.4px;">Necessidade do cliente</p>
                        <p style="margin:0;color:#f4f6f8;font-size:17px;line-height:1.65;">${necessidadeHtml}</p>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:0 28px 28px;">
                      <p style="margin:0;padding:14px 16px;border-radius:999px;background:#00f5ff;color:#07111b;font-size:14px;font-weight:700;text-align:center;">
                        Responder este contato com uma proposta ou pergunta de diagnóstico
                      </p>
                    </td>
                  </tr>
                </table>
                <p style="margin:16px 0 0;color:#78909c;font-family:Arial,Helvetica,sans-serif;font-size:12px;">
                  Prévia: ${escapeHtml(previewText)}
                </p>
              </td>
            </tr>
          </table>
        </div>
      `,
    }),
  });

  if (!resendResponse.ok) {
    const errorText = await resendResponse.text();
    console.error("Erro Resend:", errorText);
    return NextResponse.json({ error: "Nao foi possivel enviar agora." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
