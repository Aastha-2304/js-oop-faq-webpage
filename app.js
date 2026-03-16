/**
 * QAItem — Object-Oriented Q&A component
 *
 * Each instance manages one question-answer pair:
 *  - Stores the question and answer text
 *  - Renders its own HTML into the DOM
 *  - Toggles visibility and updates the visual cue on click
 */
class QAItem {
  /**
   * @param {string} question - The question text
   * @param {string} answer   - The answer text
   */
  constructor(question, answer) {
    this.question  = question;
    this.answer    = answer;
    this.isOpen    = false;   // tracks current open/closed state
    this.element   = null;    // root DOM element (set after render)
  }

  /**
   * toggle() — flips the open/closed state and updates the DOM
   */
  toggle() {
    this.isOpen = !this.isOpen;
    this._updateDOM();
  }

  /**
   * _updateDOM() — syncs CSS class with current state
   * Adding/removing the "open" class drives all CSS transitions
   */
  _updateDOM() {
    if (!this.element) return;
    if (this.isOpen) {
      this.element.classList.add('open');
    } else {
      this.element.classList.remove('open');
    }
  }

  /**
   * render() — builds and returns the DOM node for this Q&A pair
   * @returns {HTMLElement}
   */
  render() {
    // Wrapper article
    const article = document.createElement('article');
    article.classList.add('qa-item');

    // ── Question button ────────────────────────────────
    const btn = document.createElement('button');
    btn.classList.add('qa-question');
    btn.setAttribute('aria-expanded', 'false');

    const questionText = document.createElement('span');
    questionText.textContent = this.question;

    const icon = document.createElement('span');
    icon.classList.add('qa-icon');
    icon.setAttribute('aria-hidden', 'true');
    icon.textContent = '+';

    btn.appendChild(questionText);
    btn.appendChild(icon);

    // ── Answer (collapsible) ───────────────────────────
    const answerWrapper = document.createElement('div');
    answerWrapper.classList.add('qa-answer-wrapper');

    const answerInner = document.createElement('div');
    answerInner.classList.add('qa-answer-inner');

    const answerPara = document.createElement('p');
    answerPara.classList.add('qa-answer');
    answerPara.textContent = this.answer;

    answerInner.appendChild(answerPara);
    answerWrapper.appendChild(answerInner);

    article.appendChild(btn);
    article.appendChild(answerWrapper);

    // ── Event listener ─────────────────────────────────
    btn.addEventListener('click', () => {
      this.toggle();
      // Keep aria-expanded in sync for accessibility
      btn.setAttribute('aria-expanded', String(this.isOpen));
      // Update icon text (+/−)
      icon.textContent = this.isOpen ? '−' : '+';
    });

    this.element = article;
    return article;
  }
}


/* ── Data ──────────────────────────────────────────────
   Define all Q&A pairs here.
   Add or remove objects to change the FAQ content.
──────────────────────────────────────────────────────── */
const qaData = [
  {
    question: "What is Object-Oriented Programming (OOP)?",
    answer:
      "Object-Oriented Programming is a programming paradigm that organises code " +
      "around objects — bundles of related data (properties) and behaviour (methods). " +
      "The four core pillars are Encapsulation, Abstraction, Inheritance, and Polymorphism. " +
      "OOP makes large codebases easier to reason about, maintain, and extend."
  },
  {
    question: "What is the difference between a class and an object?",
    answer:
      "A class is a blueprint or template that describes the structure and behaviour of " +
      "a concept. An object (or instance) is a concrete realisation of that blueprint " +
      "created at runtime. For example, 'QAItem' is the class; each individual FAQ card " +
      "on this page is a distinct QAItem object with its own state."
  },
  {
    question: "What does the 'this' keyword refer to in JavaScript?",
    answer:
      "'this' refers to the object that is currently executing the code. Inside a class " +
      "method, 'this' points to the specific instance the method was called on, giving " +
      "access to that instance's properties and other methods."
  },
  {
    question: "Why use CSS transitions instead of toggling display: none?",
    answer:
      "The 'display' property cannot be animated — switching it skips straight from " +
      "hidden to visible with no intermediate frames. CSS transitions (or the " +
      "'grid-template-rows' trick used here) let the browser interpolate values smoothly, " +
      "producing the accordion expand/collapse effect without any JavaScript animation loops."
  },
  {
    question: "What is event delegation and when is it useful?",
    answer:
      "Event delegation is the practice of attaching a single event listener to a parent " +
      "element instead of to every child. When a child is clicked, the event bubbles up " +
      "and the parent handles it. This is especially useful for dynamically generated " +
      "content (like this FAQ list) because the listener is set once and works for all " +
      "present and future children."
  }
];


/* ── Bootstrap ─────────────────────────────────────────
   Create QAItem instances, render them, and append to the DOM
──────────────────────────────────────────────────────── */
(function init() {
  const container = document.getElementById('faq-container');

  // Build an array of QAItem instances from the data
  const items = qaData.map(({ question, answer }) => new QAItem(question, answer));

  // Render each item and insert it into the page
  items.forEach(item => container.appendChild(item.render()));
})();
