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
  const projeto = clean(body.projeto);

  if (!nome || !contato || !projeto) {
    return NextResponse.json({ error: "Preencha nome, contato e projeto." }, { status: 400 });
  }

  const from = process.env.RESEND_FROM || "Synaliz <onboarding@resend.dev>";
  const to = process.env.CONTACT_TO_EMAIL || DEFAULT_TO_EMAIL;
  const nomeHtml = escapeHtml(nome);
  const contatoHtml = escapeHtml(contato);
  const projetoHtml = escapeHtml(projeto).replace(/\n/g, "<br>");

  const resendResponse = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: "Novo briefing pelo site da Synaliz",
      text: [
        "Novo contato pelo site da Synaliz",
        "",
        `Nome: ${nome}`,
        `Contato: ${contato}`,
        "",
        "Projeto:",
        projeto,
      ].join("\n"),
      html: `
        <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6;">
          <h1 style="margin: 0 0 16px;">Novo briefing pelo site da Synaliz</h1>
          <p><strong>Nome:</strong> ${nomeHtml}</p>
          <p><strong>Contato:</strong> ${contatoHtml}</p>
          <p><strong>Projeto:</strong></p>
          <p>${projetoHtml}</p>
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
