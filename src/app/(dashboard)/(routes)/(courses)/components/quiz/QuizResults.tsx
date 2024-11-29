import React from "react";
import { motion } from "framer-motion";

interface Answer {
  questionId: string;
  answer: string;
  isCorrect: boolean;
}

interface QuizResultProps {
  score: number;
  totalQuestions: number;
  answers: Answer[];
  setIsResult: () => void;
  questions: { _id: string; question: string; options: string[]; explanation?: string }[];
}

const QuizResults = ({

  totalQuestions,
  answers,
  questions,
  setIsResult
}: any) => {


  const score = answers?.filter((ans: any) => ans.isCorrect).length

  return (
    <motion.div
      className="max-w-3xl mx-auto p-6 space-y-6 bg-background text-foreground shadow-lg rounded-lg border mt-2 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Title Section */}
      <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-gray-100">
        Quiz Results
      </h2>

      {/* Score and Message Section */}
      <div className="flex justify-between items-center">
        <p className="text-xl">
          Score: <span className="font-semibold text-blue-600">{score}</span> /
          {totalQuestions}
        </p>
        <p className="text-xl">
          {score === totalQuestions ? (
            <span className="text-green-600">Perfect Score! 🎉</span>
          ) : (
            <span className="text-red-600">Better luck next time! 🙁</span>
          )}
        </p>
      </div>

      {/* Quiz Question Breakdown */}
      <div>
        {questions?.map((question: any) => {
          const userAnswer = answers.find((ans: any) => ans.question_Id === question?._id);
          const isCorrect = userAnswer?.isCorrect;
          return (
            <motion.div
              key={question?._id}
              className="mb-6 space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="space-y-2">
                <h3 className="font-medium text-lg text-gray-800 dark:text-gray-100">
                  {question?.question}
                </h3>

                <div className="space-y-2">
                  {question?.options.map((option: any, index: number) => {
                    const isSelected = userAnswer?.answer === option;
                    const optionClass = isCorrect
                      ? isSelected
                        ? "bg-green-100 border-green-500"
                        : "bg-gray-100 border-gray-500"
                      : isSelected
                        ? "bg-red-100 border-red-500"
                        : "bg-white border-gray-300 dark:bg-gray-700 dark:border-gray-600";

                    return (
                      <div
                        key={index}
                        className={`p-3 border rounded-lg transition-colors ${optionClass}`}
                      >
                        <span
                          className={`font-semibold ${isSelected
                              ? isCorrect
                                ? "text-green-600"
                                : "text-red-600"
                              : "text-gray-700 dark:text-gray-500"
                            }`}
                        >
                          {option}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Explanation Section */}
                {question?.explanation && (
                  <div className="mt-2 text-sm text-gray-600 italic dark:text-gray-400">
                    <strong>Explanation:</strong> {question?.explanation}
                  </div>
                )}

                {/* Correct/Incorrect Answer Status */}
                <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {isCorrect ? (
                    <span className="text-green-600">Correct Answer</span>
                  ) : (
                    <span className="text-red-600">Incorrect Answer</span>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Retry Button */}
      <div className="mt-6 text-center">
        <motion.button
          onClick={() => setIsResult(false)}
          className="px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md transform transition-all duration-300"
          whileHover={{ scale: 1.05 }}
        >
          Retry Quiz
        </motion.button>
      </div>
    </motion.div>
  );
};

export default QuizResults;
