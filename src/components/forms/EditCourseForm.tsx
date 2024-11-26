'use client'
import { BadgeDollarSignIcon, BookMarkedIcon, FileAxis3DIcon, LayoutDashboard, PlusCircle } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { BiMoneyWithdraw } from 'react-icons/bi'
import { Button } from '@/components/ui/button'
import { useParams, useRouter } from 'next/navigation'
import axios, { AxiosError } from 'axios'
import api from '@/api'
import { toast } from '@/components/ui/use-toast'
import { ApiResponse } from '@/types/ApiResponse'

import TitleForm from '@/app/(dashboard)/(routes)/(courses)/components/TitleForm'
import DescriptionForm from '@/app/(dashboard)/(routes)/(courses)/components/DescriptionForm'
import ThumbnailForm from '@/app/(dashboard)/(routes)/(courses)/components/ThumbnailForm'
import CategoryForm from '@/app/(dashboard)/(routes)/(courses)/components/LanguageForm'
import { DatePickerWithRange } from '@/app/(dashboard)/(routes)/(courses)/components/DurationForm'
import PriceForm from '@/app/(dashboard)/(routes)/(courses)/components/PriceForm'
import ChapterForm from '@/app/(dashboard)/(routes)/(courses)/components/chapter/ChaptersForm'
import ChapterList from '@/app/(dashboard)/(routes)/(courses)/components/chapter/ChapterList'

function EditCourse() {

    const { course_id } = useParams();
    const router = useRouter();

    const [courseData, setCourseData] = useState({
        title: '',
        description: '',
        thumbnail: '',
        language: '',
        chapters: [],
        printPrice: 0,
        discount: 0,
        sellingPrice: 0,
        attachments: [],
        from: '',
        to: ''
    });
    const [addChapter, setAddChapter] = useState(false)
   
    useEffect(() => {
        
        api.get(`/v1/courses/course/get-edit-course-data/${course_id}`)
            .then(res => {
                setCourseData(res.data.data[0])
            })
            .catch(err => console.log(err))
        
    }, [course_id]);

    const publishCourse = async ()=>{
        try {
         
            const response = await api.patch(`/v1/courses/course/publish/${course_id}`, {});
            console.log(response);
            toast({
                title: 'Success!',
                description: response?.data?.message,
                variant:'success',
            });
        
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;
            console.log(axiosError)
            // Default error message
            let errorMessage = axiosError.response?.data.message;

            toast({
                title: 'Publishon Failed!',
                description: errorMessage,
                variant: 'destructive',
            });
        }
    }

    const onReorder = async (updateData: { _id: string, position: number }[]) => {

        try {
            const response = await api.put(`/v1/courses/course/reorder-chapters/${course_id}`, {
                updateData
            });
            console.log(response);
            toast({
                title: 'Success!',
                description: response?.data?.message,
                variant: 'success',
            });
            setCourseData((prevState) => ({ ...prevState, chapters: response?.data?.data }));
        
        } catch (error) {
            console.error(error);
            toast({
                title: 'Error!',
                description: "Something wrong while updating!",
                variant: 'destructive',
            });
        }
    }

    const onEdit = (_id:String) => {
        router.push(`/chapters/${_id}`)
    }

    console.log(courseData)

    return (

        <div>
            {
                courseData?.title && (
                    <div className='w-full'>
                        <div className="flex flex-row gap-4 m-2 justify-end ">
                            <Button className='float-right' onClick={publishCourse}>
                                <BiMoneyWithdraw className='h-5 w-5 mr-2' />
                                Publish Course
                            </Button>
                        </div>
                        <div className='grid md:grid-cols-2 gap-4 p-4 w-full '>

                            <div className="flex flex-col  gap-2  ">
                                <div className="flex flex-row ">
                                    <LayoutDashboard /><span className="text-md mx-2">Customise your course</span>
                                </div>
                                <TitleForm title={courseData?.title} />
                                <DescriptionForm description={courseData?.description} />
                                <ThumbnailForm thumbnail = {courseData?.thumbnail} setCourseData/>
                                <CategoryForm language={courseData?.language} />
                                <DatePickerWithRange from={courseData?.from} to={courseData?.to} />
                                <div className="flex flex-row ">
                                    <BadgeDollarSignIcon /><span className="text-md mx-2">Course Price</span>
                                </div>
                                <PriceForm printPrice={courseData?.printPrice} discount={courseData?.discount} />

                            </div>
                            <div className="flex flex-col  gap-2">
                                <div className="flex flex-row justify-between">
                                    <span className="text-md mx-2 flex"><BookMarkedIcon /> Course Chapters</span ><span className="text-md mx-2 flex cursor-pointer " onClick={() => setAddChapter(!addChapter)}><PlusCircle /> Add Chapters</span>
                                </div>
                                {

                                    addChapter && <ChapterForm setCourseData= {setCourseData}/>
                                }
                                <div className=" m-2 border p-2 rounded">
                                    <span className="text-md mx-2 flex"> <FileAxis3DIcon />Course Attachments</span>
                                    <div className='m-2'>
                                        {
                                            !courseData?.chapters?.length ? (

                                                <span>Videos are not available...</span>

                                            )
                                                :
                                                <div>
                                                    <ChapterList
                                                        onEdit={onEdit}
                                                        onRender={onReorder}

                                                        items={courseData?.chapters || []}

                                                    />
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