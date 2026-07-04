import { Quiz } from "../models/quiz";

export const javascriptQuiz: Quiz = {
  topicId: "JavaScript",
  questions: [
    // ── Variables & Data Types (3) ──
    {
      question: "Which keyword declares a constant variable?",
      options: ["var", "let", "const", "static"],
      correctIndex: 2,
      explanation:
        "const declares a variable that cannot be reassigned. let allows reassignment. var is the older, function-scoped declaration.",
    },
    {
      question: "What does `typeof 'hello'` return?",
      options: ["'hello'", "'string'", "'text'", "'char'"],
      correctIndex: 1,
      explanation:
        "typeof returns a string indicating the type. For 'hello' (a string literal), it returns 'string'.",
    },
    {
      question: "What is the value of `let x;` (declared but not assigned)?",
      options: ["null", "undefined", "0", "false"],
      correctIndex: 1,
      explanation:
        "A variable declared with let but not assigned a value is undefined. null must be explicitly assigned.",
    },

    // ── Conditionals (3) ──
    {
      question: "How do you write an if statement in JavaScript?",
      options: ["if x > 5 {}", "if (x > 5)", "if (x > 5) {}", "if x > 5 then"],
      correctIndex: 2,
      explanation:
        "JavaScript if statements use parentheses around the condition and curly braces for the body: if (condition) { ... }",
    },
    {
      question: "Which of the following is falsy in JavaScript?",
      options: ["'false'", "[]", "0", "{}"],
      correctIndex: 2,
      explanation:
        "0 is falsy. 'false' (non-empty string), [] (empty array), and {} (empty object) are all truthy.",
    },
    {
      question: "What does the ternary operator `a ? b : c` do?",
      options: [
        "Loops while a is true",
        "Returns b if a is truthy, otherwise c",
        "Assigns a to b or c",
        "Compares a to b and c",
      ],
      correctIndex: 1,
      explanation:
        "The ternary operator evaluates the condition a. If truthy, it returns b; otherwise it returns c.",
    },

    // ── Loops (2) ──
    {
      question: "Which loop guarantees the body runs at least once?",
      options: ["for", "while", "do...while", "for...of"],
      correctIndex: 2,
      explanation:
        "do...while executes the body first, then checks the condition. for and while check the condition before running.",
    },
    {
      question: "What keyword skips to the next iteration of a loop?",
      options: ["break", "skip", "continue", "next"],
      correctIndex: 2,
      explanation:
        "continue skips the rest of the current iteration and moves to the next one. break exits the loop entirely.",
    },

    // ── Functions (3) ──
    {
      question: "Which syntax defines a function?",
      options: [
        "function = myFunc() {}",
        "function myFunc() {}",
        "def myFunc():",
        "func myFunc() {}",
      ],
      correctIndex: 1,
      explanation:
        "function myFunc() {} is the standard function declaration. Arrow functions use const myFunc = () => {}.",
    },
    {
      question: "What does a function return if it has no return statement?",
      options: ["null", "undefined", "0", "false"],
      correctIndex: 1,
      explanation:
        "A function without a return statement returns undefined by default. null must be explicitly returned.",
    },
    {
      question: "Which of these is an arrow function?",
      options: [
        "function(x) { return x * 2; }",
        "const fn = (x) => x * 2;",
        "def fn(x): return x * 2",
        "fn(x) => { x * 2 }",
      ],
      correctIndex: 1,
      explanation:
        "const fn = (x) => x * 2 is an arrow function. Arrow functions use the => syntax and have implicit return for single expressions.",
    },

    // ── Arrays (3) ──
    {
      question: "Which method adds an element to the end of an array?",
      options: ["pop()", "push()", "shift()", "unshift()"],
      correctIndex: 1,
      explanation:
        "push() appends to the end. pop() removes from the end. shift() removes from the start. unshift() adds to the start.",
    },
    {
      question: "What does `[1, 2, 3].map(n => n * 2)` return?",
      options: ["[1, 2, 3]", "[2, 4, 6]", "[undefined, undefined, undefined]", "6"],
      correctIndex: 1,
      explanation:
        "map() creates a new array by applying the callback to each element. Each number is doubled: [2, 4, 6].",
    },
    {
      question: "What is the result of `[1, 2, 3].filter(n => n > 1)`?",
      options: ["[1]", "[2, 3]", "[3]", "[1, 2]"],
      correctIndex: 1,
      explanation:
        "filter() keeps elements where the callback returns true. Numbers greater than 1 are 2 and 3.",
    },

    // ── Objects (2) ──
    {
      question: "How do you access the `name` property of an object `user`?",
      options: ["user(name)", "user->name", "user.name", "user[name]"],
      correctIndex: 2,
      explanation:
        "Dot notation (user.name) is the standard way to access properties. Bracket notation (user['name']) is used for dynamic keys.",
    },
    {
      question: "What does `Object.keys({ a: 1, b: 2 })` return?",
      options: ["[1, 2]", "['a', 'b']", "[{ a: 1 }, { b: 2 }]", "['a:1', 'b:2']"],
      correctIndex: 1,
      explanation:
        "Object.keys() returns an array of the object's own enumerable property names: ['a', 'b'].",
    },

    // ── DOM Basics (2) ──
    {
      question: "Which method selects the first element matching a CSS selector?",
      options: [
        "getElementById()",
        "querySelector()",
        "querySelectorAll()",
        "getElementsByClassName()",
      ],
      correctIndex: 1,
      explanation:
        "querySelector() returns the first element matching the CSS selector. querySelectorAll() returns all matches as a NodeList.",
    },
    {
      question: "How do you change the text content of an element?",
      options: [
        "element.innerHTML = 'text'",
        "element.textContent = 'text'",
        "element.value = 'text'",
        "element.innerText('text')",
      ],
      correctIndex: 1,
      explanation:
        "textContent sets the text content, stripping HTML tags. innerHTML sets HTML markup. value is for form inputs.",
    },

    // ── Events (2) ──
    {
      question: "Which event fires when a user clicks an element?",
      options: ["mouseover", "change", "click", "submit"],
      correctIndex: 2,
      explanation:
        "The click event fires when a pointing device button is pressed and released on an element.",
    },
    {
      question: "What does `e.preventDefault()` do in an event handler?",
      options: [
        "Stops the event from bubbling",
        "Prevents the browser's default behavior",
        "Removes the event listener",
        "Cancels all future events",
      ],
      correctIndex: 1,
      explanation:
        "preventDefault() stops the browser's default action, like preventing a form from reloading the page on submit.",
    },
  ],
};
