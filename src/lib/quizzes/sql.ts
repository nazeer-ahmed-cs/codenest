import { Quiz } from "../models/quiz";

export const sqlQuiz: Quiz = {
  topicId: "SQL",
  questions: [
    {
      question: "Which SQL statement is used to retrieve data from a table?",
      options: ["GET", "FETCH", "SELECT", "RETRIEVE"],
      correctIndex: 2,
      explanation: "SELECT is the SQL command for querying data from tables.",
    },
    {
      question: "How do you filter rows in a SELECT query?",
      options: ["FILTER", "WHERE", "HAVING", "MATCH"],
      correctIndex: 1,
      explanation: "The WHERE clause filters rows before aggregation. HAVING filters after GROUP BY.",
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
      explanation: "INNER JOIN returns rows where the join condition is met in both tables. Unmatched rows are excluded.",
    },
    {
      question: "Which function calculates the number of rows?",
      options: ["TOTAL()", "SUM()", "COUNT()", "LEN()"],
      correctIndex: 2,
      explanation: "COUNT() returns the number of rows (or non-null values in a column).",
    },
    {
      question: "What does the LIKE '%cat%' pattern match?",
      options: [
        "Strings starting with 'cat'",
        "Strings ending with 'cat'",
        "Strings containing 'cat' anywhere",
        "Strings exactly equal to 'cat'",
      ],
      correctIndex: 2,
      explanation: "The % wildcard matches any sequence of characters. '%cat%' matches 'cat' anywhere in the string.",
    },
    {
      question: "What is a PRIMARY KEY?",
      options: [
        "A column that allows NULL values",
        "A column that uniquely identifies each row",
        "A key used for sorting",
        "A foreign table reference",
      ],
      correctIndex: 1,
      explanation: "A PRIMARY KEY uniquely identifies each row. It must contain unique values and cannot be NULL.",
    },
    {
      question: "Which SQL clause is used to sort results?",
      options: ["SORT BY", "ORDER BY", "GROUP BY", "ARRANGE BY"],
      correctIndex: 1,
      explanation: "ORDER BY sorts the result set. ASC (default) or DESC controls the direction.",
    },
    {
      question: "What does the following query return?\n\nSELECT AVG(price) FROM products;",
      options: [
        "The total price of all products",
        "The average price of all products",
        "The highest price",
        "The count of products",
      ],
      correctIndex: 1,
      explanation: "AVG() computes the arithmetic mean of the values in the column.",
    },
  ],
};
