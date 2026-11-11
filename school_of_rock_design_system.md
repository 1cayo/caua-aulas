# Design System & Guia de Estilo: School of Rock Brasil

Documento técnico de engenharia de design e análise visual da plataforma oficial da **School of Rock** (`schoolofrock.com.br`).

---

## 1. Visão Geral & Conceito

A identidade da School of Rock é fundamentada na **atitude, energia e sobriedade do Rock 'n' Roll ao vivo**, aliada à estrutura de uma rede global de ensino musical. Ao contrário de interfaces corporativas genéricas que abusam de gradientes suaves, ilustrações pastéis e cantos excessivamente arredondados, a School of Rock adota uma estética **industrial, angular, direta e de altíssimo contraste**.

### Princípios Fundamentais:
1. **Contraste Extremo:** Predomínio de preto profundo (`#000000`), branco puro (`#ffffff`) e vermelho elétrico vibrante (`#cf2435`).
2. **Tipografia de Cartaz (Gig Poster Aesthetic):** Títulos imponentes, ultra condensados, em caixa-alta, com entrelinhas compactas (proporção 1:1) e uso expressivo de tipografia vazada (*outline/text-stroke*).
3. **Formas Retilíneas e Cortes Industriais:** Ausência deliberada de cantos arredondados amigáveis (`border-radius: 0` na maioria dos botões e containers estruturais), reforçando solidez e pegada de palco.
4. **Fotografia Autêntica de Performance:** Imagens focadas em energia real, instrumentos reais, cabos, amplificadores e palco com iluminação dramática.

---

## 2. Paleta de Cores & Design Tokens

### 2.1 Cores Principais

| Nome do Token | Hexadecimal | RGB | Função no Design System |
| :--- | :--- | :--- | :--- |
| **`--color-sor-red`** | `#cf2435` | `rgb(207, 36, 53)` | **Ação Principal / Assinatura:** Botões primários, badges de destaque, ênfase em títulos e links ativos. |
| **`--color-sor-black`** | `#000000` | `rgb(0, 0, 0)` | **Base & Estrutura:** Fundo de cabeçalhos, rodapé, seções escuras, texto em fundos claros e botões contrastantes. |
| **`--color-sor-white`** | `#ffffff` | `rgb(255, 255, 255)` | **Legibilidade & Contraste:** Textos sobre fundos escuros, botões vazados, linhas e fundos neutros. |

### 2.2 Escala de Cinzas & Superfícies (Grayscale)

| Nome do Token | Hexadecimal | Uso no Sistema |
| :--- | :--- | :--- |
| **`--color-sor-dark-300`** | `#2f2f2f` | Cartões escuros secundários e fundos de formulários. |
| **`--color-sor-dark-200`** | `#333333` | Divisores sutis sobre fundo preto e estados de hover. |
| **`--color-sor-gray-500`** | `#636466` | Textos secundários, legendas e rótulos de apoio. |
| **`--color-sor-gray-400`** | `#939598` | Bordas neutras e ícones desativados. |
| **`--color-sor-gray-300`** | `#c7c8ca` | Bordas de botões vazados (`.button--hollow-grey`). |
| **`--color-sor-gray-200`** | `#e2e2e2` | Bordas de cards em modo claro e divisores de seção. |
| **`--color-sor-light-bg`** | `#f6f6f7` | Fundo alternado de blocos informativos e callouts (`info-callouts`). |

---

## 3. Tipografia & Hierarquia Visual

O sistema tipográfico da School of Rock opera com um contraste proposital entre uma fonte display **condensada pesada** (para energia e manchetes) e uma fonte grotesca geométrica **limpa e neutra** (para interface e leitura).

```
┌────────────────────────────────────────────────────────┐
│                   TRUMP GOTHIC PRO                     │
│    DISPLAY, TÍTULOS H1, H2, H3, MANCHETES DE PALCO     │
│   (Condensada, Caixa-Alta, Pesada, Entrelinha Justa)   │
└────────────────────────────────────────────────────────┘
                           ▼
┌────────────────────────────────────────────────────────┐
│                      HK GROTESK                        │
│         TEXTOS CORRIDOS, PARÁGRAFOS, FORMULÁRIOS       │
│    (Sans-Serif Neutra, Geométrica, Alta Legibilidade)  │
└────────────────────────────────────────────────────────┘
```

### 3.1 Famílias Tipográficas Oficiais

#### A. Fonte Display / Títulos: **Trump Gothic Pro**
- **Classes:** `trumpgothicpro`, `TrumpGothicWestW01-Bold`, `TrumpGothicWestW01-FB`
- **Pesos Utilizados:** Bold (700), Heavy / Black (900)
- **Transformação:** Sempre `text-transform: uppercase`
- **Entrelinha (Line Height):** Muito compacta, quase sempre igual ao tamanho da fonte (ex.: `45px/45px`, `70px/70px`).
- **Equivalentes Gratuitos (Google Fonts):**
  - **Bebas Neue** (peso 400 em caixa-alta entrega visual 95% idêntico)
  - **Barlow Condensed** (pesos 700 e 800)
  - **Anton** (para displays com peso extremo)

#### B. Fonte de Interface / Leitura: **HK Grotesk**
- **Classes:** `hk_groteskbold`, `hk_grotesksemibold`, `hk_groteskmedium`, `hk_groteskregular`, `hk_grotesklight`
- **Pesos Utilizados:** Regular (400), SemiBold (600), Bold (700)
- **Equivalentes Gratuitos (Google Fonts):**
  - **Inter**
  - **Plus Jakarta Sans**
  - **Montserrat** (com pesos intermediários)

