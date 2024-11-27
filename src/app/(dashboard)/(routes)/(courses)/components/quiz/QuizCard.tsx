import React, { Suspense } from 'react';
import Link from 'next/link';
import { timeAgo } from '@/utils/agoTime';
import ValidatedImage from '@/components/ValidatedImage';
import { SiCashapp } from "react-icons/si";
import { Skeleton } from '@/components/ui/skeleton';

type PropsType = {
    _id: string,
    thumbnail: string,
    title: string,
    channelName: string,

    uploadedDate: string,
    views: number,
    isFree: boolean,
}


export default function QuizCard({  thumbnail, title, _id, views, uploadedDate, channelName, isFree }: PropsType) {







    return (
        <Suspense fallback={<div>Loading...</div>}>

            <Link href={`/watch/quiz/${_id}`}>
                <div className="relative w-full h-24  p-2 z-0">
                    {
                        _id !== '' ? <div className="p-0 flex flex-row w-full h-full bg-card text-card-foreground rounded"

                        >
                            <div className="h-full aspect-video rounded-lg " >
                                <ValidatedImage
                                    src={thumbnail}
                                    loading="lazy"
                                    width={500}
                                    height={500}
                                    alt=""
                                    className='w-full h-full rounded'
                                />
                            </div>
                            <div className="flex flex-col justify-between p-1">
                                <p className="line-clamp-2 text-sm">
                                    {title}
                                </p>
                                <div className='p-0 m-0'>
                                    <p className="text-xs text-muted-foreground line-clamp-1">
                                        {channelName}
                                    </p>

                                    <div className='flex flex-row  gap-8'>
                                        <p className="text-xs text-muted-foreground line-clamp-1">
                                            {timeAgo(uploadedDate)}
                                        </p>
                                        <p className="text-xs text-muted-foreground line-clamp-1">
                                            {views} views
                                        </p>
                                        <p>
                                            {
                                                isFree ? <div className=" flex flex-row items-center bg-green-500 text-foreground h-4 w-4 p-1 rounded-full  text-xs" >
                                                    <SiCashapp />
                                                </div> : <div className=" flex flex-row items-center bg-red-500 text-foreground h-4 w-4 p-1 rounded-full text-xs" >
                                                    <SiCashapp />
                                                </div>

                                            }
                                        </p>
                                    </div>


                                </div>




                            </div>
                        </div>
                            :
                            <Skeleton className="w-full h-full" />
                    }
                </div>
            </Link>
        </Suspense>

    );
}
