import * as React from 'react';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { timeAgo } from '@/utils/agoTime';
import Image from 'next/image';
import { SiCashapp } from "react-icons/si";
import { Skeleton } from '@/components/ui/skeleton';

type PropsType = {
    _id: string,
    title: string,
    thumbnail: {
        url: string,
    }
    updated_at: string
    isFree: boolean
}


export default function QuizCard({ _id, thumbnail, title, updated_at, isFree }: any) {

    console.log(_id)

    return (

        <Link href={`/watch/quiz/${_id}`}>
            <div className="relative w-full h-24  p-2 z-0">
                {
                    _id !== '' ? <div className="p-0 flex flex-row w-full h-full bg-card text-card-foreground rounded"

                    >
                        <div className="h-full aspect-video rounded-lg " >
                            <Image
                                src={thumbnail?.url}
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


                                <div className='flex flex-row  gap-8'>
                                    <p className="text-xs text-muted-foreground line-clamp-1">
                                        {timeAgo(updated_at)}
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
                        <Skeleton className='w-full h-full' />
                }
            </div>
        </Link>

    );
}
