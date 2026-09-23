# Oportunidades de melhoria

Documento de análise do projeto — nada foi alterado no código. Lista o que já foi corrigido nesta ronda de trabalho, o que ficou pendente por decisão consciente, e o que encontrei de novo nesta última passagem.

_Última atualização: 2026-09-23_

---

## ✅ Já corrigido (histórico recente, para contexto)

| Área | O quê | Commit |
|---|---|---|
| Config | `VITE_PRODUCTION` sempre `true` por bug de parsing | `090e27a` |
| CI | Lint corrigido (6 erros) e passou a correr no CI | `910e854`, `0c7c707` |
| SEO | `robots.txt`/`sitemap.xml` fora do `dist` | `715e3cf` |
| SEO | Imagem Open Graph com hash instável | `150e301` |
| Bug | reCAPTCHA carregado em todas as páginas + duplicado no Contacto | `2b4eb9e` |
| Bug | Idioma forçado a PT, anulando o `LanguageDetector` | `cb151a1` |
| Bug | Duplicação de lógica no `ToastContext` | `6ab4105` |
| Segurança | `axios` atualizado (3 vulnerabilidades altas) | `258c524` |
| Código morto | Hooks/serviços não usados, `gh-pages`, `critical.css` órfão | `4067173` |
| Duplicação | `Navigation`/`HeaderMobile` deixaram de duplicar a lista de links | `a1f003c` |
| Acessibilidade | Seletor de idioma por teclado, toasts anunciados | `843d3ee` |
| SEO | Cada página com o seu próprio `canonical` (antes todas herdavam o `/`) | `98a31bc` |
| Polimento | Ano do rodapé, comentários em inglês, comentários mortos | `6d7b91a` |
| Conteúdo | Página 404 reescrita (frase quebrada, caminho inventado, sem link para casa) | _(a comitar)_ |
| Performance | Font Awesome (fontes `.ttf`/`.woff2` + CSS completo) trocado por `@fortawesome/react-fontawesome` com importação seletiva por ícone (16 usados) — `dist` caiu de 1,9 MB para 904 KB | _(a comitar)_ |

---

## 🆕 Encontrado nesta passagem (novo, ainda não reportado)

### ~~1. Conteúdo da página 404 não está pronto para produção~~ — corrigido

[src/pages/NotFound/NotFound.tsx](src/pages/NotFound/NotFound.tsx) tem texto que parece um rascunho esquecido:

```
RESOURCE DEPRECATION: The resource may have been
RESOURCE DEPRECATION: The resource may have been deprecated or removed from the system.
```

A primeira linha está cortada a meio da frase e repete-se na linha seguinte, já completa — parece ter sobrado de uma edição incompleta. Há também uma linha com um caminho inventado e incorreto:

```
Resource Path: /pedrotiagojesus.github.io/notfound.html
```

Este site é publicado na raiz do domínio (`pedrotiagojesus.github.io`, sem subpasta), por isso este caminho nunca corresponde a nada real — e é sempre o mesmo texto estático, independentemente do URL que o visitante tentou aceder. É também a única página do site totalmente em inglês "estilo terminal de erro" e sem tradução via `useVocabularyText`, destoando do resto do portfolio. Para uma página que um recrutador pode acabar por ver (link partilhado errado, typo no URL), vale a pena rever o tom e corrigir o texto.

### ~~2. Font Awesome continua a ser o maior custo do bundle, de longe~~ — corrigido

Medi os tamanhos finais do build:

| Ficheiro | Tamanho |
|---|---|
| `fa-solid-900.ttf` | 423,68 kB |
| `fa-brands-400.ttf` | 209,38 kB |
| `fa-solid-900.woff2` | 157,19 kB |
| `fa-brands-400.woff2` | 118,07 kB |
| `fa-regular-400.ttf` | 67,98 kB |
| `fa-regular-400.woff2` | 25,46 kB |

