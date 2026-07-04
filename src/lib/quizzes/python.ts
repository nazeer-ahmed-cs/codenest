import { Quiz } from "../models/quiz";

export const pythonQuiz: Quiz = {
  topicId: "Python",
  questions: [
    {
      question: "How do you print output in Python?",
      options: [
        "console.log('hello')",
        "print('hello')",
        "echo 'hello'",
        "System.out.println('hello')",
      ],
      correctIndex: 1,
      explanation:
        "Python's built-in print() function writes text to the console.",
    },
    {
      question: "Which of these is a mutable data type in Python?",
      options: ["tuple", "string", "list", "int"],
      correctIndex: 2,
      explanation:
        "Lists are mutable — you can add, remove, or change elements after creation. Tuples and strings are immutable.",
    },
    {
      question: "What does the following code output?\n\nx = 10\nif x > 5:\n    print('big')\nelse:\n    print('small')",
      options: ["big", "small", "10", "Error"],
      correctIndex: 0,
      explanation: "Since 10 > 5 is True, the if branch executes and prints 'big'.",
    },
    {
      question: "How do you define a function in Python?",
      options: [
        "function myFunc():",
        "def myFunc():",
        "fn myFunc():",
        "func myFunc():",
      ],
      correctIndex: 1,
      explanation: "Python uses the 'def' keyword to define functions.",
    },
    {
      question: "What is the result of len([1, 2, 3])?",
      options: ["3", "2", "1", "TypeError"],
      correctIndex: 0,
      explanation: "len() returns the number of items in a sequence. The list has 3 elements.",
    },
    {
      question: "How do you import the math module in Python?",
      options: [
        "include math",
        "using math",
        "import math",
        "require('math')",
      ],
      correctIndex: 2,
      explanation: "Python uses the 'import' keyword to bring in modules from the standard library or packages.",
    },
    {
      question: "What does dict.keys() return?",
      options: [
        "A list of values",
        "A view of the dictionary's keys",
        "A list of tuples",
        "The number of keys",
      ],
      correctIndex: 1,
      explanation: "dict.keys() returns a view object that displays all the keys in the dictionary.",
    },
    {
      question: "Which statement is true about Python variables?",
      options: [
        "Variables must be declared with a type",
        "Variables are dynamically typed",
        "Variables can only hold numbers",
        "Variables cannot be reassigned",
      ],
      correctIndex: 1,
      explanation:
        "Python is dynamically typed — variables don't need type declarations and can be reassigned to different types.",
    },
  ],
};
