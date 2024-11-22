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


function EditCourse() {

    const { chapter_id } = useParams();
    const router = useRouter();
    const [addFile, setAddFile] = useState(false)


    const [chapterData, setChapterData] = useState({
        title: '',
        description: '',
        thumbnail: '',
        videoId: '',
        isPublished: '',
        visibility: '',
        files: [{
            _id:'',
            title: '',
            file:{}

        }],
        tests: [],
        order: 0,
    });

    useEffect(() => {

        api.get(`/v1/videos/video/get-video/${chapter_id}`)
            .then(res => {
                console.log(res)
                setChapterData(res.data.data)
            })
            .catch(err => console.log(err))

    }, [chapter_id]);

    const deleteFile = async (file_id:string) => {
        try {
           const res = await api.delete(`/v1/videos/video/file/${file_id}`)
            console.log(res)
            setChapterData(prevState => ({...prevState, files: prevState.files.filter(file => file._id!== file_id) }));
            
            
        } catch (error) {
            console.log(error)
        }
    }

    const onPublish = async () => {
        // setIsSubmitting(true);

        try {

            const response = await api.patch(`/v1/videos/video/update-videoPublish/${chapter_id}`, {},

            );
            console.log(response);
            setChapterData(response?.data?.data);
            toast({
                title: 'Success!',
                description: response?.data?.message,
                variant: 'success',
            });


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

            const response = await api.patch(`/v1/videos/video/update-videoUnPublish/${chapter_id}`, {},

            );
            console.log(response);
            setChapterData(response?.data?.data);
            toast({
                title: 'Success!',
                description: response?.data?.message,
                variant: 'success',
            });

            // setIsSubmitting(false);


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

            const response = await api.delete(`/v1/videos/video/delete-chapter/${chapter_id}`,

            );
            console.log(response);
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



    return (

        <div>
            {
                chapterData?.title && (
                    <div className='w-full flex justify-center items-center'>

                        <div className='w-full my-auto grid md:grid-cols-2 gap-4 p-4  '>

                            <div className="flex flex-col  gap-2  ">
                                <div className="flex flex-row justify-between items-center">
                                    <span className='flex'><LayoutDashboard /><span className="text-md mx-2">Customise your course</span></span><div className="flex flex-row gap-4 m-2 justify-end ">

                                        <Button className='float-right' onClick={deleteChapter}>Delete Chapter</Button>
                                    </div>
                                </div>
                                <ChapterVideoIdForm videoId={chapterData?.videoId} />
                                <ChapterTitleForm title={chapterData?.title} />
                                <ChapterDescriptionForm description={chapterData?.description} />
                                <ChapterThumbnailForm thumbnail={chapterData?.thumbnail} />
                                <ChapterVisibility />
                                {/* <CategoryForm language={chapterData?.language} /> */}

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
                            <div className="my-4">
                                <div className="flex flex-col  gap-2  ">
                                    <div className="flex flex-row justify-between">
                                        <span className="text-md mx-2 flex"><BookMarkedIcon />Chapter's Notes:</span ><span className="text-md mx-2 flex cursor-pointer " onClick={() => setAddFile(!addFile)}><PlusCircle /> Add Notes:</span>
                                    </div>
                                    {addFile && <FileForm setChapterData={setChapterData} setAddFile={setAddFile}/>}

                                </div>
                                <div className=" m-2 border p-2 rounded">
                                    <span className="text-md mx-2 flex"> <FileAxis3DIcon />Course Attachments</span>
                                    <div className='m-2'>
                                        {
                                            !chapterData?.files?.length ? (

                                                <span>Notes are not available...</span>

                                            )
                                                :
                                                <div>
                                                    {
                                                        chapterData?.files?.map((item) => (
                                                            <div className='relative' >
                                                                <FileCard
                                                                    key={item._id}
                                                                    item= {item}
                                                                />
                                                                <DeleteIcon className='h-5 w-5 absolute top-1 right-1 cursor-pointer' onClick={() => deleteFile(item._id)} />
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

export default EditCourse