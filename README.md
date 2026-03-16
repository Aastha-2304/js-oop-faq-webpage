# Interactive FAQ — OOP JavaScript Assignment

An interactive FAQ webpage where answers toggle open and closed when their question is clicked. Built with semantic HTML, CSS transitions, and Object-Oriented JavaScript.

---

## Live Preview

Open `index.html` in any modern browser — no build step or server required.

---

## Project Structure

```
.
├── index.html   # Semantic HTML shell
├── style.css    # Styling, transitions, and visual cues
├── app.js       # QAItem class + bootstrap logic
└── README.md
```

---

## Implementation

### HTML (`index.html`)

- Uses a `<header>` for the page title and a `<main>` containing a `<section id="faq-container">`.
- The FAQ cards are **dynamically injected** by JavaScript — the HTML file itself contains no hard-coded Q&A markup.
- Each rendered card uses an `<article>` wrapper, a `<button>` for the question (keyboard-accessible), and a `<p>` for the answer.

### CSS (`style.css`)

| Goal | Technique |
|---|---|
| Answers hidden by default | `grid-template-rows: 0fr` on the wrapper |
| Smooth expand / collapse | Transition on `grid-template-rows` (animatable, unlike `display`) |
| Open-state reveal | `.qa-item.open` sets `grid-template-rows: 1fr` |
| Fade + slide in | `opacity` and `translateY` transition on the answer paragraph |
| Visual cue | Round icon showing `+`; rotates and turns red when open |
| Bold question styling | Serif body font, pointer cursor, hover colour change |

### JavaScript (`app.js`)

#### `QAItem` Class

```js
class QAItem {
  constructor(question, answer)  // stores text, initialises isOpen = false
  toggle()                       // flips isOpen, calls _updateDOM()
  _updateDOM()                   // adds/removes the "open" CSS class
  render()                       // builds & returns the DOM node; attaches click listener
}
```

- **Encapsulation** — each instance owns its own state (`isOpen`) and DOM reference (`this.element`).
- **Separation of concerns** — the class handles its own rendering and behaviour; the bootstrap function only wires data to the DOM.

#### Data & Bootstrap

```js
const qaData = [ { question, answer }, … ];   // plain data array

(function init() {
  const items = qaData.map(d => new QAItem(d.question, d.answer));
  items.forEach(item => container.appendChild(item.render()));
})();
```

The immediately-invoked `init` function creates all `QAItem` instances from `qaData` and appends their rendered elements to `#faq-container`.

---

## Accessibility

- Questions are `<button>` elements — fully keyboard-navigable (Tab + Enter/Space).
- `aria-expanded` attribute is toggled on click to communicate state to screen readers.
- The icon span carries `aria-hidden="true"` so it is skipped by assistive technology.

---

## How to Add More Questions

Open `app.js` and append an object to the `qaData` array:

```js
{
  question: "Your new question here?",
  answer:   "Your answer here."
}
```

Save and refresh — no other changes needed.
