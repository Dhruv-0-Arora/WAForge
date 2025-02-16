import { useState } from "react";

const questionFlow = {
  "How many flights do you take per year?": {
    options: ["0-2", "3-5", "6+"],
    next: {
      "0-2": "How many miles do you drive per week?",
      "3-5": "Do you use carbon offsets for flights?",
      "6+": "How often do you travel internationally?"
    }
  },
  "How many miles do you drive per week?": {
    options: ["0-10", "11-50", "50+"],
    next: {
      "0-10": "Do you use public transportation?",
      "11-50": "What type of vehicle do you primarily use?",
      "50+": "Do you carpool regularly?"
    }
  },
  "Do you use carbon offsets for flights?": {
    options: ["Yes", "No"],
    next: {
      "Yes": "Do you actively try to reduce your carbon footprint?",
      "No": "What is your household's primary energy source?"
    }
  },
  "How often do you travel internationally?": {
    options: ["Rarely", "Sometimes", "Frequently"],
    next: {
      "Rarely": "How often do you eat meat?",
      "Sometimes": "What is your household's primary energy source?",
      "Frequently": "Do you actively try to reduce your carbon footprint?"
    }
  },
  // Add more questions as needed
};

export default function CarbonSurvey() {
  const [currentQuestion, setCurrentQuestion] = useState(Object.keys(questionFlow)[0]);
  const [answers, setAnswers] = useState({});

  const handleAnswer = (answer) => {
    const newAnswers = { ...answers, [currentQuestion]: answer };
    setAnswers(newAnswers);

    const nextQuestion = questionFlow[currentQuestion]?.next[answer];
    if (nextQuestion) {
      setCurrentQuestion(nextQuestion);
    } else {
      alert("Survey completed! Your responses: " + JSON.stringify(newAnswers, null, 2));
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-green-300 to-green-500 p-4">
      <h2 className="text-5xl font-bold text-gray-800 mt-16 text-center w-full max-w-3xl">
        {currentQuestion}
      </h2>
      <div className="flex flex-col items-center justify-center flex-grow w-full max-w-xl">
        <div className="grid grid-cols-1 gap-6 w-full max-w-md mt-8">
          {questionFlow[currentQuestion]?.options.map((option) => (
            <button
              key={option}
              className="bg-green-600 text-white py-4 px-6 text-lg rounded-lg hover:bg-green-700 transition duration-300 shadow-md"
              onClick={() => handleAnswer(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
