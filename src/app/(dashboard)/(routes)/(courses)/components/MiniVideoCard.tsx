import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import CardContent from '@mui/joy/CardContent';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';
import { Card, Dropdown, IconButton, Menu, MenuButton, MenuItem } from '@mui/joy';
import MoreVertRounded from '@mui/icons-material/MoreVertRounded';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { timeAgo } from '@/utils/agoTime';
import Image from 'next/image';

type PropsType = {
    _id: string,
    videoId: string,
    thumbnail: string,
    title: string,
    channelName: string,
    
    uploadedDate: string,
    views: number,
    // description: string,
    // tags: string[]
}


export default function MiniVideoCard({  videoId, thumbnail, title, _id, views, uploadedDate, channelName }: PropsType) {

    const searchParams = useSearchParams();
    const {c_id} = useParams()
    let course_id;
     const c = searchParams.get('course');
     if(c) {
       course_id = c;
     } else {
       course_id = c_id;
     }
     


    return (

      <Link href={`/watch/video?course=${course_id}&video=${_id}&v=${videoId}`}>
          <div className="relative w-full h-24  p-2">
            <div className="p-0 flex flex-row w-full h-full bg-card text-card-foreground rounded"
            
        >
            <div className="h-full aspect-video rounded-lg " >
                <Image
                    src={thumbnail}
                    loading="lazy"
                    width={500}
                    height={500}
                    alt=""
                    className='w-full h-full rounded'
                />
            </div>
            <div className="flex flex-col justify-between p-1">
                <p  className="line-clamp-2 text-sm">
                    {title}
                </p>
                <div className='p-0 m-0'>
                    <p  className="text-xs text-muted-foreground line-clamp-1">
                        {channelName}
                    </p>

                    <div className='flex flex-row  gap-8'>
                        <p  className="text-xs text-muted-foreground">
                            {timeAgo(uploadedDate)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            {views} views
                        </p>
                    </div>


                </div>




            </div>
        </div>
        </div>
      </Link>

    );
}
