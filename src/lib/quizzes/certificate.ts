import type { Quiz } from "@/lib/models/quiz";

export const certificateQuiz: Quiz = {
  topicId: "Certificate",
  questions: [
    // ── HTML (8) ──
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
        "The src (source) attribute tells the browser where to find the image file.",
    },
    {
      question: "Which semantic HTML element defines the main content area?",
      options: ["<body>", "<main>", "<section>", "<article>"],
      correctIndex: 1,
      explanation:
        "The <main> element represents the dominant content of the page. There should be only one <main> per page.",
    },
    {
      question: "Which attribute opens a link in a new tab?",
      options: ["rel", "target", "href", "download"],
      correctIndex: 1,
      explanation:
        'target="_blank" opens the linked page in a new browser tab or window.',
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
        "The alt attribute provides descriptive text for screen readers and when the image fails to load.",
    },
    {
      question: "Which HTML5 tag is used for navigation links?",
      options: ["<nav>", "<menu>", "<navigation>", "<header>"],
      correctIndex: 0,
      explanation:
        "The <nav> semantic element defines a set of navigation links.",
    },
    {
      question: "What is the correct HTML for inserting a line break?",
      options: ["<lb>", "<break>", "<br>", "<hr>"],
      correctIndex: 2,
      explanation:
        "<br> (line break) inserts a single line break. <hr> creates a horizontal rule.",
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
        'The viewport meta tag ensures responsive behaviour on mobile devices.',
    },

    // ── CSS (8) ──
    {
      question:
        "Which CSS property changes the text colour of an element?",
      options: ["font-color", "text-color", "color", "foreground"],
      correctIndex: 2,
      explanation:
        "The `color` property sets the foreground text colour. `background-color` sets the background.",
    },
    {
      question: "Which CSS property makes a layout flexbox?",
      options: ["display: block", "display: flex", "position: relative", "float: left"],
      correctIndex: 1,
      explanation:
        "display: flex enables flexbox layout, which distributes space along a single axis.",
    },
    {
      question: "What does CSS specificity determine?",
      options: [
        "Which colours are used on the page",
        "Which styles apply when multiple rules target the same element",
        "The order of CSS animations",
        "The size of the viewport",
      ],
      correctIndex: 1,
      explanation:
        "Specificity determines which CSS rule the browser applies when conflicting rules match the same element.",
    },
    {
      question: "Which unit is relative to the parent element's font size?",
      options: ["px", "rem", "em", "vh"],
      correctIndex: 2,
      explanation:
        "1em equals the parent element's font size. 1rem equals the root (html) font size.",
    },
    {
      question: "How do you apply a class named 'highlight' in CSS?",
      options: [".highlight", "#highlight", "highlight", "*highlight"],
      correctIndex: 0,
      explanation:
        "A dot (.) selects elements by class. A hash (#) selects by id.",
    },
    {
      question: "Which box-model property is outside the border?",
      options: ["padding", "margin", "content", "outline"],
      correctIndex: 1,
      explanation:
        "Margin is the outermost layer of the box model, creating space between elements.",
    },
    {
      question: "What does `position: fixed` do?",
      options: [
        "Positions relative to the nearest positioned ancestor",
        "Positions relative to the viewport",
        "Positions relative to the document flow",
        "Removes the element from flow entirely",
      ],
      correctIndex: 1,
      explanation:
        "Fixed positioning anchors an element relative to the viewport, so it stays in place during scrolling.",
    },
    {
      question: "Which media query targets screens narrower than 768px?",
      options: [
        "@media (min-width: 768px)",
        "@media (max-width: 768px)",
        "@media (width: 768px)",
        "@media (screen > 768px)",
      ],
      correctIndex: 1,
      explanation:
        "max-width: 768px applies styles when the viewport is 768px or narrower.",
    },

    // ── JavaScript (14) ──
    {
      question: "Which keyword declares a constant variable in JavaScript?",
      options: ["var", "let", "const", "static"],
      correctIndex: 2,
      explanation:
        "const declares a block-scoped constant that cannot be reassigned. let allows reassignment.",
    },
    {
      question: "What does `typeof` operator return?",
      options: [
        "The type of a value as a string",
        "The length of a value",
        "Whether a variable exists",
        "The class of an object",
      ],
      correctIndex: 0,
      explanation:
        "typeof returns a string indicating the type: 'string', 'number', 'boolean', 'object', 'undefined', etc.",
    },
    {
      question: "Which of the following is falsy in JavaScript?",
      options: ["'false'", "[]", "0", "{}"],
      correctIndex: 2,
      explanation:
        "0 is falsy. 'false', [], and {} are all truthy. Falsy values are false, 0, '', null, undefined, and NaN.",
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
        "The ternary operator evaluates the condition a. If truthy it returns b; otherwise it returns c.",
    },
    {
      question: "Which loop guarantees the body runs at least once?",
      options: ["for", "while", "do...while", "for...of"],
      correctIndex: 2,
      explanation:
        "do...while executes the body first, then checks the condition. for and while check the condition before running.",
    },
    {
      question: "Which method adds an element to the end of an array?",
      options: ["push()", "pop()", "unshift()", "append()"],
      correctIndex: 0,
      explanation:
        "push() adds one or more elements to the end. pop() removes from the end. unshift() adds to the beginning.",
    },
    {
      question: "What does `[1, 2, 3].map(n => n * 2)` return?",
      options: ["[1, 2, 3]", "[2, 4, 6]", "[undefined, undefined, undefined]", "6"],
      correctIndex: 1,
      explanation:
        "map() creates a new array by applying the callback to each element. Each number is doubled: [2, 4, 6].",
    },
    {
      question: "What is the result of `3 + \"3\"` in JavaScript?",
      options: ["6", "\"33\"", "33", "TypeError"],
      correctIndex: 1,
      explanation:
        "When a number and string are added with +, JavaScript coerces the number to a string and concatenates.",
    },
    {
      question: "Which syntax correctly defines an arrow function?",
      options: [
        "function => () {}",
        "const fn = () => {}",
        "const fn = function() => {}",
        "() => const fn = {}",
      ],
      correctIndex: 1,
      explanation:
        "Arrow functions use the => syntax: const fn = () => { }. They don't have their own `this` binding.",
    },
    {
      question: "How do you access the `name` property of an object `user`?",
      options: ["user(name)", "user->name", "user.name", "user[name]"],
      correctIndex: 2,
      explanation:
        "Dot notation (user.name) is the standard way to access properties. Bracket notation is used for dynamic keys.",
    },
    {
      question: "What does `Object.keys({ a: 1, b: 2 })` return?",
      options: ["[1, 2]", "['a', 'b']", "[{ a: 1 }, { b: 2 }]", "['a:1', 'b:2']"],
      correctIndex: 1,
      explanation:
        "Object.keys() returns an array of the object's own enumerable property names: ['a', 'b'].",
    },
    {
      question: "What does the `===` operator check?",
      options: [
        "Value equality only",
        "Value and type equality",
        "Reference equality only",
        "Type equality only",
      ],
      correctIndex: 1,
      explanation:
        "=== (strict equality) checks both value and type without coercion. == checks value with type coercion.",
    },
    {
      question: "How do you convert a JSON string to a JavaScript object?",
      options: ["JSON.stringify()", "JSON.parse()", "JSON.convert()", "JSON.decode()"],
      correctIndex: 1,
      explanation:
        "JSON.parse() parses a JSON string into a JavaScript object. JSON.stringify() does the reverse.",
    },
    {
      question: "What does `document.querySelector('.foo')` return?",
      options: [
        "All elements with class 'foo'",
        "The first element matching '.foo'",
        "The element with id 'foo'",
        "A NodeList of matching elements",
      ],
      correctIndex: 1,
      explanation:
        "querySelector returns the first matching element. Use querySelectorAll to get all matches.",
    },

    // ── React (6) ──
    {
      question: "What is a React component?",
      options: [
        "A CSS class",
        "A reusable piece of UI",
        "A JavaScript variable",
        "An HTML file",
      ],
      correctIndex: 1,
      explanation:
        "A React component is a reusable, self-contained piece of UI that returns JSX.",
    },
    {
      question: "Which hook manages state in a functional component?",
      options: ["useEffect", "useState", "useContext", "useReducer"],
      correctIndex: 1,
      explanation:
        "useState returns a state variable and a setter function. It's the primary way to manage local state.",
    },
    {
      question: "What is JSX?",
      options: [
        "A JavaScript framework",
        "A syntax extension that looks like HTML in JavaScript",
        "A CSS preprocessor",
        "A database query language",
      ],
      correctIndex: 1,
      explanation:
        "JSX is a syntax extension for JavaScript that allows you to write HTML-like markup inside JS code.",
    },
    {
      question: "How do you pass data from a parent to a child component?",
      options: ["State", "Props", "Context", "Refs"],
      correctIndex: 1,
      explanation:
        "Props (properties) are read-only data passed from parent to child components.",
    },
    {
      question: "What does `useEffect` with an empty dependency array `[]` do?",
      options: [
        "Runs on every render",
        "Runs once when the component mounts",
        "Runs only when state changes",
        "Never runs",
      ],
      correctIndex: 1,
      explanation:
        "An empty dependency array causes the effect to run only once after the initial render (mount).",
    },
    {
      question: "Which hook would you use to create a reference to a DOM element?",
      options: ["useRef", "useState", "useCallback", "useMemo"],
      correctIndex: 0,
      explanation:
        "useRef returns a mutable ref object that persists across renders, commonly used to access DOM elements.",
    },

    // ── General Web Dev (6) ──
    {
      question: "What does HTTP status code 404 mean?",
      options: [
        "Internal Server Error",
        "Not Found",
        "Unauthorized",
        "Bad Request",
      ],
      correctIndex: 1,
      explanation:
        "404 Not Found means the server could not find the requested resource. 500 is Internal Server Error.",
    },
    {
      question: "What is the purpose of a CDN?",
      options: [
        "To store databases",
        "To deliver static assets quickly from servers close to the user",
        "To compile JavaScript",
        "To manage user authentication",
      ],
      correctIndex: 1,
      explanation:
        "A Content Delivery Network (CDN) distributes assets across global servers to reduce latency.",
    },
    {
      question: "What does responsive web design mean?",
      options: [
        "A website that loads instantly",
        "A website that adapts its layout to different screen sizes",
        "A website with animations",
        "A website that works offline",
      ],
      correctIndex: 1,
      explanation:
        "Responsive web design uses flexible layouts and CSS media queries to adapt to any screen size.",
    },
    {
      question: "What is the semantic HTML element for a footer?",
      options: ["<footer>", "<bottom>", "<end>", "<section>"],
      correctIndex: 0,
      explanation:
        "The <footer> semantic element represents footer content — copyright, links, authorship info.",
    },
    {
      question: "Which HTTP method is used to submit form data?",
      options: ["GET", "POST", "PUT", "DELETE"],
      correctIndex: 1,
      explanation:
        "POST sends data to the server to create or update a resource. GET retrieves data.",
    },
    {
      question: "What is a breakpoint in responsive design?",
      options: [
        "A point where the website breaks",
        "A viewport width where the layout changes",
        "A JavaScript debugger statement",
        "A CSS syntax error",
      ],
      correctIndex: 1,
      explanation:
        "A breakpoint is a viewport width at which the layout changes via a media query.",
    },
    // ── Python (8) ──
    {
      question: "How do you print output in Python?",
      options: ["console.log()", "print()", "echo()", "System.out.println()"],
      correctIndex: 1,
      explanation: "Python's built-in print() function writes text to the console.",
    },
    {
      question: "Which Python data type is mutable?",
      options: ["tuple", "string", "list", "int"],
      correctIndex: 2,
      explanation: "Lists are mutable. Tuples, strings, and ints are immutable.",
    },
    {
      question: "What does len('hello') return?",
      options: ["4", "5", "6", "TypeError"],
      correctIndex: 1,
      explanation: "len() returns the number of characters in the string. 'hello' has 5 characters.",
    },
    {
      question: "How do you define a function in Python?",
      options: ["function myFunc():", "def myFunc():", "fn myFunc():", "func myFunc():"],
      correctIndex: 1,
      explanation: "Python uses the def keyword to define functions.",
    },
    {
      question: "What is the result of 10 // 3 in Python?",
      options: ["3.33", "3", "3.0", "1"],
      correctIndex: 1,
      explanation: "// is floor division in Python. 10 // 3 = 3 (integer division).",
    },
    {
      question: "Which keyword is used to import modules?",
      options: ["include", "using", "import", "require"],
      correctIndex: 2,
      explanation: "Python uses the import keyword to bring in modules.",
    },
    {
      question: "What does range(5) generate?",
      options: ["[1, 2, 3, 4, 5]", "[0, 1, 2, 3, 4]", "[0, 1, 2, 3, 4, 5]", "Error"],
      correctIndex: 1,
      explanation: "range(5) generates numbers from 0 to 4 (exclusive of 5).",
    },
    {
      question: "Which statement is true about Python?",
      options: [
        "Python is statically typed",
        "Python is dynamically typed",
        "Python requires semicolons",
        "Python uses curly braces for blocks",
      ],
      correctIndex: 1,
      explanation: "Python is dynamically typed and uses indentation for blocks, not curly braces or semicolons.",
    },
    // ── SQL (8) ──
    {
      question: "Which SQL statement retrieves data?",
      options: ["GET", "FETCH", "SELECT", "RETRIEVE"],
      correctIndex: 2,
      explanation: "SELECT is the SQL command for querying data from tables.",
    },
    {
      question: "How do you filter rows in SQL?",
      options: ["FILTER", "WHERE", "HAVING", "MATCH"],
      correctIndex: 1,
      explanation: "The WHERE clause filters rows before any grouping occurs.",
    },
    {
      question: "What does INNER JOIN return?",
      options: [
        "All rows from both tables",
        "Only rows with matching values in both tables",
        "All rows from the left table",
        "All rows from the right table",
      ],
      correctIndex: 1,
      explanation: "INNER JOIN returns only rows where the join condition is met in both tables.",
    },
    {
      question: "Which function counts rows in SQL?",
      options: ["TOTAL()", "SUM()", "COUNT()", "LEN()"],
      correctIndex: 2,
      explanation: "COUNT() returns the number of rows or non-null values in a column.",
    },
    {
      question: "What does '%cat%' in a LIKE clause match?",
      options: [
        "Strings starting with 'cat'",
        "Strings ending with 'cat'",
        "Strings containing 'cat' anywhere",
        "Strings exactly equal to 'cat'",
      ],
      correctIndex: 2,
      explanation: "The % wildcard matches any sequence. '%cat%' matches 'cat' anywhere in the string.",
    },
    {
      question: "What is a PRIMARY KEY?",
      options: [
        "A column that allows NULL values",
        "A column that uniquely identifies each row",
        "A key for sorting results",
        "A reference to another table",
      ],
      correctIndex: 1,
      explanation: "A PRIMARY KEY uniquely identifies each row. It must be unique and non-null.",
    },
    {
      question: "Which clause sorts SQL results?",
      options: ["SORT BY", "ORDER BY", "GROUP BY", "ARRANGE BY"],
      correctIndex: 1,
      explanation: "ORDER BY sorts the result set in ascending (default) or descending order.",
    },
    {
      question: "What does AVG(price) return?",
      options: [
        "The total price",
        "The average price",
        "The highest price",
        "The row count",
      ],
      correctIndex: 1,
      explanation: "AVG() computes the arithmetic mean of values in a column.",
    },
  ],
};
