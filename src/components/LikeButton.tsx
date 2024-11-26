import api from '@/api';
import React, { useEffect, useState } from 'react'
import { toast } from './ui/use-toast';
import { Chip } from '@mui/joy';
import { AiOutlineLike } from "react-icons/ai";
import { BiSolidLike } from "react-icons/bi";


function LikeButton({ className, liked, likeCnt = -1, type, _id }: any) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    setIsLiked(liked);
    setLikeCount(likeCnt);
  }, [liked, likeCnt])
  const likePostHandler = async () => {
    await api.post(`/v1/like/${type}/${_id}`, {}).then((response) => {
      setIsLiked(!isLiked);
      if (response.data) {

        if (likeCnt !== -1) {
          if (!isLiked) {
            setLikeCount(likeCount + 1);

          } else {
            setLikeCount(likeCount - 1);
          }

        }
      }
      // console.log(response)
    }).catch((error) => { console.log(error); });

  };
  return (
    <button
      onClick={likePostHandler}
      className={`  flex justify-center items-center rounded-full  ${className}`}
    >
      <p>{isLiked ? <BiSolidLike className="m-0 p-0 " /> : <AiOutlineLike className={` m-0  p-0`} />}</p>
      {likeCount !==-1 && <Chip>{likeCount}</Chip>}
    </button>
  )
}

export default LikeButton