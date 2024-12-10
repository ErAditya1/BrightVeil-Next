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
import ValidatedImage from '@/components/ValidatedImage';
import { FaLink } from 'react-icons/fa6';

type ChatBubbleProps = ChatMessage & {
  variant: 'sent' | 'received';
  whoPrevious: boolean
};

export default function ChatBubble(props: ChatBubbleProps) {

  const convertTextToLinks = (text: string) => {
    // Regular expression to match any URL (basic version)
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const youtubeRegex = /(https?:\/\/(www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+))/g;
  
    // let convertedText = text?.replace(youtubeRegex, (url, _, __, videoId) => {
    //   // YouTube embed URL format
    //   console.log(videoId)
    //   return `<iframe src="https://www.youtube.com/embed/${videoId}" width="560" height="315" frameborder="0" allowfullscreen></iframe>`;
    // });
  
    let convertedText = text?.replace(urlRegex, (url) => {
      return `<a href="${url}" target="_blank" rel="noopener noreferrer" style="color:blue" className="text-blue-700 underline-offset-4">${url}</a>`;
    });
  

    return convertedText;
  };

  const chats = useAppSelector((state) => state.chat.chats)
  const { _id, content, status, chat, variant, createdAt, attachments, urlpreviews, sender, whoPrevious } = props;
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
        if (lastMessage?._id === message._id) {
          api.get(`/v1/chat-app/chats`).then((res) => {
            const chats = res.data.data
            dispatch(addChats(chats))
          })
        }


      })
      .catch((error) => { console.log(error); });

  };


  return (
    <Box
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative chat-bubble  max-w-[80%]  md:max-w-96 lg:max-w-[34rem] break-words break-all whitespace-pre-wrap  p-1 m-0 rounded-lg  ${isSent ? `bg-[#075e54] text-card-foreground text-white ${!whoPrevious && 'rounded-tr-none ml-12'}` : `bg-card text-card-foreground  ml-4  ${!whoPrevious && 'rounded-tl-none mt-4 '}`}`}
    >
      {!whoPrevious && <p className={`text-xs sm:text-sm`}>@{sender.username}</p>}

      {attachments?.length > 0 &&
        attachments?.map((attachment, index) => (
          <Sheet
            variant="outlined"
            key={index}
          >
            {attachment.type === 'image' &&
              <ValidatedImage
                alt="Attachment"
                src={attachment.url}
                loading="lazy"
                width={500}
                height={500}
                className='object-cover rounded w-full h-auto'

              />
            }
            {attachment.type === 'video' &&

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
      {
        urlpreviews?.length > 0 && urlpreviews[0] &&
        urlpreviews?.map((preview: any, index: number) => (
          <div className='w-full' key={index}>
            <a
              href={preview?.url}
              target="_blank"
              rel="noopener noreferrer"
              className=""
            >
              <div className='grid grid-cols-8'>
                <div className='col-span-2  p-2 max-w-24'>
                  {preview?.image ? <img src={preview?.image} alt={preview?.title} className='w-full aspect-square rounded-md' />
                    :
                    <div className='h-full flex justify-center items-center aspect-square rounded-md text-center text-gray-100 animate-pulse bg-slate-400'>
                      <FaLink size={20} />
                    </div>
                  }
                </div>
                <div className='col-span-6 p-2'>
                  <span className='text-sm line-clamp-1'>
                    {preview?.title}
                  </span>
                  <span className={`text-xs   line-clamp-3 ${!isSent ? "text-gray-600 dark:text-gray-200":"text-gray-200"}`}>
                    {preview?.description}
                  </span>
                  <span className="text-xs text-gray-400 line-clamp-1">
                    {preview?.domain}
                  </span>
                </div>

              </div>
            </a>
          </div>
        ))
      }
      <div
      >
        <div className={`mx-1 relative`}>

          <p className={`${isSent && ' text-white'} text-xs sm:text-sm`}>

            <span className='m-0 p-0 h-fit'
              dangerouslySetInnerHTML={{ __html: convertTextToLinks(content) }}
            />
          </p>

          <div className='float-right flex justify-center items-center my-1 '>
            <span className=''>
              <span className='text-xs'>{timeAgo(createdAt)}</span>
            </span>
            {
              isSent &&
              <span className=' text-sm my-auto text-foreground '>
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
              <MdDelete size={24} />
            </IconButton>}
          </Stack>
        )}
      </div>

    </Box>
  );
}


