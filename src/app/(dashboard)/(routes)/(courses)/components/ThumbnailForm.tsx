'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useEffect, useState } from 'react';
import { Edit } from 'lucide-react';
import api from '@/api';
import { ApiResponse } from '@/types/ApiResponse';
import { AxiosError } from 'axios';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import { FaCamera } from 'react-icons/fa6';
import { MdOutlineCancel } from 'react-icons/md';



export default function ThumbnailForm({ thumbnail }: any) {




    const { toast } = useToast();
    const { course_id } = useParams()

    const [edit, setEdit] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [file, setFile] = useState<File | null>();
    const [fileUrl, setFileUrl] = useState('')
    useEffect(() => {
        console.log(thumbnail)
        setFileUrl(thumbnail?.secure_url)
    }, [thumbnail]);

    const uploadImage = async () => {
        const formData = new FormData();
        if (file) {
            setIsSubmitting(false)

            formData.append('thumbnail', file);


            try {

                const res = await api.patch(`/v1/courses/course/updateThumbnail/${course_id}`, formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        }
                    }
                )
                if (res) {
                    toast({
                        title: 'Thumbnail Updated',
                        description: 'Your thumbnail has been updated successfully.',
                        variant: 'success',
                    });
                    setEdit(false)
                    setFile(null)
                    setFileUrl(res.data?.data?.thumbnail?.secure_url)

                    // you can run some server action or api here
                    // to add the necessary data to your database
                    console.log(res);
                }
                setIsSubmitting(false)
            } catch (error) {
                setIsSubmitting(false)
                const axiosError = error as AxiosError<ApiResponse>;
                console.log(axiosError)
                // Default error message
                let errorMessage = axiosError.response?.data.message;


                toast({
                    title: 'Thumbnail Upload Failed',
                    description: errorMessage,
                    variant: 'destructive',
                });
            }

        }
    }




    return (
        <div className="flex justify-center items-center ">
            <div className="w-full bg-card text-card-foreground  border rounded shadow-md p-2">

                <div className="w-full ">
                    <div className="flex justify-between items-center gap-x-4">
                        <p className="text-md font-semibold">Thumbnail:</p>
                        {!edit && (<span className='text-sm gap-1 flex flex-row' onClick={() => setEdit(true)}><Edit size={15} />Edit</span>)}

                    </div>
                    <div className='gap-4 flex flex-row flex-wrap'>


                        <div className=''>
                            <div className="my-2 h-40 aspect-video ">

                                {
                                    fileUrl ? (
                                        <div className="w-full h-full relative">
                                            <Image
                                                src={fileUrl}
                                                alt="Profile"
                                                height={500}
                                                width={500}
                                                className="rounded border border-foreground w-full h-full"
                                            />
                                            {
                                                edit &&
                                                <>
                                                    {
                                                        fileUrl &&
                                                        <div className="  bg-background text-foreground rounded-full cursor-pointer absolute top-2 right-2" onClick={() => {
                                                            setFile(null)
                                                            URL.revokeObjectURL(fileUrl)
                                                            setFileUrl(thumbnail?.secure_url || '')
                                                        }}>
                                                            <MdOutlineCancel size={18} className="text-foreground" />
                                                        </div>
                                                    }
                                                    <label htmlFor="file">

                                                        <FaCamera size={20} className="text-foreground absolute bottom-0 right-0 cursor-pointer" />
                                                    </label>
                                                    <input type="file" accept="image/png, image/gif, image/jpeg ,image/jpg" id='file' className='hidden' onChange={(e: any) => {
                                                        setFile(e.target.files[0])
                                                        console.log(e.target.files[0])  // Preview the image in the input field for the user.)
                                                        setFileUrl(URL.createObjectURL(e.target.files[0]))
                                                    }} />
                                                </>
                                            }

                                        </div>
                                    ) : (
                                        <>
                                            {
                                                edit ?
                                                    <div className="border h-full w-full rounde flex justify-center items-center">
                                                        < label htmlFor="file">
                                                            <FaCamera size={32} className="text-foreground cursor-pointer" />
                                                        </label>
                                                        <input type="file" accept="image/png, image/gif, image/jpeg ,image/jpg" id='file' className='hidden' onChange={(e: any) => {
                                                            setFile(e.target.files[0])
                                                            const url = URL.createObjectURL(e.target.files[0])
                                                            console.log(url)  // Preview the image in the input field for the user.)
                                                            setFileUrl(url)
                                                        }} />
                                                    </div>
                                                    : <p>No thumbnail uploded yet...</p>
                                            }
                                        </>

                                    )
                                }
                            </div>
                            {
                                edit && <div className="flex items-center gap-x-4">

                                    <Button
                                        type='button'
                                        onClick={() => {
                                            setEdit(false)
                                        }}
                                    >
                                        Cancel
                                    </Button>


                                    <Button
                                        type='button'
                                        disabled={!file || isSubmitting}
                                        onClick={uploadImage}

                                    >
                                        Upload
                                    </Button>
                                </div>
                            }

                        </div>

                    </div>

                </div>

            </div >
        </div >
    );
}