### 3.2 Escala Tipográfica (Typography Scale)

| Elemento | Família | Tamanho / Line-Height | Estilo & Efeito |
| :--- | :--- | :--- | :--- |
| **Hero Massive Display** | Trump Gothic | `80px / 70px` (Desktop)<br>`52px / 48px` (Mobile) | Caixa-alta, `letter-spacing: 0` |
| **Hero Outline (Vazado)** | Trump Gothic | `70px / 70px` | `color: transparent; -webkit-text-stroke: 2px #000;` (ou `#fff`) |
| **H1 (Cabeçalho de Seção)** | Trump Gothic | `45px / 45px` (ou `40px / 40px`) | Caixa-alta, `letter-spacing: 0.7px`, cor `#cf2435` ou `#000` |
| **H2 (Subtítulos de Artigo)** | Trump Gothic | `35px / 35px` | Caixa-alta, cor `#cf2435` ou `#fff` |
| **H3 (Cards & Callouts)** | Trump Gothic | `25px / 28px` | Caixa-alta, peso bold |
| **Botões Principais** | HK Grotesk Bold | `16px / 56px` | Caixa-alta, `letter-spacing: 0.5px` |
| **Corpo de Texto (Body)** | HK Grotesk Regular | `16px / 26px` | Texto corrido, cor `#333333` ou `#636466` |
| **Legendas / Metadados** | HK Grotesk Medium | `13px / 18px` | Cor `#939598`, `text-transform: uppercase` |

---

## 4. Componentes de Interface (UI Components)

### 4.1 Sistema de Botões (`.button`)

Os botões da School of Rock são marcos do design system: **retangulares, altos (60px), com cantos vivos (`border-radius: 0`) e forte preenchimento horizontal**.

#### Especificações Base:
```css
.button {
  background: none;
  border: none;
  display: inline-block;
  font: 16px/56px 'HK Grotesk', 'Helvetica Neue', Arial, sans-serif;
  font-weight: 700;
  height: 60px;
  padding: 0 50px;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
  white-space: nowrap;
  box-sizing: border-box;
  border-radius: 0; /* Cantos industriais retos */
}
```

#### Variações Oficiais:

1. **Botão Vermelho Sólido (`.button--red` / `.button--full-red`):**
   - Estado Padrão: `background: #cf2435; border: 2px solid #cf2435; color: #ffffff;`
   - Estado Hover: `background: transparent; color: #cf2435;` (inversão total).
2. **Botão Vazado Vermelho (`.button--hollow-red`):**
   - Estado Padrão: `background: transparent; border: 2px solid #cf2435; color: #cf2435;`
   - Estado Hover: `background: #cf2435; color: #ffffff;`
3. **Botão Vazado Branco (`.button--hollow-white`):**
   - Estado Padrão: `background: transparent; border: 2px solid #ffffff; color: #ffffff;`
   - Estado Hover: `background: #ffffff; color: #000000;`
4. **Botão Vazado Preto (`.button--hollow-black`):**
   - Estado Padrão: `background: transparent; border: 2px solid #000000; color: #000000;`
   - Estado Hover: `background: #000000; color: #ffffff;`
5. **Botão com Tipografia Alternativa (`.button--alt-font`):**
   - Usa a fonte display `trumpgothicpro`, tamanho `25px`, criando impacto similar a ingressos de shows.

---

### 4.2 Cabeçalho de Navegação (`.page-header`)

- **Estrutura:** Fundo preto absoluto (`#000000`) ou transparente no hero que se torna fixo e sólido no scroll (`.page-header--sticky`).
- **Logo:** Logotipo marcante em vetor com a guitarra e a tipografia característica à esquerda.
- **Navegação:** Links horizontais em caixa-alta, cor `#ffffff`, com sublinhado/indicador vermelho no hover.
- **CTA do Header:** Botão de ação rápida à direita ("Encontre um Local" ou "Agende sua Aula") estilizado com altura alinhada à barra (`50px`).

---

### 4.3 Cards de Programas & Cursos (`.list-callout`)

- Fundo branco ou cinza claro (`#f6f6f7`) em contraste com imagens de bandas tocando.
- Título em Trump Gothic Bold (caixa-alta) posicionado com destaque.
- Tags de categoria e faixa etária em texto compacto com bordas finas.
- Ícones de seta geométrica (`.asset-arrow`) indicando clique e ação.

---

## 5. Layout, Espaçamento & Grid

- **Container Máximo:** `1200px` a `1320px` com `margin: 0 auto; padding: 0 20px;`.
- **Ritmo Vertical:** Seções com padding vertical generoso: `97px 0 80px` no desktop, reduzindo para `50px 0 48px` no mobile.
- **Divisores Visuais:**
  - Linhas grossas pretas ou brancas (`border-bottom: 8px solid #fff;`).
  - Linhas tracejadas diagonais ou verticais para marcar etapas e timelines de evolução.

---

## 6. Diretrizes de Aplicação para Projetos Web

Ao aplicar a estética da School of Rock em novas páginas ou projetos de música:
1. **Diga não a sombras neon e gradientes suaves:** Substitua gradientes coloridos por blocos sólidos escuros, contrastes afiados e iluminação de palco na fotografia.
2. **Adote o visual "Gig Poster":** Combine títulos massivos em caixa-alta com linhas de texto vazadas em *stroke* transparente.
3. **Mantenha botões angulares e imponentes:** Altura de 50px a 60px, cantos retos, texto em caixa-alta e efeito de inversão rápida de cor no hover.
4. **Use o vermelho com critério:** O vermelho `#cf2435` é a cor da pulsação e da ação. Ele direciona o olhar do visitante diretamente para a conversão.
