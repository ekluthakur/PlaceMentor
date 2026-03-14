export function generateQuestions(company, role, difficulty) {

  const questionBank = {

    Google: {
      Frontend: {
        Easy: [
          "What is HTML?",
          "What is CSS?",
          "What is JavaScript?"
        ],
        Medium: [
          "Explain the Virtual DOM.",
          "What are React Hooks?",
          "Difference between let, var, and const."
        ],
        Hard: [
          "Explain React Fiber architecture.",
          "How does React reconciliation work?",
          "Difference between CSR and SSR."
        ]
      }
    },

    Amazon: {
      Frontend: {
        Easy: [
          "What is responsive design?",
          "What is Flexbox?"
        ],
        Medium: [
          "Explain event bubbling in JavaScript.",
          "What is the DOM?"
        ],
        Hard: [
          "Explain JavaScript closures.",
          "What is memoization?"
        ]
      }
    },

    TCS: {
      Frontend: {
        Easy: [
          "What is a variable?",
          "What is a function?"
        ],
        Medium: [
          "Explain array methods in JavaScript.",
          "What is JSON?"
        ],
        Hard: [
          "Explain asynchronous programming.",
          "What is a promise in JavaScript?"
        ]
      }
    }

  }

  return (
    questionBank[company]?.Frontend?.[difficulty] ||
    ["Tell me about yourself."]
  )
}
