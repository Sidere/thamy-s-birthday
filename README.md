# 🎂 Thamy’s Birthday — Uma Carta de Amor Gamificada

Um **mini-jogo web 2D feito em React**, criado como presente de aniversário — e também como projeto de portfólio.  
Esta experiência foi pensada para ser **intimista, emocional e simbólica**, priorizando sentimento em vez de complexidade técnica.

A cada dia, uma nova interação e uma nova dica são desbloqueadas, levando à revelação final do presente. 💜

---

## 💡 Conceito

Este projeto é uma **experiência de contagem regressiva gamificada**, criada para liberar **uma dica por dia** até o aniversário (dia 16), culminando na revelação de uma **câmera Kodak F8**.

A narrativa explora temas como:
- memória  
- tempo  
- atenção  
- detalhes  
- o ato de registrar momentos  

O jogo é **não competitivo**, **não possui estados de falha** e foi pensado para **uma única pessoa**.

---

## 🎮 Design da Experiência

- **Clima:** afeto, nostalgia, curiosidade  
- **Ritmo:** uma interação curta por dia  
- **Estilo visual:** 2D minimalista  
- **Linguagem:** poética, curta e direta  
- **Objetivo:** conexão emocional acima de desafio  

Cada interação é simbólica, não mecânica.  
A experiência foi feita para ser **sentida**, não vencida.

---

## 🧠 Estrutura Narrativa

Cada dia representa um conceito simbólico:

1. **O Olhar** — aprender a observar com atenção  
2. **Memória** — relembrar momentos compartilhados  
3. **Detalhe** — perceber o que normalmente passa despercebido  
4. **Tempo** — espera, antecipação e presença  
5. **Registro** — guardar o que realmente importa  

A experiência prepara emocionalmente a jogadora para a revelação final.

---

## 🛠 Stack Tecnológica

- **React** + **Vite**
- **TypeScript**
- **CSS Modules / Styled Components**
- **Framer Motion** (micro-animações)
- **LocalStorage** (persistência de progresso)
- **Vercel** (deploy e hospedagem)

O projeto funciona **100% client-side**, sem backend.

---

## ☁️ Deploy

A aplicação está hospedada na **Vercel**, com deploy contínuo.

- SPA (Single Page Application)
- Compatível com React Router
- Deploy automático a cada push na branch `main`
- HTTPS habilitado por padrão

As rotas SPA são tratadas via `vercel.json`.

---

## 📁 Estrutura do Projeto

```txt
src/
 ├─ pages/
 │   ├─ Map.tsx           // Mapa de seleção dos dias
 │   ├─ Day.tsx           // Interação diária genérica
 │   └─ Final.tsx         // Revelação do presente
 ├─ components/
 │   ├─ LevelCard.tsx
 │   ├─ LockedLevel.tsx
 │   ├─ TextBox.tsx
 │   └─ Interaction.tsx
 ├─ data/
 │   └─ days.ts           // Conteúdo narrativo e textual
 ├─ assets/
 │   ├─ images/
 │   ├─ icons/
 │   └─ sounds/
 └─ utils/
     ├─ getToday.ts
     └─ isUnlocked.ts
