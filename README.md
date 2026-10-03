# Laurinda Confeitaria

Site da **Laurinda Confeitaria**, confeitaria artesanal de bolos, doces, sobremesas e kits para ocasiões especiais.

🌐 **Site:** https://laurinda-confeitaria.vercel.app
📸 **Instagram:** [@laurinda_confeitaria](https://www.instagram.com/laurinda_confeitaria/)

## Sobre o projeto

Uma landing page de página única que apresenta a confeitaria e leva o visitante a pedir um orçamento pelo WhatsApp. As seções são:

- **Produtos:** bolos, doces, sobremesas, kits e encomendas especiais
- **Galeria** de fotos e vídeo dos bastidores
- **Como funciona o orçamento**, em três passos
- **Contato** direto pelo WhatsApp

O site é feito só com HTML, CSS e JavaScript puro, sem framework e sem etapa de build.

```
index.html          página
assets/css/         estilos
assets/js/main.js   scripts e configuração do WhatsApp
assets/images/      fotos
assets/videos/      vídeo
```

## Rodando localmente

Basta abrir o `index.html` no navegador.

## Deploy

O site fica hospedado na [Vercel](https://vercel.com), que está conectada a este repositório:

- um push na `main` publica o site em produção;
- um push em outras branches gera um link de prévia.

## Editando o conteúdo

- **WhatsApp:** o número e a mensagem pré-preenchida ficam em `CONFIG`, no topo de `assets/js/main.js`. O número vai só com dígitos, com DDI e DDD. Os links do `index.html` repetem o número para quem navega sem JavaScript, então troque nos dois lugares.
- **Textos:** ficam em `index.html`.
- **Fotos e vídeo:** salve o arquivo em `assets/` com o nome esperado. Enquanto o arquivo não existir, a página mostra um espaço reservado.

| Arquivo | Onde aparece | Proporção |
|---|---|---|
| `images/hero.jpg` | Topo da página | 4:5 |
| `images/bolo-01.jpg`, `doces-01.jpg`, `sobremesa-01.jpg`, `kits-01.jpg` | Cards de produtos | 4:5 |
| `images/galeria-01.jpg` … `galeria-04.jpg` | Galeria | 4:5, 1:1, 3:4, 3:2 |
| `videos/video.mp4` + `images/video-poster.jpg` | Bastidores | 9:16, sem áudio, < 8 MB |
| `images/og-image.jpg` | Prévia ao compartilhar o link | 1200×630 |
