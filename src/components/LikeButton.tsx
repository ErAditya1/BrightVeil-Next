import api from '@/api';
import React, { useEffect, useState } from 'react'
import { toast } from './ui/use-toast';
import { Chip } from '@mui/joy';
import { AiOutlineLike } from "react-icons/ai";
import { BiSolidLike } from "react-icons/bi";
import { useSession } from 'next-auth/react';

function LikeButton({className , liked, likeCnt , type,_id}:any) {
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const token = useSession()?.data?.user?.refreshToken
    useEffect(()=>{
        setIsLiked(liked);
        setLikeCount(likeCnt);
    }, [liked, likeCnt])
    const likePostHandler = async() => {
       await api.post(`/v1/like/${type}/${_id}`,{},{
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
         }
       }).then((response) => {
        setIsLiked(!isLiked);
        if (response.data.message === 'Liked') {
          
          setLikeCount(likeCount+1);
          } else {

            setLikeCount(likeCount-1);
        }
        // console.log(response)
       }).catch((error) => {console.log(error);});
       
      };
  return (
    <button
    onClick={likePostHandler}
    className={`  flex   justify-center items-center rounded-full  ${className}`}
  >
    <p>{isLiked? <BiSolidLike className="mx-2 p-0" /> : <AiOutlineLike className={` mx-2  p-0`} />}</p>
    <Chip>{likeCount}</Chip>
</button>
  )
}

export default LikeButton