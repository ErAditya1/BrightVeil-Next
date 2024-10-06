'use client';


import { Button } from '@/components/ui/button';
import { useParams} from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { useState } from 'react';
import { Edit } from 'lucide-react';
import api from '@/api';
import { ApiResponse } from '@/types/ApiResponse';
import { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import { SingleImageDropzone } from '@/components/EdgeStore/SingleImageDropzone';
import Image from 'next/image';



export default function ChapterThumbnailForm({ thumbnail }: any) {




    const { toast } = useToast();
    const { chapter_id } = useParams()

    const [edit, setEdit] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [file, setFile] = useState<File>();
    
    const user = useSession()?.data?.user

    const uploadImage  =async () => {
        const formData =  new FormData();
        
        if (file) {

            
            
            formData.append('thumbnail', file);
            

            if (thumbnail) {
                formData.append('public_Id', thumbnail.publicId)
            }

            try {
                if(user && user.accessToken){
                const res = await api.patch(`/v1/videos/video/update-thumbnail/${chapter_id}`, formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            "Authorization": `Bearer ${user.accessToken}`
                        }
                    }
                )
                if(res) {

                    toast({
                        title: 'Thumbnail Updated',
                        description: res.data.message,
                        variant:'success',
                    });
                    setEdit(false);
                }
            }
                // you can run some server action or api here
                // to add the necessary data to your database
               
            } catch (error) {
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
                        {
                            thumbnail ? (
                                <div className=" gap-x-4">
                                    <Image className="object-cover h-40 aspect-video rounded-md" width={500} height={500} src={thumbnail?.secure_url} alt="thumbnail" />
                                </div>
                            )
                                :
                                <p className="text-sm aaa">No thumbnail uploaded yet.</p>

                        }
                        {
                            edit &&
                            <div className=''>
                                <div className="my-2 h-40 aspect-video ">
                                    <SingleImageDropzone
                                        value={file}
                                        onChange={(file) => {
                                            setFile(file);
                                        }}
                                    />
                                </div>
                                <div className="flex items-center gap-x-4">

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

                            </div>

                        }

                    </div>

                </div>

            </div>
        </div>
    );
}
