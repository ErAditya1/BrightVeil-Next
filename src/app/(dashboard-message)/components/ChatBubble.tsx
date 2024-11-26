'use client'

import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Stack from '@mui/joy/Stack';
import Sheet from '@mui/joy/Sheet';
import CelebrationOutlinedIcon from '@mui/icons-material/CelebrationOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { timeAgo } from '@/utils/agoTime';
import MessageStatus from './MessageStatus';
import { useSocket } from '@/context/SocketContext';
import { addChats, ChatMessage, removeDeletedMessage } from '@/store/chat/chatSlice';
import { MdDelete } from 'react-icons/md';
import api from '@/api';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import Image from 'next/image';

type ChatBubbleProps = ChatMessage & {
  variant: 'sent' | 'received';
  whoPrevious: boolean 
};

export default function ChatBubble(props: ChatBubbleProps) {
  
  const chats = useAppSelector((state)=> state.chat.chats)
  const { _id, content, status, chat, variant, createdAt, attachments, sender,whoPrevious } = props;
  const { socket } = useSocket()
  const isSent = variant === 'sent';

  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isCelebrated, setIsCelebrated] = useState<boolean>(false);
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (variant === 'received' && status != 'read') {
      socket?.emit('markAsRead', _id)
    }
  }, [props])

  const handleLike = () => {
    setIsLiked(!isLiked);
    socket?.emit('likeMessage', _id);
  };
  const handleCelebrate = () => {
    setIsCelebrated(!isCelebrated);
    socket?.emit('celebrateMessage', _id);
  };
  const handleDelete = () => {
    setIsHovered(false);
    api.delete(`/v1/chat-app/messages/${chat}/${_id}`)
    .then((response) => {
      console.log(response)
      console.log("nessage deleted")
      const message = response.data.data
      dispatch(removeDeletedMessage(message))
      const lastMessage = chats.find((c) => c._id === chat)?.lastMessage
      if(lastMessage?._id === message._id){
        api.get(`/v1/chat-app/chats`).then((res)=>{
          const chats = res.data.data
          dispatch(addChats(chats))
        })
      }
      

    })
    .catch((error) => {console.log(error);});
  
  };


  return (
    <Box 
    
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    className={`relative max-w-[200px]  sm:max-w-84 md:max-w-96  break-words whitespace-pre-wrap  p-1 m-0 rounded-lg  ${isSent ? `bg-[#075e54] text-card-foreground ${!whoPrevious && 'rounded-tr-none ml-12'}` : `bg-card text-card-foreground  ml-4  ${!whoPrevious && 'rounded-tl-none '}` } ${!whoPrevious && "mt-4 "}`}
    >
      {!whoPrevious  && <p className={`${isSent && ' text-white'} text-xs sm:text-sm`}>@{sender.username}</p>}

      {attachments?.length > 0 &&
        attachments?.map((attachment,index) =>(
          <Sheet
          variant="outlined"
          key={index}
        >
          { attachment.type === 'image'&&
            <Image
              alt="Attachment"
              src={attachment.url}
              loading="lazy"
              width={500}
              height={500}
              className='object-cover rounded w-full h-auto'

            />
          }
          { attachment.type==='video' && 

            <video
              controls
              width="100%"
              height="auto"
              src={attachment.url}
              className='object-cover rounded'
              />
          }
        </Sheet>
        ))
      }
      <div
      >
        <div className={`m-1 relative`}>

          <p className={`${isSent && ' text-white'} text-xs sm:text-sm`}>
            {content}

          </p>

          <div className='float-right flex justify-center items-center my-1 '>
            <span className=''>
              <span className='text-xs'>{timeAgo(createdAt)}</span>
            </span>
            {
              isSent &&
              <span className=' text-sm my-auto'>
                <MessageStatus messageStatus={status} />
              </span>
            }
          </div>

        </div>

        {(isHovered || isLiked || isCelebrated) && (
          <Stack
            direction="row"
            justifyContent={isSent ? 'flex-end' : 'flex-start'}
            spacing={0.5}
            sx={{
              position: 'absolute',
              top: '50%',
              p: 1.5,
              ...(isSent
                ? {
                  left: 0,
                  transform: 'translate(-100%, -50%)',
                }
                : {
                  right: 0,
                  transform: 'translate(100%, -50%)',
                }),
            }}
          >
            <IconButton
              variant={isLiked ? 'soft' : 'plain'}
              color={isLiked ? 'danger' : 'neutral'}
              size="sm"
              onClick={handleLike}
            >
              {isLiked ? '❤️' : <FavoriteBorderIcon />}
            </IconButton>
            <IconButton
              variant={isCelebrated ? 'soft' : 'plain'}
              color={isCelebrated ? 'warning' : 'neutral'}
              size="sm"
              onClick={handleCelebrate}
            >
              {isCelebrated ? '🎉' : <CelebrationOutlinedIcon />}
            </IconButton>
            {isSent && <IconButton
              size="sm"
              onClick={handleDelete}
            >
               <MdDelete size={24}/>
            </IconButton>}
          </Stack>
        )}
      </div>

    </Box>
  );
}

            
           