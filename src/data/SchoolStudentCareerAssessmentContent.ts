interface Question {
    id: number;
    question: string;
}

interface Category {
    category: string;
    questions: Question[];
}

export const assessmentQuestions: Category[] = [
    {
        category: "Career Awareness",
        questions: [
            {
                id: 1,
                question:
                    "Do you find it difficult to identify your interests and strengths?",
            },
            {
                id: 2,
                question:
                    "Are you unsure about which career options are suitable for you?",
            },
            {
                id: 3,
                question:
                    "Do you have limited knowledge about different career paths and opportunities?",
            },
            {
                id: 4,
                question:
                    "Do you feel confused when choosing subjects or streams for your future?",
            },
        ],
    },
    {
        category: "Academic Challenges",
        questions: [
            {
                id: 5,
                question:
                    "Do you find it difficult to connect your academic subjects with future career options?",
            },
            {
                id: 6,
                question:
                    "Do you struggle to identify which subjects you are naturally good at?",
            },
            {
                id: 7,
                question:
                    "Do you feel that your academic performance does not reflect your actual abilities?",
            },
            {
                id: 8,
                question:
                    "Do you feel stressed or confused about academic choices affecting your career?",
            },
        ],
    },
    {
        category: "Decision-Making",
        questions: [
            {
                id: 9,
                question:
                    "Do you find it difficult to make decisions about your future career?",
            },
            {
                id: 10,
                question:
                    "Do you often depend on others when making important career-related decisions?",
            },
            {
                id: 11,
                question:
                    "Do you worry about making the wrong career choice?",
            },
            {
                id: 12,
                question:
                    "Do you find it difficult to compare different career options?",
            },
        ],
    },
    {
        category: "Career Exploration",
        questions: [
            {
                id: 13,
                question:
                    "Have you explored different career options beyond the commonly known professions?",
            },
            {
                id: 14,
                question:
                    "Do you know what qualifications or skills are required for careers you are interested in?",
            },
            {
                id: 15,
                question:
                    "Do you find it difficult to understand current and future career opportunities?",
            },
            {
                id: 16,
                question:
                    "Would you like guidance to explore careers that match your interests and abilities?",
            },
        ],
    },
    {
        category: "Personal Development",
        questions: [
            {
                id: 17,
                question:
                    "Do you feel you need help to improve your confidence about your career choices?",
            },
            {
                id: 18,
                question:
                    "Do you find it difficult to set clear academic or career goals?",
            },
            {
                id: 19,
                question:
                    "Would you like support in developing skills needed for your future career?",
            },
            {
                id: 20,
                question:
                    "Do you feel you need professional guidance to plan your career journey?",
            },
        ],
    },
];