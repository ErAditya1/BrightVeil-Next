'use client'

import { Card, CardContent, Divider, Typography } from '@mui/joy';
import React from 'react'
import { Download } from 'lucide-react';
import { MdPictureAsPdf } from "react-icons/md";

function FileCard() {
    return (
        <div>
            <Card className="h-28 w-60 bg-card text-card-foreground flex flex-row m-0 p-1 my-2">

                <CardContent className="flex flex-col ">

                    <Typography level="title-sm" id="card-description" className="line-clamp-3  text-card-foreground p-0 m-0 rounded">
                        Video Title Video Totle Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat, obcaecati!
                    </Typography>
                    <Divider />
                    <div className='flex flex-row items-center justify-around m-0 p-2 rounded bg-muted'>
                        <MdPictureAsPdf className='cursor-pointer rounded-full text-2xl' />
                        <Download className='cursor-pointer rounded-full text-2xl' />
                    </div>

                </CardContent>
            </Card>
        </div>
    )
}

export default FileCard