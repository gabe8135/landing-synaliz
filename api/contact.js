const RESEND_ENDPOINT = "https://api.resend.com/emails";
const TO_EMAIL = "gabriel@synaliz.com";

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

async function parseBody(request) {
  if (typeof request.body === "string") return JSON.parse(request.body || "{}");
  if (request.body && typeof request.body === "object") return request.body;

  const chunks = [];
  for await (const chunk of request) {
    chunks.push(chunk);
  }

  return JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
}

module.exports = async function handler(request, response) {
  if (request.method !== "POST") {
    return response.status(405).json({ error: "Metodo nao permitido." });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return response.status(500).json({ error: "RESEND_API_KEY nao configurada." });
  }

  let body;
  try {
    body = await parseBody(request);
  } catch {
    return response.status(400).json({ error: "Dados invalidos." });
  }

  const nome = clean(body.nome);
  const contato = clean(body.contato);
  const projeto = clean(body.projeto);

  if (!nome || !contato || !projeto) {
    return response.status(400).json({ error: "Preencha nome, contato e projeto." });
  }

  const from = process.env.RESEND_FROM || "Synaliz <onboarding@resend.dev>";
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
      to: [TO_EMAIL],
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
    return response.status(502).json({ error: "Nao foi possivel enviar agora." });
  }

  return response.status(200).json({ ok: true });
};
