'use client'

import React, { useEffect, useState } from 'react'

import { Grid, Pencil } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface ChapterListProps {
    items: Array<{ _id: string; title: string; isPublished: boolean; printPrice: number; }>

    onEdit: (id: string) => void


}

function CourseList({ items, onEdit }: ChapterListProps) {
    const [isMounted, setIsMounted] = useState(false)

    console.log(items)
    const [courses, setCourses] = useState(items)
    useEffect(() => {
        setCourses(items)
    }, [items])
    useEffect(() => {
        setIsMounted(true)
    }, [])




    if (!isMounted) {
        return null
    }

    return (
        <div>
            <div>

                <div >
                    {courses?.map((course, index) => (
                        <div
                            key={course._id}
                        >
                            <div

                                className='flex items-center  rounded bg-card text-card-foreground border m-2'
                            >
                                <div
                                    className={`px-2 py-2 border-r mr-2 ${course.isPublished ? '' : ''}`}

                                >
                                    <Grid className='h-5 w-5' />
                                </div>
                                <span className=''> {course?.title}</span>
                                <div className='ml-auto pr-2 flex items-center gap-x-2'>
                                    {
                                        (course?.printPrice==0) && (
                                            <Badge>Free</Badge>
                                        )
                                    }
                                    <Badge className={`bg-slate-500 ${course?.isPublished && 'bg-sky-700'}`}>
                                        {course?.isPublished ? 'Published' : 'Draft'}
                                    </Badge>

                                    <Pencil
                                        onClick={() => onEdit(course?._id)}
                                        className='h-4 w-4 text-slate-500 hover:text-slate-400 cursor-pointer'
                                    />


                                </div>
                            </div>

                        </div>
                    ))}
                </div>


            </div>

        </div>
    )
}

export default CourseList