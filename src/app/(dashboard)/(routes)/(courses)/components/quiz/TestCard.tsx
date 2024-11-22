'use client'

import { Card, CardContent, Divider, Typography } from '@mui/joy';
import React from 'react'
import { ArrowRightCircle, Download } from 'lucide-react';
import { MdPictureAsPdf } from "react-icons/md";

function TestCard() {
    return (
        <div>
            <Card className="h-28 w-full bg-card text-card-foreground flex flex-row m-0 p-1">

                <div className="flex flex-row items-center">

                    <div className=''>
                        <Typography level="title-md" className="line-clamp-2  text-card-foreground p-0 m-0 rounded">
                            Video Title Video Totle Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat, obcaecati!
                        </Typography>

                        <div className='flex flex-row items-center  m-0 p-2 rounded gap-4 '>
                            <MdPictureAsPdf className='cursor-pointer rounded-full text-2xl ' />
                            <Typography level="title-md" className=" text-card-foreground p-0 mx-2 rounded">
                                30 Question
                            </Typography>
                            <Typography level="title-md" className="  text-card-foreground p-0 mx-2 rounded">
                                120 Marks
                            </Typography>
                        </div>
                    </div>
                    <div className="">
                    <ArrowRightCircle className='m-2 cursor-pointer' size={35} />
                    </div>

                </div>
            </Card>
        </div>
    )
}

export default TestCard