# Harmonia — Designer's Complete Guide

> **This README is written for Augustine and Joles.** You don't need to be an engineer to make design changes. This guide explains everything: what every file does, how to edit it, how to use AI tools to help you, and ideas for making the preview feel extraordinary.

---

## Table of Contents

1. [Project Structure](#1-project-structure)
2. [The Preview Folder — What It Is & Why It Exists](#2-the-preview-folder)
3. [HTML for Designers](#3-html-for-designers)
4. [CSS for Designers](#4-css-for-designers)
5. [JavaScript for Designers](#5-javascript-for-designers)
6. [React — What It Is & When You'll Need It](#6-react)
7. [Animations & Motion Design](#7-animations--motion-design)
8. [Line-by-Line Editing Guide — Every Phase Explained](#8-line-by-line-editing-guide)
9. [Reactive Animations & Interactions](#9-reactive-animations--interactions)
10. [Phase Design Ideas — Neural, Ambient & Cinematic](#10-phase-design-ideas)
11. [Stealing Inspiration From Other Websites (Legally)](#11-design-inspiration)
12. [AI-Assisted Design — Claude & Google AI Studio](#12-ai-assisted-design)
13. [Resources — The Best of the Web](#13-resources)

---

## 1. Project Structure

```
Augustine-design-change/
│
├── index.html                   ← Home page
├── why-harmonia.html            ← Why Harmonia page
├── partnerships.html            ← Ignite Your Platform page
├── team.html                    ← Team page
├── local-network.html           ← Local Network page
├── p2p-testing.html             ← Join Our Testing Pool page ← LINKS TO PREVIEW
├── contact.html                 ← Contact page
│
├── assets/
│   ├── css/
│   │   ├── variables.css        ← 🎨 ALL colour & spacing tokens — START HERE for theming
│   │   ├── base.css             ← Reset & global body/typography rules
│   │   ├── nav.css              ← Navigation bar, hamburger, theme toggle
│   │   ├── hero.css             ← Home page hero section & radar chart
│   │   ├── sections.css         ← All page section styles (why, team, etc.)
│   │   ├── components.css       ← Reusable UI bits: buttons, cards, forms
│   │   ├── animations.css       ← @keyframes & entrance animations
│   │   └── responsive.css       ← Mobile/tablet overrides
│   │
│   └── js/
│       ├── utils.js             ← Shared helpers, logo gradient injection
│       ├── nav.js               ← Page routing, theme toggle, mobile menu
│       ├── forms.js             ← All form handling & validation
│       ├── animations.js        ← Science card animations, scroll effects
│       ├── charts.js            ← Radar chart (Canvas rendering)
│       └── main.js              ← 🚀 Bootstrap — runs everything on page load
│
└── harmonia-preview/            ← 📱 INTERACTIVE APP PREVIEW (see Section 2)
    ├── index.html               ← The preview entry point
    └── assets/
        ├── css/
        │   ├── variables.css    ← 🎨 Preview colour tokens
        │   ├── base.css         ← Preview reset & body
        │   ├── layout.css       ← Sections, nav, phase dots
        │   ├── components.css   ← Buttons, cards, chat, swipe deck
        │   ├── phases.css       ← 🎯 Each phase's specific styles
        │   └── animations.css   ← Preview @keyframes
        └── js/
            ├── data.js          ← All static data (users, questions, matches)
            ├── animations.js    ← GSAP timelines, confetti, particle dust
            └── app.js           ← All interactive logic for every phase
```

### The Golden Rule of File Order

CSS files load **top to bottom** — later files override earlier ones. The order in the `<head>` is intentional:
```
variables → base → nav → hero → sections → components → animations → responsive
```
Never put a variable definition after the file that uses it.

---

## 2. The Preview Folder

### What Is It?

`harmonia-preview/` is a **fully interactive simulation** of the Harmonia dating app. It's not a real app — nothing gets saved, no real accounts exist. It's a walk-through that lets potential users *experience* what Harmonia feels like before signing up.

### Why Does It Exist?

It is the destination for the **"Join Our Testing Pool"** page (`p2p-testing.html`). When someone clicks "Launch Preview" on that page, they go to `harmonia-preview/index.html`.

The goal: **show, don't tell.** Instead of describing how HLA matching works in a paragraph, let people swipe through it, see the personality radar, watch the match reveal animation.

### How It's Structured — The 11 Phases

| Section ID | Phase | What Happens |
|---|---|---|
| `s0` | Hero | Intro screen, "Begin the Journey" CTA |
| `s1` | Phase 0 — Sign Up | 7-field form with validation |
| `s2` | Phase 0.5 — Photos | Photo grid, tap to upload (simulated) |
| `s3` | Phase 1 — Visual | Face rating calibration (MetaFBP) |
| `s4` | Phase 2 — Psychometric | PIIP questionnaire, 6 scenario questions |
| `s5` | Phase 3 — HLA | DNA upload simulation |
| `s6` | Phase 6 — Completion | Profile ready, checklist, formula reveal |
| `s7` | Phase 7 — Discovery | Swipe deck with physics-based gestures |
| `s9` | Phase 9 — Matches | Match list + real-time chat simulation |
| `s10` | Phase 10 — Profile | Seven Deadly Sins radar chart |
| `s11` | Phase 11 — Admin | Calibration dashboard, drift charts |

### The Design Challenge for Augustine & Joles

Each phase should feel **emotionally distinct** — the sign-up should feel clean and trustworthy, the face rating should feel clinical and precise, the match reveal should feel cinematic and euphoric. Right now many phases share the same neutral glass panel aesthetic. Your job is to differentiate them.

---

## 3. HTML for Designers

HTML is the **skeleton** of a webpage. It defines *what* is on the page — not how it looks (that's CSS) or how it behaves (that's JS).

### The Basic Building Blocks

```html
<!-- A heading -->
<h1>This is the biggest heading</h1>
<h2>Slightly smaller</h2>
<h3>Section subheading</h3>

<!-- A paragraph -->
<p>This is a paragraph of text.</p>

<!-- A link -->
<a href="why-harmonia.html">Go to Why Harmonia</a>

<!-- A button -->
<button onclick="doSomething()">Click Me</button>

<!-- An image -->
<img src="assets/images/photo.jpg" alt="Description for screen readers">

<!-- A container div (invisible box for grouping things) -->
<div class="my-card">
  <h2>Card Title</h2>
  <p>Card content here.</p>
</div>
```

### Attributes — The Properties of HTML Elements

```html
<!-- class → what CSS style to apply -->
<div class="hero-card">...</div>

<!-- id → a unique name so JS can find it -->
<div id="radar-chart">...</div>

<!-- style → inline CSS (avoid this — use CSS files instead) -->
<p style="color: red;">Avoid using inline styles</p>

<!-- data-* → custom data attributes, read by JS -->
<div data-theme="dark">...</div>
<button data-tier="pilot">Pilot Program</button>
```

### Semantic HTML — Use the Right Tag

```html
<!-- WRONG — meaningless divs everywhere -->
<div class="header-thing">
  <div class="nav-thing">...</div>
</div>

<!-- RIGHT — semantic HTML tells the browser what each part IS -->
<header>
  <nav>...</nav>
</header>
<main>
  <article>...</article>
  <aside>...</aside>
</main>
<footer>...</footer>
```

Why does this matter? Screen readers, search engines, and browser dev tools all use semantic tags to understand page structure.

### The `<head>` vs `<body>`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- ↑ This is the CONTROL ROOM — invisible to users -->
  <meta charset="UTF-8">                    <!-- text encoding, always include -->
  <meta name="viewport" content="...">     <!-- makes it mobile-responsive -->
  <title>Harmonia — Home</title>           <!-- tab title in browser -->
  <link rel="stylesheet" href="...">       <!-- loads CSS files -->
</head>
<body>
  <!-- ↑ Everything visible goes HERE -->
  <nav>...</nav>
  <main>...</main>
  <footer>...</footer>
  <script src="..."></script>              <!-- JS loads at BOTTOM of body -->
</body>
</html>
```

### Editing HTML — What to Change, What Not to

**SAFE to change:**
- Text content between tags: `<h2>Dating is broken</h2>` → `<h2>Dating should be better</h2>`
- `class` attributes (if you know what CSS class you're adding)
- `href` on links
- `src` on images
- `placeholder` text on inputs

**BE CAREFUL changing:**
- `id` attributes — JS uses these to find elements
- `onclick` attributes — changing the function name breaks things
- The structure (moving closing `</div>` tags around) — easy to break layouts

**DO NOT change without understanding:**
- `data-*` attributes (JS reads these for logic)
- SVG path `d=""` attributes (complex math)
- Canvas element IDs

---

## 4. CSS for Designers

CSS is the **visual layer** — colours, spacing, typography, layout, animations.

### How CSS Works — Selectors

```css
/* Select by tag name */
h1 { color: red; }

/* Select by class (dot prefix) */
.hero-card { background: white; }

/* Select by ID (hash prefix) */
#radar-chart { width: 400px; }

/* Select a class INSIDE another class */
.hero-card h2 { font-size: 2rem; }

/* Select on hover */
.btn:hover { background: darkgold; }

/* Select when a parent has a specific attribute */
[data-theme="dark"] .btn { background: #333; }
```

### CSS Custom Properties (Variables) — Your Design System

In `variables.css`, every colour and spacing value is defined as a variable:

```css
:root {
  --gold:    #D4A853;    /* the warm gold accent */
  --maroon:  #722F37;    /* the deep red/maroon */
  --cream:   #FAF6F1;    /* light mode background */
  --navy:    #1E293B;    /* main text colour */
}
```

**To change the brand gold across the ENTIRE site**, you change ONE line:
```css
/* In variables.css, change this: */
--gold: #D4A853;
/* To this: */
--gold: #C89A3E;   /* slightly darker gold */
```

Every element that uses `var(--gold)` updates automatically. This is how professional design systems work.

### Dark Mode Variables

```css
[data-theme="dark"] {
  --cream: #12090A;    /* dark mode: background becomes wine-black */
  --gold:  #F0C86E;    /* dark mode: gold gets lighter/brighter */
  --navy:  #F5F0E8;    /* dark mode: text becomes cream */
}
```

When the user clicks the moon/sun toggle, `data-theme="dark"` gets added to the `<html>` tag and these variables kick in.

### The Box Model — Spacing

```css
.card {
  padding: 24px;       /* space INSIDE the box (content to edge) */
  margin: 16px;        /* space OUTSIDE the box (edge to neighbour) */
  border: 1px solid var(--gold);
  border-radius: 12px; /* rounded corners */
}
```

Shorthand spacing (clockwise from top):
```css
padding: 16px 24px;          /* 16px top+bottom, 24px left+right */
padding: 8px 16px 12px 24px; /* top, right, bottom, left */
```

### Flexbox — The Most Useful Layout Tool

```css
.container {
  display: flex;              /* activate flexbox */
  flex-direction: row;        /* items go left-to-right (default) */
  align-items: center;        /* vertically center */
  justify-content: space-between; /* spread items to edges */
  gap: 16px;                  /* space between items */
}

/* Stack vertically */
.stack {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
```

### CSS Grid — For Complex Layouts

```css
.cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 equal columns */
  gap: 24px;
}

/* Responsive grid that adjusts automatically */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}
```

### Typography

```css
/* In base.css — loaded from Google Fonts */
font-family: 'Cormorant Garamond', serif;  /* elegant serif — headings */
font-family: 'DM Sans', sans-serif;         /* clean sans — body text */
font-family: 'JetBrains Mono', monospace;  /* code/data */

/* Fluid type — scales with screen width */
font-size: clamp(1.2rem, 2.5vw, 2rem);
/*         minimum  ideal    maximum */
```

### Glassmorphism — Harmonia's Signature Look

```css
.glass-panel {
  background: rgba(255, 255, 255, 0.08);   /* semi-transparent */
  backdrop-filter: blur(20px);              /* blurs what's behind */
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
}
```

### Gradients

```css
/* Linear gradient (left to right) */
background: linear-gradient(to right, #722F37, #D4A853);

/* Diagonal gradient */
background: linear-gradient(135deg, var(--maroon), var(--gold));

/* Radial gradient (circular) */
background: radial-gradient(circle at center, var(--gold) 0%, transparent 70%);

/* Text gradient (Harmonia uses this for headlines) */
.gradient-text {
  background: linear-gradient(135deg, var(--maroon), var(--gold));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

### CSS Transitions & Hover States

```css
.btn {
  background: var(--gold);
  transform: translateY(0);
  transition: transform 0.2s ease, box-shadow 0.2s ease; /* smooth changes */
}

.btn:hover {
  transform: translateY(-2px);          /* lifts up slightly */
  box-shadow: 0 8px 24px rgba(212, 168, 83, 0.4);  /* glows */
}
```

---

## 5. JavaScript for Designers

JavaScript makes things **interactive** and **alive**. You don't need to master it — you need to know enough to read it, find the right part, and make targeted changes.

### The Basics

```javascript
// Variables — store values
const name = "Harmonia";     // const: never changes
let count = 0;               // let: can change
var old = "avoid this";      // var: old way, avoid

// Functions — reusable actions
function showMessage(text) {
  alert(text);
}
showMessage("Hello!");       // call it

// Arrow functions (modern shorthand)
const greet = (name) => `Hello, ${name}!`;

// Conditionals
if (count > 5) {
  console.log("Count is high");
} else {
  console.log("Count is low");
}

// Loops
for (let i = 0; i < 10; i++) {
  console.log(i);
}
```

### The DOM — Manipulating the Page

The DOM (Document Object Model) is the JavaScript representation of your HTML. Every HTML element is a JavaScript object.

```javascript
// Find an element by ID
const radar = document.getElementById('radar-chart');

// Find elements by class (returns a list)
const cards = document.querySelectorAll('.science-card');

// Change text content
document.getElementById('hero-title').textContent = "New Title";

// Change CSS
const btn = document.getElementById('submitBtn');
btn.style.backgroundColor = '#D4A853';

// Add/remove CSS classes
btn.classList.add('active');
btn.classList.remove('active');
btn.classList.toggle('active');   // adds if missing, removes if present

// Listen for events
btn.addEventListener('click', function() {
  console.log('Button clicked!');
});

// Check if an element exists before using it
const el = document.getElementById('myElement');
if (el) {
  el.style.display = 'none';   // safe — won't crash if el is null
}
```

### Events — How Users Interact

```javascript
// Click
element.addEventListener('click', handler);

// Mouse enter/leave (hover)
element.addEventListener('mouseenter', handler);
element.addEventListener('mouseleave', handler);

// Mouse move
document.addEventListener('mousemove', (e) => {
  console.log(e.clientX, e.clientY);  // mouse X and Y position
});

// Keyboard
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') doSomething();
  if (e.key === 'Escape') closeModal();
});

// Form input — fires every time user types
textarea.addEventListener('input', (e) => {
  const wordCount = e.target.value.split(' ').filter(w => w).length;
});

// Scroll
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
});
```

### The Console — Your Debug Tool

Open browser DevTools with **F12** (or Cmd+Option+I on Mac). The **Console** tab lets you:
- See `console.log()` output from JS files
- Type JavaScript live on the page
- See error messages (red) when something breaks

```javascript
// Add these to any JS file to debug
console.log("Value is:", myVariable);
console.warn("Something seems off");
console.error("This is broken");
```

---

## 6. React

React is not currently used in Harmonia. It's a JavaScript **framework** built by Facebook that makes building complex interactive UIs easier. Understanding what it is helps you communicate with developers.

### The Core Idea: Components

Instead of one giant HTML file, React lets you write reusable **components**:

```jsx
// A React component — looks like HTML but with JavaScript powers
function ProfileCard({ name, score, traits }) {
  return (
    <div className="profile-card">
      <h2>{name}</h2>
      <p>Compatibility: {score}%</p>
      {traits.map(trait => (
        <span key={trait} className="badge">{trait}</span>
      ))}
    </div>
  );
}

// Use it anywhere
<ProfileCard name="Priya" score={91} traits={["Generous", "Calm"]} />
```

### When Would Harmonia Use React?

- When the app becomes more complex with lots of changing state
- When you need routing between pages without full page reloads
- When multiple parts of the UI need to react to the same data changes
- When the team scales and needs component-based development

### React vs. Vanilla JS (What Harmonia Uses Now)

| | Vanilla JS (current) | React (future) |
|---|---|---|
| Learning curve | Low | Medium |
| Setup | None | Needs Node.js |
| Good for | Static-ish sites, demos | Complex SPAs |
| Harmonia files | `.html`, `.css`, `.js` | `.jsx`, `.tsx` |

### CSS-in-JS & Styled Components (React patterns)

```jsx
// Styled Components — CSS written in JavaScript
import styled from 'styled-components';

const GoldButton = styled.button`
  background: ${props => props.variant === 'primary' ? 'var(--gold)' : 'transparent'};
  border: 2px solid var(--gold);
  padding: 12px 24px;
  border-radius: 8px;

  &:hover {
    transform: translateY(-2px);
  }
`;
```

---

## 7. Animations & Motion Design

This is where Harmonia's personality lives. Animation tells the story that text can't.

### CSS Transitions (Simple Hover Effects)

```css
/* Transition: property duration timing-function delay */
.card {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.card:hover {
  transform: scale(1.02) translateY(-4px);
}
```

**Timing functions:**
```css
transition: all 0.3s ease;           /* smooth, default */
transition: all 0.3s ease-in;        /* starts slow, ends fast */
transition: all 0.3s ease-out;       /* starts fast, ends slow */
transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); /* springy bounce */
```

Use `cubic-bezier.com` to visually design timing curves.

### CSS @keyframes (Looping & Trigger-Once Animations)

```css
/* Define the animation */
@keyframes float {
  0%   { transform: translateY(0); }
  50%  { transform: translateY(-12px); }
  100% { transform: translateY(0); }
}

/* Apply it */
.floating-card {
  animation: float 3s ease-in-out infinite;
  /*         name  duration  timing     repeat */
}

/* Stagger — delay each card by a different amount */
.card:nth-child(1) { animation-delay: 0s; }
.card:nth-child(2) { animation-delay: 0.1s; }
.card:nth-child(3) { animation-delay: 0.2s; }
```

### GSAP — The Professional Animation Library

GSAP (GreenSock Animation Platform) is already loaded in the preview. It's the industry standard for smooth, complex animations.

```javascript
// Fade in a single element
gsap.to('#myElement', {
  opacity: 1,
  y: 0,           // move to original position (from y:40 below)
  duration: 0.8,
  ease: 'expo.out'
});

// Animate FROM a starting state
gsap.from('.card', {
  opacity: 0,
  y: 40,          // starts 40px below
  duration: 0.6,
  stagger: 0.1,   // each card delays 0.1s
  ease: 'power2.out'
});

// A sequence of animations (timeline)
const tl = gsap.timeline();
tl.from('.title',    { opacity: 0, y: 30, duration: 0.5 })
  .from('.subtitle', { opacity: 0, y: 20, duration: 0.4 }, '-=0.2') // 0.2s overlap
  .from('.btn',      { opacity: 0, scale: 0.9, duration: 0.3 });

// Animate SVG stroke drawing (like the match reveal rings)
gsap.to('#myCircle', {
  attr: { 'stroke-dashoffset': 0 },  // draws from 0% to 100%
  duration: 1.5,
  ease: 'power2.out'
});
```

**GSAP Eases cheat sheet:**
```
power1.out       → subtle ease out
power2.out       → smooth ease out (most used)
expo.out         → fast start, gentle landing
back.out(1.7)    → overshoots slightly, snaps back (great for modals)
bounce.out       → physically bouncy
elastic.out(1,0.5) → rubber band effect
```

### ScrollTrigger — Animate on Scroll

Already used in `harmonia-preview/assets/js/animations.js`:

```javascript
gsap.registerPlugin(ScrollTrigger);

gsap.from('.stat-card', {
  scrollTrigger: {
    trigger: '.stats-section',  // what triggers it
    start: 'top 80%',           // trigger when section top hits 80% of viewport
    toggleActions: 'play none none reverse', // play forward / reverse on scroll back
  },
  opacity: 0,
  y: 40,
  stagger: 0.15,
  duration: 0.7,
  ease: 'power2.out'
});
```

### Canvas Animations — The Dust Particles

The ambient particle field in the preview is a Canvas animation in `animations.js`:

```javascript
function initDust() {
  const canvas = document.getElementById('dust');
  const ctx = canvas.getContext('2d');
  // ... 500 particles, each with position, velocity, colour
  // requestAnimationFrame creates a 60fps loop
}
```

Canvas is like drawing with JavaScript — each frame you clear the canvas and redraw everything. It's powerful but complex. For most design changes, use CSS/GSAP first.

---

## 8. Line-by-Line Editing Guide

### 8.1 Changing Colours — `variables.css`

**File:** `assets/css/variables.css` (main site) or `harmonia-preview/assets/css/variables.css` (preview)

```css
:root {
  /* TO CHANGE THE BRAND GOLD: edit this one line */
  --gold: #D4A853;

  /* TO CHANGE THE MAROON/BURGUNDY: edit this */
  --maroon: #722F37;

  /* TO CHANGE PAGE BACKGROUND (light mode): */
  --cream: #FAF6F1;
}

[data-theme="dark"] {
  /* DARK MODE gold — usually lighter/brighter than light mode */
  --gold: #F0C86E;

  /* DARK MODE background — the wine-black */
  --cream: #12090A;
}
```

### 8.2 The Hero Tagline — `index.html`

```html
<!-- Find this in index.html -->
<h1 class="tagline">
  They designed <span class="addiction">addiction.</span><br>
  We designed <span class="compatibility">compatibility.</span>
</h1>

<!-- TO CHANGE THE TEXT: just edit the words between tags -->
<!-- DO NOT remove the <span> tags — they apply the gradient colour effect -->
```

**To change the colours of "addiction" and "compatibility":**
Find in `sections.css`:
```css
.addiction {
  /* this span gets coloured via CSS */
}
.compatibility {
  background: linear-gradient(135deg, var(--maroon), var(--gold));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

### 8.3 Phase 2 — The PIIP Questionnaire Questions

**File:** `harmonia-preview/assets/js/data.js`

```javascript
const FQ = [
  // Question 1 — tests Greed
  "The bill arrives at a group dinner. Everyone contributed differently. What's your approach to splitting it?",

  // Question 2 — tests Sloth / resourcefulness
  "Your car breaks down — repair quote £1,200. Walk me through how you handle it.",

  // Question 3 — tests Sloth / leisure
  "Free weekend — no obligations. What does your ideal weekend look like?",

  // Question 4 — tests Wrath / conflict
  "Group project, one person hasn't done their share. Deadline is tomorrow. What do you do?",

  // Question 5 — tests Lust / impulse vs loyalty
  "Best friend calls in tears, needing help — but you're about to leave for a date. What do you do?",

  // Question 6 — tests Pride / self-awareness
  "Someone you respect gives feedback about a blind spot in your personality. How do you react.",
];
```

**To add a 7th question:** add a new string to the array. Update the phase header `<span class="pnum">Phase 2 — Psychometric (PIIP)</span>` text accordingly.

### 8.4 Phase 7 — Swipe Deck Candidate Profiles

**File:** `harmonia-preview/assets/js/data.js`

```javascript
const CANDS = [
  // n: name, a: age, l: location, ph: photo number, t: traits array
  { n: 'Sophia',   a: 26, l: 'Shoreditch',  ph: 3, t: ['Adventurous', 'Generous', 'Creative'] },
  { n: 'Isabella', a: 24, l: 'Camden',       ph: 4, t: ['Ambitious', 'Empathetic', 'Direct']  },
  // ... add more like this
];
```

**To add a new candidate:**
```javascript
{ n: 'Luna', a: 27, l: 'Dalston', ph: 2, t: ['Philosophical', 'Witty', 'Calm'] },
```

### 8.5 Phase 9 — Match Scores & Chat Messages

**File:** `harmonia-preview/assets/js/data.js`

```javascript
const MATCHES = [
  {
    n: 'Priya S.', a: 28,
    wtm: 91,    // ← OVERALL compatibility score (0-100)
    v: 88,      // ← visual score
    p: 92,      // ← personality score
    b: 94,      // ← biological/chemistry score
    t: ['Conflict-avoidant', 'Generous', 'Spontaneous', 'Content'],  // ← shared traits
    msgs: [
      { f: 'them', t: "Hey! I loved your profile.", tm: '2:14 PM' },
      { f: 'you',  t: "Thanks! Want to grab coffee?",    tm: '2:18 PM' },
    ],
  },
];
```

### 8.6 Phase 10 — Personality Radar Chart Labels

The Seven Deadly Sins framework labels in `data.js`:
```javascript
const SINS = ['Wrath', 'Sloth', 'Pride', 'Lust', 'Greed', 'Gluttony', 'Envy'];
```

And in `data.js`, the user's scores:
```javascript
const U = {
  sins: {
    wrath:    { s: -2.1, c: .85, w: 1.5, f: 'Conflict Style' },
    //           ↑score  ↑confidence ↑weight  ↑friendly label
    sloth:    { s:  .1,  c: .99, w: 1.3, f: 'Drive' },
    pride:    { s:  .95, c: .98, w: 1.0, f: 'Ego' },
  },
};
```

### 8.7 Changing Button Styles — `components.css`

```css
/* Main gold button */
.btn-g {
  background: linear-gradient(135deg, var(--golds), var(--goldg));
  color: var(--bg);
  border: none;
  padding: 11px 22px;
  border-radius: var(--r);
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.2s;
}

.btn-g:hover {
  opacity: 0.88;
  transform: translateY(-1px);
}

/* TO MAKE BUTTONS MORE ROUNDED: change --r variable in variables.css */
/* TO MAKE BUTTONS BIGGER: increase padding */
/* TO CHANGE HOVER EFFECT: edit the :hover block */
```

### 8.8 The Match Reveal Animation — `animations.js`

**File:** `harmonia-preview/assets/js/animations.js`

```javascript
function trigMR() {
  const overlay = document.getElementById('mrovl');
  overlay.classList.add('on');
  boom(); // triggers confetti

  gsap.timeline()
    // 1. Fade in dark background
    .to(overlay, { background: 'rgba(10,5,6,.92)', duration: .3 })

    // 2. Fly in the two avatars from left and right
    .from('#mravl', { x: -250, scale: .5, opacity: 0, duration: .6, ease: 'back.out(1.7)' }, .3)
    .from('#mravr', { x:  250, scale: .5, opacity: 0, duration: .6, ease: 'back.out(1.7)' }, .3)

    // 3. Pop in the "It's a Match!" title
    .from('#mrtitle', { scale: .8, opacity: 0, duration: .5, ease: 'back.out(2)' }, 1)

    // 4. Count up the score from 0 → 82
    .call(() => {
      const el = document.getElementById('mrscore');
      gsap.to({ v: 0 }, {
        v: 82, duration: 1, ease: 'power2.out',
        onUpdate() { el.textContent = Math.round(this.targets()[0].v); },
      });
    }, null, 1.3)

    // 5. Draw the three rings (visual, personality, biological)
    .to('#rv', { attr: { 'stroke-dashoffset': 515 * (1 - .85) }, duration: 1 }, 2.3)
    .to('#rp', { attr: { 'stroke-dashoffset': 402 * (1 - .78) }, duration: 1 }, 2.5)
    .to('#rb', { attr: { 'stroke-dashoffset': 289 * (1 - .84) }, duration: 1 }, 2.7)

    // 6. Fade in labels and trait badges
    .from('.rlbl',         { opacity: 0, y: 8, stagger: .10, duration: .3 }, 3.2)
    .from('.shtrait .bdg', { opacity: 0, x: -12, stagger: .08, duration: .3 }, 3.6)

    // 7. Conversation starter cards
    .from('.stcard',  { opacity: 0, y: 10, stagger: .10, duration: .3 }, 4.0)
    .from('.mrbtns',  { opacity: 0, y: 16, duration: .35 }, 4.5);
}
```

**To slow down the whole animation:** increase every `duration` value.
**To add a pulse to the avatars:** add a GSAP `yoyo: true, repeat: 3` after the avatars appear.
**To change the ring colours:** edit `stroke="var(--gold)"` in the SVG inside `harmonia-preview/index.html`.

---

## 9. Reactive Animations & Interactions

These are animations that **respond to user actions** — mouse position, typing, scrolling, clicking.

### 9.1 Parallax on Mouse Move

```javascript
// In any JS file — makes elements move with mouse
document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;  // -10 to +10
  const y = (e.clientY / window.innerHeight - 0.5) * 20;

  document.querySelector('.hero-card').style.transform =
    `translate(${x * 0.5}px, ${y * 0.5}px)`;

  // Make background elements move more for depth effect
  document.querySelector('.bg-orb').style.transform =
    `translate(${x * 2}px, ${y * 2}px)`;
});
```

### 9.2 Scroll Progress Bar

```javascript
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  const progress = (scrolled / maxScroll) * 100;

  document.getElementById('progress-bar').style.width = progress + '%';
});
```

CSS:
```css
#progress-bar {
  position: fixed;
  top: 0; left: 0;
  height: 2px;
  background: var(--gold);
  transition: width 0.1s ease;
  z-index: 9999;
}
```

### 9.3 Typing Reactive Animations (Phase 2 — PIIP)

When a user types in the questionnaire textarea, we can fire visual feedback. The preview already has a word count and neural stat display. Here's how to add particle effects on keypress:

```javascript
// In harmonia-preview/assets/js/app.js
// Find the onQInput() function and add:

function onQInput() {
  const words = document.getElementById('qta').value
    .trim().split(/\s+/).filter(w => w.length > 0).length;

  // Existing word count logic...
  // ADD THIS:
  if (words > 0 && words % 3 === 0) {
    // Every 3rd word, pulse the neural stats
    pulseNeurons();
  }
}

function pulseNeurons() {
  const stats = document.querySelectorAll('.nstat b');
  gsap.from(stats, {
    scale: 1.3,
    color: '#F0C86E',
    duration: 0.3,
    stagger: 0.05,
    ease: 'back.out(2)',
    yoyo: true,
    repeat: 1
  });
}
```

### 9.4 Cursor Spotlight Effect

Creates a glowing area that follows your cursor:

```css
/* Add to any CSS file */
.cursor-spotlight {
  pointer-events: none;
  position: fixed;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(212,168,83,0.08) 0%, transparent 70%);
  transform: translate(-50%, -50%);
  z-index: 0;
  transition: opacity 0.3s;
}
```

```javascript
const spotlight = document.createElement('div');
spotlight.className = 'cursor-spotlight';
document.body.appendChild(spotlight);

document.addEventListener('mousemove', (e) => {
  spotlight.style.left = e.clientX + 'px';
  spotlight.style.top = e.clientY + 'px';
});
```

### 9.5 Intersection Observer — Scroll-Triggered Reveals

```javascript
// Watches when elements enter the viewport
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });  // triggers when 20% is visible

// Watch all stat cards
document.querySelectorAll('.stat-card').forEach(card => {
  observer.observe(card);
});
```

```css
.stat-card {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.stat-card.visible {
  opacity: 1;
  transform: translateY(0);
}
```

### 9.6 Magnetic Buttons

Buttons that attract the cursor slightly — feels premium:

```javascript
document.querySelectorAll('.btn-g').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    btn.style.transform = `translate(${x * 0.15}px, ${y * 0.3}px)`;
  });

  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});
```

---

## 10. Phase Design Ideas

### 10.1 Phase 1 — Visual Calibration: Neural Firing

**Current state:** A face card with star buttons and a progress ring.

**Idea: Neurons firing in the background when rating**

When a user taps a star rating, show a neural network animation in the background — nodes lighting up and connecting, simulating the MetaFBP model "learning":

```javascript
// Add to harmonia-preview/assets/js/app.js
function fireNeurons(rating) {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = `
    position: fixed; inset: 0; pointer-events: none;
    z-index: 5; opacity: 0;
  `;
  document.body.appendChild(canvas);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext('2d');

  // Create 20 random nodes
  const nodes = Array.from({ length: 20 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 4 + 2,
    lit: false,
    litAt: 0,
  }));

  // Randomly light up nodes sequentially
  let i = 0;
  const interval = setInterval(() => {
    if (i >= nodes.length) { clearInterval(interval); return; }
    nodes[i].lit = true;
    nodes[i].litAt = Date.now();
    i++;
  }, 40);

  let start = null;
  function draw(ts) {
    if (!start) start = ts;
    const elapsed = ts - start;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw connections between lit nodes
    nodes.forEach((a, ai) => {
      nodes.forEach((b, bi) => {
        if (ai >= bi || !a.lit || !b.lit) return;
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (dist > 200) return;
        const alpha = (1 - dist / 200) * 0.4;
        ctx.strokeStyle = `rgba(240, 200, 110, ${alpha})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      });
    });

    // Draw nodes
    nodes.forEach(node => {
      if (!node.lit) return;
      const age = Date.now() - node.litAt;
      const alpha = Math.max(0, 1 - age / 800);
      const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.r * 6);
      glow.addColorStop(0, `rgba(240, 200, 110, ${alpha})`);
      glow.addColorStop(1, 'rgba(240, 200, 110, 0)');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.r * 6, 0, Math.PI * 2);
      ctx.fill();
    });

    const opacity = Math.min(1, elapsed / 100);
    const fadeOut = elapsed > 600 ? Math.max(0, 1 - (elapsed - 600) / 300) : 1;
    canvas.style.opacity = opacity * fadeOut;

    if (elapsed < 900) requestAnimationFrame(draw);
    else canvas.remove();
  }

  requestAnimationFrame(draw);
}
```

Then call `fireNeurons(rating)` inside the `rateFace()` function in `app.js`.

### 10.2 Phase 2 — PIIP Questionnaire: Real-Time NLP Visualisation

**Current state:** Textarea, word count badge, static neural stats.

**Ideas:**
- **Sentiment shimmer:** As the user types, the textarea border shifts colour — warmer (gold) for positive language, cooler (wine) for conflict-adjacent language. Detect keywords: "anger", "unfair", "upset" → wine glow. "Happy", "together", "generous" → gold glow.

```javascript
const CONFLICT_WORDS = ['angry', 'unfair', 'upset', 'frustrated', 'annoyed', 'wouldn\'t', 'refuse'];
const POSITIVE_WORDS = ['happy', 'generous', 'together', 'help', 'share', 'understand', 'kindly'];

function analyseText(text) {
  const words = text.toLowerCase().split(/\W+/);
  const conflictScore = words.filter(w => CONFLICT_WORDS.includes(w)).length;
  const positiveScore = words.filter(w => POSITIVE_WORDS.includes(w)).length;

  const textarea = document.getElementById('qta');
  if (conflictScore > positiveScore) {
    textarea.style.borderColor = 'rgba(114, 47, 55, 0.8)';
    textarea.style.boxShadow = '0 0 20px rgba(114, 47, 55, 0.2)';
  } else if (positiveScore > 0) {
    textarea.style.borderColor = 'rgba(240, 200, 110, 0.8)';
    textarea.style.boxShadow = '0 0 20px rgba(240, 200, 110, 0.15)';
  }
}
```

- **Wrath meter:** A thin animated bar at the bottom of the textarea that fills left→right and pulses red when conflict language is detected. It should feel clinical, like an EEG readout.

- **Typing rhythm dots:** Three dots that pulse in sync with typing speed. Fast typing = rapid pulses. Slow, thoughtful pauses = gentle beats. Like a heart monitor for thought.

### 10.3 Phase 3 — HLA Upload: DNA Helix Animation

**Current state:** An upload zone with a DNA icon.

**Ideas:**
- When upload starts (after tapping), show an animating DNA double helix using CSS:

```css
@keyframes dna-spin {
  0%   { transform: rotateY(0deg); }
  100% { transform: rotateY(360deg); }
}

@keyframes dna-strand {
  0%   { stroke-dashoffset: 200; opacity: 0; }
  50%  { opacity: 1; }
  100% { stroke-dashoffset: 0; opacity: 0.6; }
}

.helix-gold {
  animation: dna-strand 2s ease-in-out infinite;
}
.helix-maroon {
  animation: dna-strand 2s ease-in-out 0.5s infinite;
}
```

- Progress fills not just a bar but the DNA rungs — each rung lights up as the "upload" progresses.
- Loci display (HLA-A, HLA-B, HLA-DRB1) should reveal with a typewriter effect:

```javascript
function typewriterReveal(element, text, speed = 50) {
  element.textContent = '';
  let i = 0;
  const interval = setInterval(() => {
    element.textContent += text[i];
    i++;
    if (i >= text.length) clearInterval(interval);
  }, speed);
}
```

### 10.4 Phase 6 — Completion: Checklist Build-Up

**Current state:** Static checklist with checkmarks.

**Ideas:**
- Animate each checklist item appearing with a delay and a satisfying tick sound (or haptic-like visual pulse)
- The WtM formula `(0.4 × S_vis) + (0.3 × S_psych) + (0.3 × S_bio)` could animate in piece by piece, like a calculation being revealed
- A circular "profile quality" meter that fills from 0% → "High" with the ring drawing animation

### 10.5 Phase 7 — Swipe Deck: Enhanced Card Physics

**Current state:** Physics-based drag with left/right/super like.

**Ideas:**
- **Card glow on drag direction:** As the user drags right, the card gets a warm gold glow. Left drag → cool wine glow.

```javascript
// In app.js, inside the pointermove handler for swipe cards
const dragPercent = currentX / (window.innerWidth * 0.4);
if (dragPercent > 0) {
  // Right drag → gold
  card.style.boxShadow = `0 0 ${40 * dragPercent}px rgba(212,168,83,${0.5 * dragPercent})`;
} else {
  // Left drag → maroon
  card.style.boxShadow = `0 0 ${40 * Math.abs(dragPercent)}px rgba(114,47,55,${0.4 * Math.abs(dragPercent)})`;
}
```

- **Background blur intensifies on drag** — as the card moves further from center, the background elements blur more, focusing attention.
- **LIKE/NOPE stamps** (already exist in HTML) could have a shake/pulse entrance with GSAP.

### 10.6 Phase 9 — Matches: Message Delivery Animation

**Current state:** Static message bubbles that appear.

**Ideas:**
- Sent messages could slide in from the right with a slight bounce
- Auto-replies could show a typing indicator (three dots) for 1.5 seconds before appearing
- Scroll-to-bottom auto-scroll should use smooth scroll

```javascript
// Smooth auto-scroll to bottom of chat
function scrollChatToBottom() {
  const msgs = document.getElementById('msgs');
  msgs.scrollTo({ top: msgs.scrollHeight, behavior: 'smooth' });
}
```

### 10.7 Phase 10 — Profile Radar: Animated Entry

**Current state:** Canvas radar chart renders on scroll.

**Ideas:**
- Each of the 7 axes should draw sequentially, like a flower blooming
- The filled polygon area should fill with a gradient ink wash, not just appear
- Hovering over an axis label could show a tooltip explaining the sin dimension

### 10.8 Phase 11 — Admin: Live Dashboard Feel

**Current state:** Static calibration table and efficiency chart.

**Ideas:**
- Numbers should count up when section scrolls into view
- The heatmap cells could have a wave-stagger reveal (like ripples in a pond)
- The Gemini efficiency chart bars should animate up from 0

---

## 11. Design Inspiration

### How to Study Another Website's Design

1. **Open the website** you want to learn from (e.g., linear.app, vercel.com, stripe.com)
2. **Right-click → Inspect** (or F12) to open DevTools
3. Click the **Elements** tab → hover over elements to highlight them
4. Click the **Styles** panel to see what CSS is applied
5. Switch to the **Sources** tab to read their JS

**The legality:** Reading public CSS/JS for learning is universally accepted. Copying it verbatim is not. Understand the technique, then implement it yourself.

### Sites Worth Studying for Each Effect

| Effect | Where to Study It |
|---|---|
| Glassmorphism | `linear.app`, `vercel.com` |
| Particle effects | `particles.js` demos, `bruno-simon.com` |
| Smooth scroll + scroll animations | `locomotive-scroll` demos, `webflow.io` |
| Neural/data visualisation | `d3js.org` examples, `observablehq.com` |
| Match reveal / celebration animations | `confetti.js` examples, Tinder web app |
| Magnetic buttons | `codrops.com` |
| Gradient mesh backgrounds | `mesh.gradient.style`, `grainy-gradient.vercel.app` |
| Noise/grain textures | `fffuel.co/grainy-gradient` |
| DNA / biological visualisations | `moleculejs.com`, RCSB Protein Data Bank |
| Typewriter effects | `typed.js` |
| Drag & physics | `framer-motion` docs (React), `matter.js` demos |

### How to "Steal" a Specific Effect

1. Find the CSS class responsible (via DevTools hover)
2. Copy just that CSS block — NOT the whole stylesheet
3. Understand what each property does before applying it
4. Adapt it to Harmonia's colour variables (`var(--gold)`, `var(--maroon)`)

**Example — Stealing a glassmorphism card from Linear.app:**
```css
/* You observed in Linear's CSS: */
.lin-card {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  backdrop-filter: blur(12px);
  border-radius: 8px;
}

/* Your Harmonia version, adapted: */
.harmonia-glass-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(212, 168, 83, 0.12);  /* gold tint border */
  backdrop-filter: blur(20px);
  border-radius: 16px;  /* rounder corners, Harmonia style */
}
```

### Specific Inspirations for the Preview

- **Onboarding flow:** See how Notion, Linear, and Figma onboard users — clean, step-by-step, lots of whitespace
- **Match reveal:** Study how celebration UIs work — Wordle share, Duolingo completion, Spotify Wrapped
- **Swipe cards:** Tinder web, Bumble — but push further with velocity-based physics
- **Scientific aesthetic:** Papers.co, ResearchGate for data-dense layouts that still feel elegant
- **Dark UI luxury feel:** Rolls-Royce site, Hennessy, Moët — warmth within darkness

---

## 12. AI-Assisted Design

### Using Claude for Design Changes

Claude (this AI) is excellent at writing CSS, HTML, and JavaScript changes. The key is being **specific**.

**Bad prompt:**
```
make the button look better
```

**Good prompt:**
```
In harmonia-preview/assets/css/components.css, find the .btn-g class.
Add a shimmer animation that runs once on hover — a white gleam that
sweeps left to right across the button. Use CSS @keyframes only,
no JavaScript. Keep the existing transition and padding. The shimmer
should use rgba(255,255,255,0.2) and the animation should last 0.6 seconds.
```

**Template for design change requests:**
```
File: [exact file path]
Element: [class or ID, e.g., ".btn-g" or "#radar-chart"]
Current behaviour: [what it does now]
Desired behaviour: [what you want it to do]
Constraints: [anything that must not change]
```

**What Claude does best for Harmonia:**
- Writing CSS animation keyframes
- Creating GSAP timelines from a description
- Debugging why a style isn't applying
- Writing Canvas drawing functions
- Converting design ideas into specific code
- Explaining what any line of code does

### Using Google AI Studio (Gemini)

Google AI Studio (aistudio.google.com) is excellent for:
- Analysing screenshots and suggesting improvements
- Generating SVG illustrations from descriptions
- Writing data visualisation code (it understands D3.js well)
- Image analysis — upload a screenshot, ask "what feels off about this design?"

**Workflow: Screenshot → Gemini → Code Change**

1. Take a screenshot of the phase you want to improve
2. Go to aistudio.google.com → New Prompt → add image
3. Paste this prompt:
```
This is a screenshot of a dating app's onboarding flow. I want to improve
the visual design of [specific section]. The colour palette is gold (#D4A853),
maroon (#722F37), and cream (#FAF6F1) for light mode, or wine-black (#12090A)
with bright gold (#F0C86E) for dark mode. The font is Cormorant Garamond for
headings and DM Sans for body text. Please suggest specific CSS improvements
and write the code for the most impactful change.
```

**Gemini 2.0 Flash is free and very good** for quick code questions. Gemini 1.5 Pro for complex multi-file reasoning.

### Combining Both — The Power Workflow

1. **Gemini:** "Analyse this phase visually, suggest 3 improvements"
2. **You:** Choose the most impactful suggestion
3. **Claude:** "Implement this specific suggestion in this specific file"
4. **Browser:** Refresh and review
5. **Repeat**

### Prompt Engineering Tips

- Always include the file path and element class/ID
- Describe what you want it to LOOK like, not what code to write
- If something looks wrong after the change, describe the actual vs. expected
- Ask "explain this code line by line" before changing it
- Ask "what would break if I changed X?" before experimenting

---

## 13. Resources

### Must-Bookmark References

**CSS**
- [MDN Web Docs — CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) — the definitive reference, searchable
- [CSS Tricks](https://css-tricks.com) — practical articles, Flexbox/Grid guides
- [Flexbox Froggy](https://flexboxfroggy.com) — learn Flexbox in a game
- [Grid Garden](https://cssgridgarden.com) — learn CSS Grid in a game
- [Cubic Bezier](https://cubic-bezier.com) — design custom animation curves visually
- [UI Gradient](https://uigradients.com) — gradient inspiration with code
- [Coolors](https://coolors.co) — colour palette generator, has Harmonia-style palettes

**Animation**
- [GSAP Docs](https://gsap.com/docs/v3/) — full GSAP reference with examples
- [GSAP Cheatsheet](https://gsap.com/community/forums/topic/22641-gsap-3-cheatsheet/) — quick reference
- [Codrops](https://tympanus.net/codrops/) — the best source for advanced animation techniques
- [Awwwards](https://awwwards.com) — award-winning websites for inspiration
- [Lottie Files](https://lottiefiles.com) — pre-made animations as JSON files, free
- [Rive](https://rive.app) — interactive animation tool, exports to web

**HTML & Accessibility**
- [HTML Elements Reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element) — every tag explained
- [Can I Use](https://caniuse.com) — check browser support for CSS/JS features

**JavaScript**
- [JavaScript.info](https://javascript.info) — the best JS tutorial, free
- [Eloquent JavaScript](https://eloquentjavascript.net) — free book, excellent depth
- [30 Days of JavaScript](https://github.com/Asabeneh/30-Days-Of-JavaScript) — practical challenges

**Design Tools**
- [Figma](https://figma.com) — design mockups before implementing
- [Spline](https://spline.design) — 3D design for the web, no code needed, exports CSS/HTML
- [Framer](https://framer.com) — design + code, generates React components
- [CodePen](https://codepen.io) — live code editor, huge library of examples to study

**Fonts**
- [Google Fonts](https://fonts.google.com) — free, already used by Harmonia
- [Klim Type](https://klim.co.nz) — premium editorial fonts (good for Harmonia's brand)
- [Fontshare](https://fontshare.com) — free high-quality fonts

**SVG & Icons**
- [Heroicons](https://heroicons.com) — clean SVG icons (Harmonia uses these)
- [Phosphor Icons](https://phosphoricons.com) — more expressive icon set
- [SVG Backgrounds](https://www.svgbackgrounds.com) — pattern backgrounds as SVG
- [Pattern Monster](https://pattern.monster) — CSS/SVG patterns

**Colour & Gradients**
- [Realtime Colors](https://realtimecolors.com) — live preview colour system
- [UI Colors](https://uicolors.app) — generate Tailwind-compatible colour scales
- [Mesher](https://csshero.org/mesher/) — CSS mesh gradient generator
- [Grain & Gradient](https://grainy-gradients.vercel.app) — adds texture to gradients

**Learning Platforms**
- [Scrimba](https://scrimba.com) — interactive video coding tutorials
- [Kevin Powell CSS](https://youtube.com/@KevinPowell) — best CSS YouTube channel
- [Fireship](https://youtube.com/@Fireship) — fast, dense, excellent tech overviews
- [The Coding Train](https://youtube.com/@TheCodingTrain) — creative coding, Canvas animations

### Advanced Reading — Professional & Research-Level

- [Smashing Magazine](https://smashingmagazine.com) — deep-dive design engineering articles
- [A List Apart](https://alistapart.com) — web standards and design thinking
- [Increment](https://increment.com) — engineering culture by Stripe
- [Chrome Developers](https://developer.chrome.com/blog/) — latest browser capabilities
- [CSS Working Group](https://drafts.csswg.org) — upcoming CSS specs before they ship

### Animation Inspiration Beyond Websites

- **Film title sequences** — study how information is revealed in opening credits (Fincher, Refn)
- **Medical imaging UIs** — how hospitals display diagnostic data (radiology software)
- **Bloomberg Terminal** — the aesthetic of data density
- **Figma's own UI** — every interaction is considered, study hover states
- **Apple's product pages** — scroll-driven animations, product photography integration
- **Anthropic's website** — neural aesthetic done tastefully

---

## Quick Reference — Emergency Fixes

### "My CSS change isn't showing up"
1. Hard refresh: Ctrl+Shift+R (Windows) / Cmd+Shift+R (Mac)
2. Check for typos in the class name (CSS is case-sensitive)
3. Check the correct file is open (main site vs preview has different CSS)
4. Open DevTools → Elements → hover your element → check Styles panel for red strikethroughs (overridden by a more specific rule)

### "I broke the layout"
1. Check for unclosed `</div>` tags — every `<div>` needs a matching `</div>`
2. Use DevTools → Elements panel to look for mismatched nesting
3. Use Ctrl+Z to undo changes

### "An animation isn't playing"
1. Open DevTools Console (F12) — look for red error messages
2. Check the element's class name in JS matches the HTML exactly
3. Check the GSAP script is loaded (in `<head>` of the HTML)

### "The page looks broken on mobile"
1. DevTools → Toggle Device Toolbar (Ctrl+Shift+M) to preview mobile
2. Check `responsive.css` for media query overrides
3. Ensure no fixed `width` values — use `max-width` instead

---

*Last updated: March 2026 — Harmonia Design System v1.0*
*For urgent changes or questions, use Claude Code or Google AI Studio with file path references from this document.*
