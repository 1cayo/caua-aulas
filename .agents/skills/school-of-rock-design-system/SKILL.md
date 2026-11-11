---
name: school-of-rock-design-system
description: >-
  Aplica o design system, identidade visual, paleta de cores e hierarquia tipográfica da School of Rock (estética rock 'n' roll, alto contraste #cf2435/#000/#fff, tipografia condensada de cartaz Trump Gothic/Bebas Neue e botões retangulares industriais). Ative esta skill para criar ou redesenhar landing pages, componentes e interfaces musicais de alta energia.
---

# Skill: School of Rock Design System

Esta skill instrui o agente a projetar, estilizar e implementar interfaces, páginas e componentes inspirados no **Design System oficial da School of Rock** (`schoolofrock.com.br`).

---

## Quando Utilizar Esta Skill

Ative esta skill quando a tarefa exigir:
- Criação ou reformulação de páginas para escolas de música, estúdios, cursos de instrumentos (violão, guitarra, baixo, bateria, canto) ou bandas.
- Aplicação de uma estética de **palco, energia ao vivo, cartaz de festival (*gig poster*) e alto contraste visual**.
- Eliminação de layouts genéricos e pastéis em favor de uma identidade rock industrial sólida e marcante.

---

## 1. Tokens de Design (Tokens CSS)

Ao gerar estilos CSS ou Tailwind para este padrão, utilize os tokens fundamentais:

```css
:root {
  /* Cores Principais Oficiais */
  --sor-red: #cf2435;           /* Vermelho Palco / Ação Primária */
  --sor-red-hover: #b01b2a;
  --sor-black: #000000;         /* Preto Absoluto / Estrutura */
  --sor-white: #ffffff;         /* Branco Puro / Alto Contraste */

  /* Neutros e Superfícies */
  --sor-dark-300: #2f2f2f;      /* Cards escuros e inputs */
  --sor-dark-200: #333333;      /* Bordas e divisores escuros */
  --sor-gray-500: #636466;      /* Texto de apoio e legendas */
  --sor-gray-300: #c7c8ca;      /* Bordas neutras de botões vazados */
  --sor-gray-200: #e2e2e2;      /* Divisores sutis */
  --sor-light-bg: #f6f6f7;      /* Fundo de blocos alternados */

  /* Tipografia */
  --font-display: 'Bebas Neue', 'Trump Gothic Pro', 'Barlow Condensed', sans-serif;
  --font-body: 'HK Grotesk', 'Inter', 'Helvetica Neue', Arial, sans-serif;

  /* Espaçamento e Geometria */
  --radius-sharp: 0px;          /* O design system prioriza cantos retilíneos */
  --radius-sm: 4px;             /* Usado raramente em tags compactas */
}
```

---

## 2. Tipografia e Hierarquia Visual

### 2.1 Regras de Aplicação
1. **Títulos e Manchetes:** Devem ser sempre em **caixa-alta (`text-transform: uppercase`)**, condensados, com entrelinhas compactas (ex.: `line-height: 1.0` ou `0.95`).
2. **Efeito Vazado (*Outline Stroke*):** Use títulos vazados com `-webkit-text-stroke` para criar camadas de profundidade dinâmicas em hero banners.
3. **Corpo de Texto:** Sem serifa, neutro, espaçoso (`line-height: 1.6`) e em cor de alto contraste para leitura sem fadiga.

```css
/* Título de Destaque / Hero Display */
.sor-hero-title {
  font-family: var(--font-display);
  font-size: clamp(3.2rem, 7vw, 5.5rem);
  line-height: 0.95;
  text-transform: uppercase;
  color: var(--sor-white);
  letter-spacing: 0.5px;
}

/* Efeito Vazado / Outline de Cartaz */
.sor-text-outline {
  color: transparent;
  -webkit-text-stroke: 2px var(--sor-white);
}

.sor-text-outline-dark {
  color: transparent;
  -webkit-text-stroke: 2px var(--sor-black);
}

/* Cabeçalhos de Seção (H2) */
.sor-section-title {
  font-family: var(--font-display);
  font-size: clamp(2.2rem, 4.5vw, 3.2rem);
  line-height: 1;
  text-transform: uppercase;
  color: var(--sor-red);
  margin-bottom: 20px;
}
```

---

## 3. Sistema de Botões e Interações (Buttons)

O design system da School of Rock rejeita botões arredondados amigáveis (pills). Ele utiliza blocos sólidos, retos e altos:

```css
/* Botão Base */
.sor-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  padding: 0 46px;
  font-family: var(--font-body);
  font-weight: 700;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  text-decoration: none;
  border-radius: 0; /* Cantos vivos e industriais */
  box-sizing: border-box;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
  white-space: nowrap;
  cursor: pointer;
}

/* 1. Primário Vermelho */
.sor-btn-red {
  background-color: var(--sor-red);
  border: 2px solid var(--sor-red);
  color: var(--sor-white);
}
.sor-btn-red:hover {
  background-color: transparent;
  color: var(--sor-red);
}

/* 2. Vazado Branco (Hollow White para seções escuras) */
.sor-btn-hollow-white {
  background-color: transparent;
  border: 2px solid var(--sor-white);
  color: var(--sor-white);
}
.sor-btn-hollow-white:hover {
  background-color: var(--sor-white);
  color: var(--sor-black);
}

/* 3. Vazado Vermelho (Hollow Red para seções claras) */
.sor-btn-hollow-red {
  background-color: transparent;
  border: 2px solid var(--sor-red);
  color: var(--sor-red);
}
.sor-btn-hollow-red:hover {
  background-color: var(--sor-red);
  color: var(--sor-white);
}
```

---

## 4. Estrutura de Seções e Componentes

### 4.1 Hero de Alto Impacto
- Fundo em preto sólido ou imagem de show/estúdio com tratamento escurecido.
- Linhas de texto alternando entre preenchimento sólido e outline vazado.
- Botão CTA vermelho alinhado abaixo com largura destacada.

### 4.2 Cards de Cursos & Instrumentos
- Containers retangulares limpos, bordas sutis (`border: 1px solid #e2e2e2` ou `#333333`).
- Sem cantos arredondados excessivos.
- Imagem de performance no topo e bloco de texto em caixa-alta embaixo.

### 4.3 Divisores & Faixas
- Uso de faixas contrastantes pretas ou vermelhas contendo títulos horizontais dinâmicos.
- Divisores fortes de 4px a 8px sólidos ou tracejados com textura de cabo/equipamento de áudio.

---

## 5. Checklist de Validação da Skill

Ao gerar ou revisar qualquer interface seguindo este padrão:
- [ ] O vermelho utilizado é exatamente `#cf2435`?
- [ ] O contraste base é focado em `#000000`, `#ffffff` e `#cf2435`?
- [ ] Os títulos estão em fonte condensada, caixa-alta e entrelinha justa?
- [ ] Os botões possuem cantos retos (`border-radius: 0`) e altura generosa (`~60px`)?
- [ ] As micro-interações de hover executam inversão nítida de cores em 0.2s?
- [ ] Foi evitado o uso de gradientes pastéis, sombras neon e cantos arredondados corporativos?