Só os `.ttf` (que servem de *fallback* para browsers muito antigos que já não são relevantes) somam **~700 kB**, mais do dobro do bundle JS da aplicação inteira (`react-vendor` + `index` juntos ficam pelos ~410 kB). O projeto usa menos de 20 ícones distintos em todo o site (setas, redes sociais, secções). Isto já tinha sido referido na primeira análise deste projeto, mas vale a pena reforçar com números concretos: a poupança potencial aqui é maior do que em qualquer outro ponto de performance do site.

Opções, por ordem de esforço:
- Remover os `.ttf` do `index.html`/CSS carregado (manter só `.woff2`, suportado por >97% dos browsers em uso).
- Trocar o carregamento da folha CSS completa por SVGs inline dos ícones realmente usados (~20), eliminando o Font Awesome como dependência.
- Usar `@fortawesome/react-fontawesome` + `fontawesome-svg-core` com importação seletiva por ícone (tree-shaking), em vez do pacote `-web` completo.

---

## 🟠 Pendente por decisão consciente

**`react-router-dom` v6 → v7**: fica 1 vulnerabilidade de severidade moderada por resolver (`npm audit`), porque corrigir exige saltar de major version (breaking changes na API de routing). Não forcei este upgrade sem o testar devidamente. Se quiseres avançar, é um trabalho isolado — vale a pena reservar uma sessão só para isto e testar a navegação toda depois.

---

## 🔵 Dependências desatualizadas (sem ação tomada)

```
Pacote               Atual     Última    Gap
react                18.3.1    19.3.0    major
react-dom             18.3.1    19.3.0    major
react-router-dom     6.30.6    7.18.4    major
react-i18next        15.1.0    17.0.15   major
react-helmet-async    2.0.5     3.0.0    major
react-ga4              2.1.0     3.0.1   major
i18next              23.16.4   26.4.2    major
zod                   4.1.13    4.6.5    minor
```

Nenhum destes é urgente isoladamente, mas o projeto acumula 6 majors em atraso nas dependências principais. Quanto mais tempo passar, maior o salto de cada futura migração. Sugiro planear isto como um trabalho dedicado (não misturado com features), idealmente um pacote de cada vez, com os testes e o `npm run build` a confirmar depois de cada um.

Vulnerabilidades no toolchain de build (`vite`, `rollup`, `postcss`, via `vitest`/`@vitejs/plugin-react`) continuam por resolver — só afetam o ambiente local/CI, nunca o site publicado, por isso ficam como prioridade baixa.

---

## 🟢 Cobertura de testes

Continua a existir só um ficheiro de teste (`src/config/env.test.ts`). Candidatos óbvios para os próximos, por seres lógica pura e fácil de testar sem mocks pesados:

- `normalizeApiError` ([src/api/errors.ts](src/api/errors.ts)) — vários formatos de erro do axios.
- `slugify` ([src/utils/text.ts](src/utils/text.ts)) — casos com acentos, espaços múltiplos, maiúsculas.
- O `reduce` de `useVocabularyText` ([src/utils/vocabulary.ts](src/utils/vocabulary.ts)) — caminhos inexistentes, aninhamento profundo.

---

## Verificado nesta passagem e confirmado que **não** é um problema

Para não repetir trabalho no futuro, deixo registado o que investiguei e concluí estar correto:

- **Canonical + Helmet**: confirmei no código-fonte do `react-helmet-async` que ele trata `<link rel="canonical">` como caso especial e substitui a tag estática do `index.html` corretamente — o fix do commit `98a31bc` não deixa duas tags `canonical` a competir.
- **Imagens dos cards (`Card.css`)**: usam a técnica de `padding-top: 56.25%` + `object-fit: cover`, por isso a largura/altura fixas (`1920x1080`) no `<img>` não causam distorção nem *layout shift*, mesmo quando a imagem real não é 16:9.
- Não há comentários `TODO`/`FIXME` esquecidos no código.
