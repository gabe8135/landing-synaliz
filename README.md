# Landing Synaliz

Landing page da Synaliz convertida para Next.js, React e Tailwind.

## Rodar localmente

```bash
npm install
npm run dev
```

Depois acesse:

```text
http://localhost:3000
```

O antigo Live Server em `localhost:5500` não executa as rotas do Next nem a API do formulário.

## Variáveis de ambiente

Crie um arquivo `.env.local` ou configure na Vercel:

```env
RESEND_API_KEY=sua_chave_do_resend
CONTACT_TO_EMAIL=ramos.analista@gmail.com
```

Opcional, apenas depois de verificar o domínio no Resend:

```env
RESEND_FROM="Synaliz <gabriel@synaliz.com>"
```
