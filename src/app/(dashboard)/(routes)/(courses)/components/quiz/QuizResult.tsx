import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button"; // Assuming you're using Shadcn UI button component

interface Answer {
  answer: string;
  isCorrect: boolean;
  question_Id: string;
}

interface Question {
  question: string;
  options: string[];
  answer: string;  // Correct answer
  explanation?: string;
  _id: string;
}

interface QuizResultProps {
  totalQuestions: number;
  answers: Answer[]; // Array of user's answers (answer objects with isCorrect)
  questions: Question[];
  setIsResult: React.Dispatch<React.SetStateAction<boolean>>;
}

const QuizResult: React.FC<QuizResultProps> = ({ totalQuestions, answers, questions, setIsResult }) => {
  // Calculate the total score using the `isCorrect` flag in the answers
  const totalScore = answers.reduce((score, answer) => (answer.isCorrect ? score + 1 : score), 0);

  // Animation variants for page transitions
  const variants = {
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: 100, transition: { duration: 0.3 } },
  };

  return (
    <div className="flex flex-col justify-center items-center py-8 bg-background">
      {/* Results Summary (After finishing the quiz) */}
      <motion.div
        className="mt-8 p-6 rounded-lg shadow-lg bg-background text-foreground w-full max-w-2xl dark:bg-gray-900"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
      >
        <h2 className="text-3xl font-bold mb-6">Quiz Summary</h2>

        {/* Display total score */}
        <div className="mb-6">
          <p className="text-xl font-semibold">
            Your Score: {totalScore} / {totalQuestions}
          </p>
        </div>

        <ul>
          {questions?.map((question, index) => {
            const userAnswer = answers[index];

            return (
              <li key={question._id} className="mb-4">
                <h3 className="text-xl">{question.question}</h3>
                <ul className="space-y-2">
                  {question.options.map((option, i) => (
                    <li
                      key={i}
                      className={`py-2 px-4 rounded-md
                        ${userAnswer.answer === option ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-200"}
                        ${question.answer === option && userAnswer.answer === option ? "bg-green-800" : ""}
                        ${question.answer === option && userAnswer.answer !== option ? "bg-green-800 text-white" : ""}
                        ${userAnswer.answer !== question.answer && userAnswer.answer === option ? "bg-red-500" : ""}
                        ${userAnswer.answer !== question.answer && question.answer === option ? "bg-yellow-400" : ""}`
                    }
                    >
                      {option}
                    </li>
                  ))}
                </ul>

                {/* Display Result of User's Answer */}
                <p
                  className={`mt-2 text-lg font-semibold ${userAnswer.isCorrect ? "text-green-400" : "text-red-400"}`}
                >
                  {userAnswer.isCorrect ? "Correct" : "Incorrect"}
                </p>

                {/* Show Explanation if available */}
                {question.explanation && (
                  <div className="mt-4 p-4 rounded-md bg-gray-200 dark:bg-background">
                    <p className="text-sm font-semibold">Explanation:</p>
                    <p>{question.explanation}</p>
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        {/* Finish Button */}
        <Button
          className="bg-indigo-500 hover:bg-indigo-600 text-white mt-4"
          onClick={() => setIsResult(false)} // Close the result page (go back to quiz)
        >
          Re Attempt
        </Button>
      </motion.div>
    </div>
  );
};

export default QuizResult;
