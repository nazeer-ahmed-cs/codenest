import { Quiz } from "../models/quiz";

export const gettingStartedQuiz: Quiz = {
  topicId: "Getting Started",
  questions: [
    {
      question: "What is the purpose of a web browser?",
      options: [
        "To write code",
        "To render and display web pages",
        "To manage databases",
        "To compile programs",
      ],
      correctIndex: 1,
      explanation:
        "A web browser fetches HTML, CSS, and JavaScript from a server and renders them into interactive web pages.",
    },
    {
      question: "Which tool is used to view the HTML structure of a webpage?",
      options: [
        "Task Manager",
        "Browser Developer Tools",
        "File Explorer",
        "Control Panel",
      ],
      correctIndex: 1,
      explanation:
        "Browser Developer Tools (F12 or right-click → Inspect) let you inspect HTML, CSS, network requests, and more.",
    },
    {
      question: "What does HTML stand for?",
      options: [
        "HyperText Markup Language",
        "High-Level Text Machine Language",
        "HyperTransfer Markup Logic",
        "Home Tool Markup Language",
      ],
      correctIndex: 0,
      explanation:
        "HTML stands for HyperText Markup Language — the standard language for creating web pages.",
    },
    {
      question: "What file name is typically used for the homepage of a website?",
      options: ["home.html", "index.html", "main.html", "start.html"],
      correctIndex: 1,
      explanation:
        "index.html is the conventional default file that web servers serve when a directory is requested.",
    },
    {
      question: "Which of the following is a code editor?",
      options: ["Google Chrome", "VS Code", "Slack", "Spotify"],
      correctIndex: 1,
      explanation:
        "VS Code (Visual Studio Code) is a popular free code editor used for web development.",
    },
  ],
};
