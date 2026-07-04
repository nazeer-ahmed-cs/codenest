import { Quiz } from "../models/quiz";

export const htmlQuiz: Quiz = {
  topicId: "HTML",
  questions: [
    {
      question: "Which HTML tag is used to create a hyperlink?",
      options: ["<link>", "<a>", "<href>", "<url>"],
      correctIndex: 1,
      explanation:
        "The <a> (anchor) tag defines a hyperlink. The href attribute specifies the destination URL.",
    },
    {
      question: "What does the <img> tag require to display an image?",
      options: ["alt attribute", "src attribute", "href attribute", "class attribute"],
      correctIndex: 1,
      explanation:
        "The src (source) attribute tells the browser where to find the image file. The alt attribute provides fallback text.",
    },
    {
      question: "Which tag is used for an unordered list?",
      options: ["<ol>", "<ul>", "<li>", "<list>"],
      correctIndex: 1,
      explanation:
        "<ul> (unordered list) renders bullet points. <ol> creates numbered lists. <li> is the list item used inside both.",
    },
    {
      question: "What is the purpose of the <head> element?",
      options: [
        "To display the main content",
        "To contain metadata, title, and links to stylesheets",
        "To define a header for the page",
        "To create navigation links",
      ],
      correctIndex: 1,
      explanation:
        "The <head> element holds metadata (charset, viewport), the page <title>, and links to CSS/JS files — none of which are rendered directly.",
    },
    {
      question: "Which HTML5 tag is used for navigation links?",
      options: ["<nav>", "<menu>", "<navigation>", "<header>"],
      correctIndex: 0,
      explanation:
        "The <nav> semantic element defines a set of navigation links, helping screen readers and SEO understand the structure.",
    },
    {
      question: "What does the alt attribute on an image do?",
      options: [
        "Specifies the image height",
        "Provides alternate text if the image cannot be displayed",
        "Links the image to another page",
        "Sets the image border",
      ],
      correctIndex: 1,
      explanation:
        "The alt attribute provides descriptive text for screen readers and when the image fails to load. It's also important for SEO.",
    },
    {
      question: "Which tag creates a line break?",
      options: ["<lb>", "<break>", "<br>", "<hr>"],
      correctIndex: 2,
      explanation:
        "<br> (line break) inserts a single line break. <hr> creates a horizontal rule (thematic break).",
    },
    {
      question: "Which input type creates a checkbox?",
      options: ["text", "checkbox", "radio", "submit"],
      correctIndex: 1,
      explanation:
        'type="checkbox" renders a checkbox that can be toggled on/off independently. Radio buttons restrict selection to one of a group.',
    },
    {
      question: "What does the HTML5 `<!DOCTYPE>` declaration do?",
      options: [
        "Defines the document type and version of HTML",
        "Starts the HTML document",
        "Imports a stylesheet",
        "Declares a character encoding",
      ],
      correctIndex: 0,
      explanation:
        "The DOCTYPE declaration tells the browser which version of HTML to use. For HTML5, it is simply `<!DOCTYPE html>`.",
    },
    {
      question: "Which semantic element defines the main content area of a page?",
      options: ["<main>", "<body>", "<section>", "<article>"],
      correctIndex: 0,
      explanation:
        "The <main> element represents the dominant content of the page. There should be only one <main> per page.",
    },
    {
      question: "Which attribute is used to open a link in a new tab?",
      options: ["rel", "target", "href", "download"],
      correctIndex: 1,
      explanation:
        'target="_blank" opens the linked page in a new browser tab or window. The rel="noopener" is often added for security.',
    },
    {
      question: "What is the correct syntax for an HTML comment?",
      options: [
        "// this is a comment",
        "/* this is a comment */",
        "<!-- this is a comment -->",
        "# this is a comment",
      ],
      correctIndex: 2,
      explanation:
        "HTML comments are wrapped in `<!--` and `-->`. They are not displayed in the browser but can be seen in the source code.",
    },
    {
      question: "Which element is used to define a table header cell?",
      options: ["<td>", "<th>", "<tr>", "<thead>"],
      correctIndex: 1,
      explanation:
        "<th> (table header) defines a header cell, which is typically bold and centered by default. <td> is for standard data cells.",
    },
    {
      question: "What does the `type` attribute control in an `<input>` element?",
      options: [
        "The size of the input field",
        "The kind of data the input accepts",
        "The name of the input",
        "The default value",
      ],
      correctIndex: 1,
      explanation:
        'The type attribute determines the input behavior — e.g. type="email" validates email format, type="number" shows a numeric keypad on mobile.',
    },
    {
      question: "Which meta tag ensures proper rendering on mobile devices?",
      options: [
        '<meta name="description" ...>',
        '<meta name="viewport" ...>',
        '<meta charset="UTF-8">',
        '<meta http-equiv="refresh" ...>',
      ],
      correctIndex: 1,
      explanation:
        'The viewport meta tag (`<meta name="viewport" content="width=device-width, initial-scale=1">`) ensures responsive behavior on mobile devices.',
    },
    {
      question: "What is the difference between a `<div>` and a `<span>`?",
      options: [
        "<div> is inline, <span> is block",
        "<div> is block-level, <span> is inline",
        "They are identical",
        "<div> can only contain text, <span> can contain images",
      ],
      correctIndex: 1,
      explanation:
        "<div> is a block-level element that takes up the full width. <span> is an inline element that only takes up as much width as needed.",
    },
    {
      question: "Which HTML element embeds an audio file?",
      options: ["<audio>", "<sound>", "<music>", "<media>"],
      correctIndex: 0,
      explanation:
        "The <audio> element embeds sound content. It supports attributes like controls, autoplay, and loop for playback behavior.",
    },
    {
      question: "What does the `required` attribute do on a form input?",
      options: [
        "Makes the input field read-only",
        "Prevents the form from submitting unless the field is filled in",
        "Requires a specific input format",
        "Automatically focuses the input",
      ],
      correctIndex: 1,
      explanation:
        "The `required` Boolean attribute enforces client-side validation — the form will not submit until the field has a value.",
    },
  ],
};
