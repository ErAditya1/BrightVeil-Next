'use client'
import { BadgeDollarSignIcon, BookMarkedIcon, FileAxis3DIcon, LayoutDashboard, PlusCircle } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { BiMoneyWithdraw } from 'react-icons/bi'
import { Button } from '@/components/ui/button'
import { useParams, useRouter } from 'next/navigation'
import axios, { AxiosError } from 'axios'
import api from '@/api'
import { toast } from '@/components/ui/use-toast'
import ThumbnailForm from '@/app/(dashboard)/(routes)/(courses)/components/ThumbnailForm'
import ChapterTitleForm from '@/app/(dashboard)/(routes)/(courses)/components/ChapterTitleForm'
import ChapterDescriptionForm from '@/app/(dashboard)/(routes)/(courses)/components/ChapterDescriptionForm'
import ChapterVideoIdForm from '@/app/(dashboard)/(routes)/(courses)/components/ChapterVideoIdForm'
import ChapterVisibility from '@/app/(dashboard)/(routes)/(courses)/components/ChapterVisibilityForm'
import { ApiResponse } from '@/types/ApiResponse'
import ChapterThumbnailForm from '@/app/(dashboard)/(routes)/(courses)/components/ChapterThumbnailForm'
import { useSession } from 'next-auth/react'

function EditCourse() {

    const { chapter_id } = useParams();
    const router = useRouter();


    const [chapterData, setChapterData] = useState({
        title: '',
        description: '',
        thumbnail: '',
        videoId: '',
        isPublished: '',
        visibility: '',
        files: [],
        tests: [],
        order: 0,
    });
    const [addChapter, setAddChapter] = useState(false)
    const  user  = useSession()?.data?.user
    useEffect(() => {
        if(user && user.accessToken){
        api.get(`/v1/videos/video/get-chapter/${chapter_id}`, {
            headers: {
                'Authorization': `Bearer ${user?.accessToken}`
            }
        })
            .then(res => {
                console.log(res)
                setChapterData(res.data.data)
            })
            .catch(err => console.log(err))
        }
    }, [chapter_id, user]);

    

    const onPublish = async () => {
        // setIsSubmitting(true);

        try {
            if(user && user.accessToken){
            const response = await api.patch(`/v1/videos/video/update-videoPublish/${chapter_id}`, {},
                {
                    headers: {
                        'Authorization': `Bearer ${user?.accessToken}`
                    }
                }
            );
            console.log(response);
            setChapterData(response?.data?.data);
            toast({
                title: 'Success!',
                description: response?.data?.message,
                variant: 'success',
            });

        }
            // setIsSubmitting(false);

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
    const onUnPublish = async () => {
        // setIsSubmitting(true);

        try {
            if(user && user.accessToken){
            const response = await api.patch(`/v1/videos/video/update-videoUnPublish/${chapter_id}`, {},
                {
                    headers: {
                        'Authorization': `Bearer ${user?.accessToken}`
                    }
                }
            );
            console.log(response);
            setChapterData(response?.data?.data);
            toast({
                title: 'Success!',
                description: response?.data?.message,
                variant: 'success',
            });

            // setIsSubmitting(false);
        }

        } catch (error) {




            toast({
                title: 'Creation Failed',
                description: "Something wrong while publishing",
                variant: 'destructive',
            });

            // setIsSubmitting(false);
        }
    };
    const deleteChapter = async () => {
        // setIsSubmitting(true);
        try {
            if(user && user.accessToken){
            const response = await api.delete(`/v1/videos/video/delete-chapter/${chapter_id}`,
                {
                    headers: {
                        'Authorization': `Bearer ${user?.accessToken}`
                    }
                }
            );
            console.log(response);
            router.back();
            toast({
                title: 'Success!',
                description: response?.data?.message,
                variant: 'success',
            });
        }
        
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
                chapterData.title && (
                    <div className='w-full flex justify-center items-center'>

                        <div className='w-full my-auto md:w-1/2 gap-4 p-4  '>

                            <div className="flex flex-col   gap-2  ">
                                <div className="flex flex-row justify-between items-center">
                                    <span className='flex'><LayoutDashboard /><span className="text-md mx-2">Customise your course</span></span><div className="flex flex-row gap-4 m-2 justify-end ">
                                        {
                                            !chapterData?.isPublished ? <Button className='float-right' onClick={onPublish}>
                                                <BiMoneyWithdraw className='h-5 w-5 mr-2' />
                                                Publish Chapter
                                            </Button>
                                                : <Button className='float-right' onClick={onUnPublish}>
                                                    <BookMarkedIcon className='h-5 w-5 mr-2' />
                                                    Unpublish Chapter
                                                </Button>
                                        }
                                    </div>
                                </div>
                                <ChapterVideoIdForm videoId={chapterData?.videoId} />
                                <ChapterTitleForm title={chapterData?.title} />
                                <ChapterDescriptionForm description={chapterData?.description} />
                                <ChapterThumbnailForm thumbnail={chapterData?.thumbnail}/>
                                <ChapterVisibility />
                                {/* <CategoryForm language={chapterData?.language} /> */}

                                <Button className='float-right' onClick={deleteChapter}>Delete Chapter</Button>


                            </div>

                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default EditCourse