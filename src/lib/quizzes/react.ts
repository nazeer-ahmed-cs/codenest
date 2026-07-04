import { Quiz } from "../models/quiz";

export const reactQuiz: Quiz = {
  topicId: "React",
  questions: [
    {
      question: "What is a React component?",
      options: [
        "A JavaScript function that returns HTML-like JSX",
        "A separate HTML file",
        "A CSS stylesheet",
        "A database query",
      ],
      correctIndex: 0,
      explanation:
        "A React component is a function (or class) that returns JSX — a syntax extension that looks like HTML but compiles to JavaScript function calls.",
    },
    {
      question: "How do you pass data from a parent to a child component?",
      options: ["state", "props", "context", "store"],
      correctIndex: 1,
      explanation:
        "Props (short for properties) are read-only arguments passed from parent to child. State is internal to a component.",
    },
    {
      question: "What hook is used to manage state in a functional component?",
      options: ["useEffect", "useState", "useReducer", "useContext"],
      correctIndex: 1,
      explanation:
        "useState returns a state variable and a setter function. useReducer is for complex state logic. useEffect handles side effects.",
    },
    {
      question: "What does the useEffect hook do?",
      options: [
        "Manages component state",
        "Runs side effects like data fetching or subscriptions",
        "Creates a new component",
        "Handles form validation",
      ],
      correctIndex: 1,
      explanation:
        "useEffect runs after render and is used for side effects: fetching data, setting up subscriptions, timers, or manually changing the DOM.",
    },
    {
      question: "What is JSX?",
      options: [
        "A template engine",
        "A syntax extension for JavaScript that looks like HTML",
        "A CSS framework",
        "A build tool",
      ],
      correctIndex: 1,
      explanation:
        "JSX is a syntax extension for JavaScript. It looks like HTML but gets transpiled to React.createElement() calls by tools like Babel.",
    },
    {
      question: "Which of these is true about React keys?",
      options: [
        "Keys are optional and have no effect",
        "Keys help React identify which items changed in a list",
        "Keys must be globally unique",
        "Keys are only used for styling",
      ],
      correctIndex: 1,
      explanation:
        "Keys help React efficiently re-render lists by identifying which items are added, removed, or reordered. They should be unique among siblings, not globally.",
    },
    {
      question: "What is the virtual DOM?",
      options: [
        "The actual browser DOM",
        "A lightweight JavaScript representation of the real DOM",
        "A CSS preprocessor",
        "A browser extension",
      ],
      correctIndex: 1,
      explanation:
        "The virtual DOM is a lightweight copy of the real DOM kept in memory. React diffs it against the new render to minimize expensive DOM manipulations.",
    },
    {
      question: "How do you conditionally render in React?",
      options: [
        "Using if/else inside JSX directly",
        "Using ternary operators or && short-circuiting",
        "Using HTML comments",
        "Using CSS display: none",
      ],
      correctIndex: 1,
      explanation:
        "Ternary (condition ? a : b) and && (condition && <Component />) are common patterns. if/else doesn't work inside JSX expressions.",
    },
    {
      question: "How do you prevent a form from submitting in React?",
      options: [
        "return false",
        "e.preventDefault()",
        "stop.submit()",
        "cancel.submit()",
      ],
      correctIndex: 1,
      explanation:
        "In React, call e.preventDefault() on the event object inside the submit handler to prevent the default form submission behavior.",
    },
    {
      question: "What is useRef used for?",
      options: [
        "Managing complex state",
        "Accessing DOM elements and storing mutable values",
        "Fetching data from an API",
        "Creating context providers",
      ],
      correctIndex: 1,
      explanation:
        "useRef returns a mutable ref object whose .current property persists across re-renders. It's commonly used to access DOM elements directly.",
    },
    {
      question: "What problem does React Context solve?",
      options: [
        "Component styling",
        "Prop drilling — passing data through many component levels",
        "State management for forms",
        "Code splitting",
      ],
      correctIndex: 1,
      explanation:
        "Context provides a way to share data (like themes or auth) across the component tree without passing props manually at every level.",
    },
    {
      question: "What is a custom hook?",
      options: [
        "A built-in React function",
        "A JavaScript function that starts with 'use' and may call other hooks",
        "A React component without JSX",
        "A third-party library",
      ],
      correctIndex: 1,
      explanation:
        "A custom hook is a function whose name starts with 'use' and may call other hooks. It lets you extract component logic into reusable functions.",
    },
  ],
};
