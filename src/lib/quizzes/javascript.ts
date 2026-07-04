import { Quiz } from "../models/quiz";

export const javascriptQuiz: Quiz = {
  topicId: "JavaScript",
  questions: [
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
      question: "How do you write an if statement in JavaScript?",
      options: ["if x > 5 {}", "if (x > 5)", "if (x > 5) {}", "if x > 5 then"],
      correctIndex: 2,
      explanation:
        "JavaScript if statements use parentheses around the condition and curly braces for the body: if (condition) { ... }",
    },
    {
      question: "Which method adds an element to the end of an array?",
      options: ["pop()", "push()", "shift()", "unshift()"],
      correctIndex: 1,
      explanation:
        "push() appends to the end. pop() removes from the end. shift() removes from the start. unshift() adds to the start.",
    },
    {
      question: "What is the result of 2 + '2'?",
      options: ["4", "'22'", "22", "undefined"],
      correctIndex: 1,
      explanation:
        "JavaScript coerces the number 2 to a string and concatenates, resulting in the string '22'. This is called type coercion.",
    },
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
      question: "What does `===` check?",
      options: [
        "Value equality only",
        "Type equality only",
        "Value and type equality without coercion",
        "Reference equality",
      ],
      correctIndex: 2,
      explanation:
        "=== (strict equality) checks both value and type without type coercion. == checks value with coercion allowed.",
    },
    {
      question: "Which event fires when a user clicks an element?",
      options: ["mouseover", "change", "click", "submit"],
      correctIndex: 2,
      explanation:
        "The click event fires when a pointing device button is pressed and released on an element.",
    },
  ],
};
