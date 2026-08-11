# Brand assets — fontes originais

Arquivos originais em alta resolução usados para gerar o logo/favicon/ícones do app (2026-08-11). Não são servidos pelo site nem precacheados pelo PWA - ficam aqui só como referência caso seja preciso regenerar algum tamanho no futuro.

- `glossio-logo-color-hd.png` (840×840, fundo transparente) — marca "G" em gradiente azul/verde. Fonte de `public/logo.png` (navbar).
- `glossio-logo-black-hd.png` (906×984, fundo transparente) — marca "G" preta sólida.
- `glossio-logo-darkbg-hd.png` (1008×1116, sem transparência) — mockup do ícone do app (quadrado navy escuro `#030A18` + marca branca). Recortado para gerar `public/icons/icon-*.png` e `public/icons/icon-maskable-*.png` (ver `git log` de `public/icons/` para o processo exato).
- `Glossio_favicon.png` (64×64, fundo transparente) — já usado diretamente como `public/favicon.png`.

Cor de fundo do ícone do app: `#030A18` (amostrada diretamente do arquivo `glossio-logo-darkbg-hd.png` - mais escura que o `#2C3E63` já usado como `theme_color`/accent do resto do produto; nenhuma das duas cores foi alterada, ficaram como estão).
