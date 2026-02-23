# ReconNeCT — Static Site

Site institucional do projeto ReconNeCT — ICMC / USP.  
HTML estático puro. Sem WordPress. Sem servidor. Publicável no GitHub Pages em minutos.

## Estrutura

```
reconnect/
├── index.html           ← Home (hero animado + grid de pesquisa)
├── about.html           ← Descrição do projeto
├── publications.html    ← Lista completa de publicações
├── people.html          ← Equipe, colaboradores, ex-membros
├── activities.html      ← Grupos de leitura, workshops, seminários
├── contact.html         ← Formulário de contato
├── css/
│   └── style.css        ← Estilos globais (tokens, nav, footer, cards…)
└── js/
    └── main.js          ← Tudo em um lugar: nav, footer, canvas, reveal
```

## Como atualizar

| O que mudar | Onde editar |
|---|---|
| Links do menu | `js/main.js` — bloco `navHTML` |
| Rodapé | `js/main.js` — bloco `footerHTML` |
| Cores / fontes | `css/style.css` — bloco `:root` no topo |
| Conteúdo de qualquer página | O arquivo `.html` correspondente |


## Formulário de contato (contact.html)

O formulário usa [Formspree](https://formspree.io) — gratuito, sem backend.

1. Crie conta em formspree.io
2. Crie um form e copie o ID (ex: `xpwzjkdn`)
3. Em `contact.html`, substitua `YOUR_FORM_ID`:
```html
<form action="https://formspree.io/f/SEU_ID_AQUI" ...>
```

As respostas chegam direto no seu e-mail.
