import { useState } from "react";
import Complete from '../assets/FinishSurvey.gif'

export default function CarbonSurvey() {
  const [currentQuestion, setCurrentQuestion] = useState("Did you use a car/motorcycle yesterday?");
  const [answers, setAnswers] = useState({});
  const [savings, setSavings] = useState(0.0);
  const [surveyCompleted, setSurveyCompleted] = useState(false);
  const [efficient, setEfficient] = useState(false);
  const [limit, setLimit] = useState(false);
  const [carpool, setCarpool] = useState(false);

  const getNextStepAndSavings = (question, answer) => {
    switch (question) {
      case "Did you use a car/motorcycle yesterday?":
        return answer === "Yes"
          ? { nextQuestion: "Did you use the most carbon efficient route?", newSavings: 0 }
          : { nextQuestion: "Did you use any public transportation?", newSavings: 0 };
      
      case "Did you use any public transportation?":
        return { nextQuestion: answer === "Yes" ? null : "Did you use an alternate electric form of transportation?", newSavings: answer === "Yes" ? 14.6 : 0.0 };
      
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
      setSurveyCompleted(true);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-green-300 to-green-500 p-4 mt-16">
      <div className="h-[10vh]"></div>
      {!surveyCompleted ? (
        <>
          <h2 className="text-5xl font-bold text-gray-800 mt-16 text-center w-full max-w-3xl">
            {currentQuestion}
          </h2>
          <div className="flex flex-col items-center justify-center flex-grow w-full max-w-xl">
            <div className="grid grid-cols-1 gap-6 w-full max-w-md mt-8">
              {["Yes", "No"].map((option) => (
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
        </>
      ) : (
        <div className="flex flex-col items-center min-h-screen">
            <img src = {Complete} width = {400} height = {600} alt="Congradulations!"></img>
          <h2 className="text-5xl font-bold text-gray-800 text-center">Daily Evaluation Completed!</h2>
          <p className="text-2xl text-gray-700 mt-6">You saved <span className="font-bold">{savings.toFixed(1)}</span> lbs of carbon!</p>
        </div>
      )}
    </div>
  );
}
