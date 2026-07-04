import { Quiz } from "../models/quiz";

export const cssQuiz: Quiz = {
  topicId: "CSS",
  questions: [
    {
      question: "What does CSS stand for?",
      options: [
        "Cascading Style Sheets",
        "Creative Style System",
        "Computer Styling Syntax",
        "Colorful Style Sheets",
      ],
      correctIndex: 0,
      explanation:
        "CSS (Cascading Style Sheets) controls the visual presentation of HTML elements — layout, colors, fonts, and more.",
    },
    {
      question: "Which CSS property changes the text color?",
      options: ["font-color", "text-color", "color", "foreground"],
      correctIndex: 2,
      explanation:
        "The `color` property sets the foreground (text) color. `background-color` sets the background.",
    },
    {
      question: "How do you select an element with id 'header' in CSS?",
      options: [".header", "#header", "header", "*header"],
      correctIndex: 1,
      explanation:
        "#header selects by id. .header selects by class. header selects by element type.",
    },
    {
      question: "Which value of `display` makes elements appear side by side?",
      options: ["block", "inline", "flex", "none"],
      correctIndex: 2,
      explanation:
        "display: flex enables Flexbox, which lays out children in a row or column. inline places elements inline but doesn't accept width/height. block stacks vertically.",
    },
    {
      question: "What does `margin: 0 auto;` do?",
      options: [
        "Removes all margins",
        "Centers a block-level element horizontally",
        "Adds equal margin on all sides",
        "Removes the top and bottom margin",
      ],
      correctIndex: 1,
      explanation:
        "margin: 0 auto sets top/bottom margin to 0 and left/right to auto, which centers the element inside its parent.",
    },
    {
      question: "Which unit is relative to the parent element's font size?",
      options: ["px", "rem", "em", "vh"],
      correctIndex: 2,
      explanation:
        "em is relative to the parent's font size. rem is relative to the root (html) font size. px is absolute. vh is relative to viewport height.",
    },
    {
      question: "What is the default value of `position`?",
      options: ["relative", "absolute", "fixed", "static"],
      correctIndex: 3,
      explanation:
        "position: static is the default — elements follow the normal document flow. relative, absolute, and fixed all change positioning context.",
    },
    {
      question: "How do you apply a hover effect to a button?",
      options: ["button:hover", "button:click", "button:focus", "button:active"],
      correctIndex: 0,
      explanation:
        ":hover is a pseudo-class that triggers when the user's pointer is over the element. :active triggers on click, :focus on keyboard focus.",
    },
    {
      question: "Which CSS property controls the space inside an element, between the content and its border?",
      options: ["margin", "padding", "spacing", "gap"],
      correctIndex: 1,
      explanation:
        "`padding` creates space inside the element, between the content and the border. `margin` creates space outside the element.",
    },
    {
      question: "What is CSS specificity?",
      options: [
        "The order in which styles are applied",
        "The weight of a selector that determines which styles override others",
        "The speed at which CSS loads",
        "The ability to target specific elements",
      ],
      correctIndex: 1,
      explanation:
        "Specificity is the algorithm browsers use to decide which CSS rule takes precedence. ID selectors beat class selectors, which beat element selectors.",
    },
    {
      question: "Which property creates space between flex items?",
      options: ["margin", "justify-content", "gap", "padding"],
      correctIndex: 2,
      explanation:
        "The `gap` property sets the spacing between flex (or grid) items. `justify-content` aligns items along the main axis, not spacing between them.",
    },
    {
      question: "How do you write a media query for screens narrower than 768px?",
      options: [
        "@media (max-width: 768px)",
        "@media screen < 768px",
        "@media (min-width: 768px)",
        "@media (width: 768px)",
      ],
      correctIndex: 0,
      explanation:
        "@media (max-width: 768px) applies styles when the viewport is 768px or narrower. min-width applies styles above the threshold.",
    },
    {
      question: "What does `box-sizing: border-box;` do?",
      options: [
        "Includes padding and border in the element's total width and height",
        "Excludes padding from the element's total width",
        "Adds a border to the box model",
        "Removes the box-shadow",
      ],
      correctIndex: 0,
      explanation:
        "With `border-box`, the element's width/height includes content + padding + border, making layout sizing more intuitive.",
    },
    {
      question: "Which pseudo-element selects the first line of a paragraph?",
      options: [":first-line", "::first-line", ":first-child", "::before"],
      correctIndex: 1,
      explanation:
        "`::first-line` (double colon) is a pseudo-element that styles the first line of a block-level element. Pseudo-elements use `::`, pseudo-classes use `:`.",
    },
    {
      question: "How do you declare a CSS custom property (variable)?",
      options: [
        "$primary-color: blue;",
        "--primary-color: blue;",
        "@primary-color: blue;",
        "var(primary-color): blue;",
      ],
      correctIndex: 1,
      explanation:
        "Custom properties are declared with a double hyphen prefix (`--name`) and accessed with `var(--name)`. They enable dynamic theming.",
    },
    {
      question: "Which value of `position` removes an element from the normal document flow?",
      options: ["static", "relative", "absolute", "sticky"],
      correctIndex: 2,
      explanation:
        "`position: absolute` removes the element from normal flow and positions it relative to its nearest positioned ancestor.",
    },
    {
      question: "What does the `z-index` property control?",
      options: [
        "The zoom level of an element",
        "The stacking order of overlapping elements",
        "The horizontal alignment",
        "The order of flex items",
      ],
      correctIndex: 1,
      explanation:
        "`z-index` controls the stack order of positioned elements. Higher values appear on top of lower values in the z-axis.",
    },
    {
      question: "Which CSS property adds rounded corners to an element?",
      options: ["border-round", "corner-radius", "border-radius", "radius"],
      correctIndex: 2,
      explanation:
        "`border-radius` rounds the corners of an element. You can set different radii for each corner, e.g., `border-radius: 10px 5px;`.",
    },
  ],
};
