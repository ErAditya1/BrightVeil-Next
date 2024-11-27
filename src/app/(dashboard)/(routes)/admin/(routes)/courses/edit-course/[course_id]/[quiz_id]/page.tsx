'use client'
import { BadgeDollarSignIcon, BookMarkedIcon, DeleteIcon, FileAxis3DIcon, LayoutDashboard, PlusCircle } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { BiMoneyWithdraw } from 'react-icons/bi'
import { Button } from '@/components/ui/button'
import { useParams, useRouter } from 'next/navigation'
import axios, { AxiosError } from 'axios'
import api from '@/api'
import { toast } from '@/components/ui/use-toast'
import ThumbnailForm from '@/app/(dashboard)/(routes)/(courses)/components/ThumbnailForm'
import ChapterTitleForm from '@/app/(dashboard)/(routes)/(courses)/components/chapter/ChapterTitleForm'
import ChapterDescriptionForm from '@/app/(dashboard)/(routes)/(courses)/components/chapter/ChapterDescriptionForm'
import ChapterVideoIdForm from '@/app/(dashboard)/(routes)/(courses)/components/chapter/ChapterVideoIdForm'
import ChapterVisibility from '@/app/(dashboard)/(routes)/(courses)/components/chapter/ChapterVisibilityForm'
import { ApiResponse } from '@/types/ApiResponse'
import ChapterThumbnailForm from '@/app/(dashboard)/(routes)/(courses)/components/chapter/ChapterThumbnailForm'
import FileForm from '@/app/(dashboard)/(routes)/(courses)/components/chapter/FileForm'
import FileCard from '@/app/(dashboard)/(routes)/(courses)/components/chapter/FileCard'
import QuizTitleForm from '@/app/(dashboard)/(routes)/(courses)/components/quiz/TitleForm'
import QuizDescriptionForm from '@/app/(dashboard)/(routes)/(courses)/components/quiz/DescriptionForm'
import QuizThumbnailForm from '@/app/(dashboard)/(routes)/(courses)/components/quiz/ThumbnailForm'
import QuizVisibility from '@/app/(dashboard)/(routes)/(courses)/components/quiz/VisibilityForm'
import QuizQuestionForm from '@/app/(dashboard)/(routes)/(courses)/components/quiz/QuizQuestionForm'
import { boolean } from 'zod'


