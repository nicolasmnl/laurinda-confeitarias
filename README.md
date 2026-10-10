# Laurinda Confeitaria

Site da **Laurinda Confeitaria**, confeitaria artesanal de bolos, doces, sobremesas e kits para ocasiões especiais.

🌐 **Site:** https://laurinda-confeitaria.vercel.app
📸 **Instagram:** [@laurinda_confeitaria](https://www.instagram.com/laurinda_confeitaria/)

## Sobre o projeto

Uma landing page de página única que apresenta a confeitaria e leva o visitante a pedir um orçamento pelo WhatsApp. As seções são:

- **Produtos:** bolos, doces, sobremesas, kits e encomendas especiais
- **Galeria** com todas as fotos, filtrável por categoria (bolos e tortas, doces, bastidores)
- **Como funciona o orçamento**, em três passos
- **Contato** direto pelo WhatsApp

O site é feito só com HTML, CSS e JavaScript puro, sem framework e sem etapa de build.

```
index.html          página
assets/css/         estilos
assets/js/main.js   scripts e configuração do WhatsApp
assets/images/      fotos
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
- **Fotos:** ficam em `assets/images/`. Enquanto um arquivo referenciado não existir, a página mostra um espaço reservado com o nome esperado.

| Arquivo | Onde aparece |
|---|---|
| `images/bolo-01.jpg` | Topo da página e galeria |
| `images/bolo-02.jpg`, `doces-01.jpg`, `torta-01.jpg`, `bolo-04.jpg` | Cards de produtos (bolos, doces, sobremesas, kits) e galeria |
| `images/bolo-03.jpg`, `doces-02.jpg`, `bastidores-01.jpg` | Galeria |
| `images/og-image.jpg` | Prévia ao compartilhar o link (1200×630, ainda não existe) |

### Adicionando fotos na galeria

Copie um bloco `<figure class="gallery-item">` dentro de `.gallery-grid` no `index.html`, troque o arquivo, o `alt`, a legenda e o `data-category` (`bolos`, `doces` ou `bastidores`). Uma categoria nova pede também um botão `data-filter` com o mesmo nome.
