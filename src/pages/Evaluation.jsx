import { useState } from "react";

export default function CarbonSurvey() {
  const [currentQuestion, setCurrentQuestion] = useState("Did you use a car/motorcycle yesterday?");
  const [answers, setAnswers] = useState({});
  const [savings, setSavings] = useState(0.0); // Carbon savings as a double (float)
  const [efficient, setEfficient] = useState(false);
  const [limit, setLimit] = useState(false);
  const [carpool, setCarpool] = useState(false);

  const getNextStepAndSavings = (question, answer) => {
    switch (question) {
      case "Did you use a car/motorcycle yesterday?":
        if (answer === "Yes") {
          return { nextQuestion: "Did you use the most carbon efficient route?", newSavings: 0};
        } else {
          return { nextQuestion: "Did you use any public transportation?", newSavings: 0};
        }

      case "Did you use any public transportation?":
        if (answer === "Yes") {
          return { nextQuestion: null, newSavings: 14.6 };
        } else {
          return { nextQuestion: "Did you use an alternate electric form of transportation?", newSavings: 0.0 };
        }

      case "Did you use an alternate electric form of transportation?":
        return { nextQuestion: null, newSavings: answer === "Yes" ? 27.0 : 30.0 };

      case "Did you use the most carbon efficient route?":
        setEfficient(answer === "Yes");
        return { nextQuestion: "Did you drive at the speed limit to improve mileage?", newSavings: 0.0 };

      case "Did you drive at the speed limit to improve mileage?":
        setLimit(answer === "Yes");
        return { nextQuestion: "Did you carpool?", newSavings: 0.0 };

      case "Did you carpool?":
        setCarpool(answer === "Yes");
        return { nextQuestion: "Was the car/motorcycle electric?", newSavings: 0.0 };

      case "Was the car/motorcycle electric?":
        const additionalSavings = 23.4 + 0.2 * (
          (efficient ? 2.9 : 0) + (limit ? 0.5 : 0) + (carpool ? 14.6 : 0)
        );
        const totalSavings = answer === "Yes" ? additionalSavings : (efficient ? 2.9 : 0) + (limit ? 0.5 : 0) + (carpool ? 14.6 : 0);
        return { nextQuestion: null, newSavings: totalSavings };

      default:
        return { nextQuestion: null, newSavings: 0.0 };
    }
  };

  const handleAnswer = (answer) => {
    const newAnswers = { ...answers, [currentQuestion]: answer };
    setAnswers(newAnswers);

    const { nextQuestion, newSavings } = getNextStepAndSavings(currentQuestion, answer);

    setSavings(newSavings);

    if (nextQuestion) {
      setCurrentQuestion(nextQuestion);
    } else {
      // Survey is finished, display carbon savings rounded to one decimal place
      alert(`Survey completed! You saved ${newSavings.toFixed(1)} lbs of carbon!`);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-green-300 to-green-500 p-4">
      <h2 className="text-5xl font-bold text-gray-800 mt-16 text-center w-full max-w-3xl">
        {currentQuestion}
      </h2>
      <div className="flex flex-col items-center justify-center flex-grow w-full max-w-xl">
        <div className="grid grid-cols-1 gap-6 w-full max-w-md mt-8">
          {currentQuestion === "Did you use a car/motorcycle yesterday?" && (
            <>
              <button
                className="bg-green-600 text-white py-4 px-6 text-lg rounded-lg hover:bg-green-700 transition duration-300 shadow-md"
                onClick={() => handleAnswer("Yes")}
              >
                Yes
              </button>
              <button
                className="bg-green-600 text-white py-4 px-6 text-lg rounded-lg hover:bg-green-700 transition duration-300 shadow-md"
                onClick={() => handleAnswer("No")}
              >
                No
              </button>
            </>
          )}

          {currentQuestion === "Did you use any public transportation?" && (
            <>
              <button
                className="bg-green-600 text-white py-4 px-6 text-lg rounded-lg hover:bg-green-700 transition duration-300 shadow-md"
                onClick={() => handleAnswer("Yes")}
              >
                Yes
              </button>
              <button
                className="bg-green-600 text-white py-4 px-6 text-lg rounded-lg hover:bg-green-700 transition duration-300 shadow-md"
                onClick={() => handleAnswer("No")}
              >
                No
              </button>
            </>
          )}

          {currentQuestion === "Did you use an alternate electric form of transportation?" && (
            <>
              <button
                className="bg-green-600 text-white py-4 px-6 text-lg rounded-lg hover:bg-green-700 transition duration-300 shadow-md"
                onClick={() => handleAnswer("Yes")}
              >
                Yes
              </button>
              <button
                className="bg-green-600 text-white py-4 px-6 text-lg rounded-lg hover:bg-green-700 transition duration-300 shadow-md"
                onClick={() => handleAnswer("No")}
              >
                No
              </button>
            </>
          )}

          {currentQuestion === "Did you use the most carbon efficient route?" && (
            <>
              <button
                className="bg-green-600 text-white py-4 px-6 text-lg rounded-lg hover:bg-green-700 transition duration-300 shadow-md"
                onClick={() => handleAnswer("Yes")}
              >
                Yes
              </button>
              <button
                className="bg-green-600 text-white py-4 px-6 text-lg rounded-lg hover:bg-green-700 transition duration-300 shadow-md"
                onClick={() => handleAnswer("No")}
              >
                No
              </button>
            </>
          )}

          {currentQuestion === "Did you drive at the speed limit to improve mileage?" && (
            <>
              <button
                className="bg-green-600 text-white py-4 px-6 text-lg rounded-lg hover:bg-green-700 transition duration-300 shadow-md"
                onClick={() => handleAnswer("Yes")}
              >
                Yes
              </button>
              <button
                className="bg-green-600 text-white py-4 px-6 text-lg rounded-lg hover:bg-green-700 transition duration-300 shadow-md"
                onClick={() => handleAnswer("No")}
              >
                No
              </button>
            </>
          )}

          {currentQuestion === "Did you carpool?" && (
            <>
              <button
                className="bg-green-600 text-white py-4 px-6 text-lg rounded-lg hover:bg-green-700 transition duration-300 shadow-md"
                onClick={() => handleAnswer("Yes")}
              >
                Yes
              </button>
              <button
                className="bg-green-600 text-white py-4 px-6 text-lg rounded-lg hover:bg-green-700 transition duration-300 shadow-md"
                onClick={() => handleAnswer("No")}
              >
                No
              </button>
            </>
          )}

          {currentQuestion === "Was the car/motorcycle electric?" && (
            <>
              <button
                className="bg-green-600 text-white py-4 px-6 text-lg rounded-lg hover:bg-green-700 transition duration-300 shadow-md"
                onClick={() => handleAnswer("Yes")}
              >
                Yes
              </button>
              <button
                className="bg-green-600 text-white py-4 px-6 text-lg rounded-lg hover:bg-green-700 transition duration-300 shadow-md"
                onClick={() => handleAnswer("No")}
              >
                No
              </button>
            </>
          )}
        </div>
      </div>
      {/* Display the carbon savings rounded to 1 decimal place */}
      <div className="mb-8 text-gray-600 text-sm">
        Current Carbon Savings: {savings.toFixed(1)} lbs
      </div>
    </div>
  );
}