function EditQuiz() {

    const { quiz_id } = useParams();
    const router = useRouter();
    const [addQuestion, setAddQuestion] = useState(false)


    const [quizData, setQuizData] = useState({
        title: '',
        description: '',
        thumbnail: '',
        isPublished: '',
        isFree: boolean,
        order: 0,
        questions: [
            {
                _id: '',
                question: '',
                options: [],
                answer: '',
                explanation: '',
            }
        ],
    });

    useEffect(() => {

        api.get(`/v1/quiz/get/${quiz_id}`)
            .then(res => {
                console.log(res)
                setQuizData(res.data.data)
            })
            .catch(err => console.log(err))

    }, [quiz_id]);



    const onPublish = async () => {
        // setIsSubmitting(true);

        try {
            const response = await api.patch(`/v1/quiz/published/${quiz_id}`, {});
            console.log(response);
            setQuizData({...quizData, isPublished : response?.data?.data?.isPublished});
            toast({
                title: 'Success!',
                description: response?.data?.message,
                variant: 'success',
            });

        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;

            let errorMessage = axiosError.response?.data.message;

            toast({
                title: 'Publishing Failed',
                description: errorMessage,
                variant: 'destructive',
            });

            // setIsSubmitting(false);
        }
    };

    const deleteQuiz = async () => {
        // setIsSubmitting(true);
        try {

            const response = await api.delete(`/v1/quiz/delete/${quiz_id}`);

            router.back();
            toast({
                title: 'Success!',
                description: response?.data?.message,
                variant: 'success',
            });


        }
        catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;
            console.log(axiosError)
            // Default error message
            let errorMessage = axiosError.response?.data.message;


            toast({
                title: 'Creation Failed',
                description: errorMessage,
                variant: 'destructive',
            });
        }
    }
    const deleteQuestion = async (question_id:string) => {
        // setIsSubmitting(true);
        try {

            const response = await api.delete(`/v1/quiz/delete-question/${question_id}`);

            toast({
                title: 'Success!',
                description: response?.data?.message,
                variant: 'success',
            });

            setQuizData({...quizData, questions: quizData.questions.filter((question: any) => question._id!== question_id) })


        }
        catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;
            console.log(axiosError)
            // Default error message
            let errorMessage = axiosError.response?.data.message;


            toast({
                title: 'Creation Failed',
                description: errorMessage,
                variant: 'destructive',
            });
        }
    }

   


    return (

        <div>
            {
                quizData?.title && (
                    <div className='w-full flex justify-center items-center'>

                        <div className='w-full my-auto grid md:grid-cols-2 gap-4 p-4  '>

                            <div className="flex flex-col  gap-2  ">
                                <div className="flex flex-row justify-between items-center">
                                    <span className='flex'><LayoutDashboard /><span className="text-md mx-2">Customise your quiz</span></span><div className="flex flex-row gap-4 m-2 justify-end ">

                                        <Button className='float-right' onClick={deleteQuiz}>Delete Quiz</Button>
                                    </div>
                                </div>
                                <QuizTitleForm title={quizData?.title} />
                                <QuizDescriptionForm description={quizData?.description} />
                                <QuizThumbnailForm thumbnail={quizData?.thumbnail} />
                                <QuizVisibility visibility={quizData?.isFree} />
                                {/* <CategoryForm language={chapterData?.language} /> */}

                                {
                                    <Button className='float-right' onClick={onPublish}>
                                        <BiMoneyWithdraw className='h-5 w-5 mr-2' />
                                        {quizData?.isPublished ? 'UnPublish' :
                                            'Publish'}
                                    </Button>

                                }


                            </div>
                            <div className="my-4">
                                <div className="flex flex-col  gap-2  ">
                                    <div className="flex flex-row justify-between">
                                        <span className="text-md mx-2 flex"><BookMarkedIcon />Questions:</span ><span className="text-md mx-2 flex cursor-pointer " onClick={() => setAddQuestion(!addQuestion)}><PlusCircle /> Add Questions:</span>
                                    </div>
                                    {addQuestion && <QuizQuestionForm setQuizData={setQuizData} setAddQuestion={setAddQuestion} />}

                                </div>
                                <div className=" m-1 border p-1 rounded">
                                    <span className="text-md mx-2 flex"> <FileAxis3DIcon />Course Attachments</span>
                                    <div className='m-2'>
                                        {
                                            !quizData?.questions?.length ? (

                                                <span>Notes are not available...</span>

                                            )
                                                :
                                                <div>
                                                    {
                                                        quizData?.questions?.map((item, index) => (
                                                            <div className='relative flex' key={index}>
                                                                <p>{index+1}:</p>
                                                                <div className='w-full  my-1 border rounded p-2'>
                                                                    <p className='text-xs'>{item?.question}</p>
                                                                    <div className='w-full  border rounded-b p-1 my-1'>
                                                                        {
                                                                            item?.options?.map((option, index) =>(
                                                                                <p key={index} className='text-xs text-gray-600'>{index + 1}. {option}</p>
                                                                            ))
                                                                        }
                                                                    </div>
                                                                    
                                                                    <p className='text-xs text-gray-600'>Answer: {item?.answer}</p>
                                                                    
                                                                    <p className='text-xs text-gray-600'>Explanation: {item?.explanation}</p>

                                                                </div>
                                                                <DeleteIcon className='h-5 w-5 absolute top-1 right-1 cursor-pointer' onClick={() => deleteQuestion(item._id)} />
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                        }
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default EditQuiz