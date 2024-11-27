'use client'
import { useState, useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import api from '@/api';
import { Button } from '@/components/ui/button';
import QuizResults from '../../../(courses)/components/quiz/QuizResults';
import { motion } from "framer-motion";
import { toast } from '@/components/ui/use-toast';
import { AxiosError } from 'axios';

const QuizPage = () => {
  const router = useRouter();
  const { quiz_id } = useParams()

  const [quiz, setQuiz] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [result, setResult] = useState<any>(null);
  const [isResult, setIsResult] = useState(false)

  useEffect(() => {
    if (quiz_id) {
      setLoading(true);
      api
        .get(`/v1/quiz/questions/${quiz_id}`)
        .then((response) => {
          const data = response.data.data
          setLoading(false);
          if (data?.attemptResult?.status === "completed") {
            setResult(data.attemptResult)
            setQuestions(data?.questions);
            setQuiz(data.quizData);
            setIsResult(true)
            return;
          } else {
            setQuiz(data);
            setQuestions(data?.questions);
          }
        })
        .catch((error) => {
          setLoading(false);
          if (error.status === 403) {
            toast({
              title: 'Error!',
              description: error?.response?.data?.message,
              variant: 'destructive',
            })
            router.back()
          }
          console.log(error)
        });
    }
  }, [quiz_id]);

  const handleAnswerChange = (questionIndex: number, optionIndex: number) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = optionIndex;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = async () => {
    try {
      const response = await api.post(`/v1/quiz/submit/${quiz_id}`, {
        answers,
      });
      const data = response.data.data;
      data.status = 'completed'
      setResult(data)

      setQuestions(data?.questions);
      setIsResult(true)
      toast({
        title: 'Quiz Completed!',
        description: 'Congratulations! You have completed the quiz.',
        variant: 'success',
      })
      return;

    } catch (error) {
      const axiosError = error as AxiosError<AxiosError>
      toast({
        title: 'Error!',
        description: axiosError?.response?.data.message,
        variant: 'destructive',
      });
      setIsResult(true)
    }
  };


  if (result?.status === "completed" && isResult) {
    return (
      <QuizResults
        totalQuestions={result?.totalQuestions}
        answers={result?.answers}
        questions={questions}
        setIsResult={setIsResult}
      />
    );

  } else {

    return (

      <div className="container mx-auto px-6 py-12 max-w-3xl">
        {/* Loading Spinner */}
        {loading ? (
          <div className="flex justify-center items-center">
            <CircularProgress />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Quiz Title */}

            <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-8">
              {quiz?.title}
            </h1>

            {/* Quiz Description */}
            <p
              className="text-center text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: quiz?.description }}
            />

            {/* Quiz Questions */}
            <div className="space-y-8">
              {questions?.map((question, index) => (
                <motion.div
                  key={index}
                  className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                    {question?.question}
                  </h3>

                  <div className="space-y-4">
                    {question?.options.map((option: any, optionIndex: any) => (
                      <label
                        key={optionIndex}
                        className="flex items-center space-x-3 bg-background text-foreground hover:bg-blue-100 dark:hover:bg-gray-900  transition-colors rounded-lg p-2 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name={`question-${index}`}
                          value={optionIndex}
                          checked={answers[index] === optionIndex}
                          onChange={() => handleAnswerChange(index, optionIndex)}
                          className="w-5 h-5 text-blue-500 dark:text-blue-300"
                        />
                        <span className="text-gray-700 dark:text-gray-300">{option}</span>
                      </label>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Submit Button */}
            {
              questions?.length &&
              <div className="flex justify-center gap-x-6 mt-8">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Button
                    color="primary"
                    onClick={handleSubmit}
                    disabled={answers.length < questions?.length}
                    style={{
                      padding: '10px 20px',
                      fontSize: '18px',
                      fontWeight: '600',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                      transition: 'transform 0.3s ease, background-color 0.3s ease',
                    }}
                  >
                    Submit Quiz
                  </Button>
                </motion.div>
              </div>
            }



          </motion.div>
        )}
      </div>

    );
  }

};

export default QuizPage;
