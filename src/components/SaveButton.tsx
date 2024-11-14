import api from '@/api';
import React, { useEffect, useState } from 'react'
import { Chip } from '@mui/joy';
import { FaRegSave, FaSave } from "react-icons/fa";
import { toast } from './ui/use-toast';


function SaveButton({className , saved , type,_id}:any) {
    const [isSaved, setIsSaved] = useState(false);
    
    useEffect(()=>{
        setIsSaved(saved);
    }, [saved])
    const savePostHandler = async() => {
       await api.post(`/v1/save/${type}/${_id}`,{}).then((response) => {
        setIsSaved(!isSaved);
        toast({
            title: 'Success',
            description: response.data.message,
            variant: "success"
        })
        // console.log(response)
       }).catch((error) => {console.log(error);});
       
      };
  return (
    <button
    onClick={savePostHandler}
    className={`  flex   justify-center items-center rounded-full  ${className}`}
  >
    <p>{isSaved? <FaSave className="mx-2 p-0" /> : <FaRegSave className={` mx-2  p-0`} />}</p>
   
</button>
  )
}

export default SaveButton