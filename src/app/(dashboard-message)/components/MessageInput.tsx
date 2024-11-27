'use client'

import React, { useState } from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import Textarea from '@mui/joy/Textarea';
import { Stack } from '@mui/joy';

import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addChatLastMessage, addMessages, startTyping, stopTyping } from '@/store/chat/chatSlice';
import { useSocket } from '@/context/SocketContext';
import api from '@/api';
import { MdOutlineLinkedCamera } from 'react-icons/md';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { toast } from '@/components/ui/use-toast';
import ValidatedImage from '@/components/ValidatedImage';
import EmojiPicker from 'emoji-picker-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { BsEmojiHeartEyesFill } from "react-icons/bs";


export default function MessageInput() {
  const user = useAppSelector(state=> state.auth.user);
  const dispatch = useAppDispatch();
  const { socket } = useSocket()
  const [textAreaValue, setTextAreaValue] = useState('')
  const [messageText, setMessageText] = useState('')
  const { selectedChat } = useAppSelector((state) => state.chat);
  const [tOut, setTout] = useState<NodeJS.Timeout>();
  const [loading, setLoading] = useState(false)
  const [attachments, setAttachments] = useState([])
  const [imageUrls, setImageUrls] = useState<string[]>();


  const handleSubmit = () => {

    if ((textAreaValue?.trim() !== '' || attachments.length)  && !loading) {
      setLoading(true)
      const formData = new FormData();
      if (textAreaValue) {
        formData.append("content", textAreaValue);
      }
      if (attachments.length > 5) {
        toast({
          title: 'Error',
          description: 'Maximum 5 attachments are allowed',
          variant: 'destructive',
        })
      }
      attachments?.map((file) => {
        formData.append("attachments", file);
      });
      api.post(`/v1/chat-app/messages/${selectedChat?._id}`, formData)
        .then((res) => {
          console.log("message sent")
          // console.log(res)
          dispatch(addMessages(res?.data?.data))
          dispatch(addChatLastMessage(res?.data?.data));
        })
        .catch((err) => { console.log(err) })
        .finally(() => {
          handleEndTyping()
          setAttachments([])
          // setImageUrls([])
          imageUrls?.map((url) => (
            URL.revokeObjectURL(url)
          ))
          setImageUrls(undefined)
          setLoading(false)
        });


      setTextAreaValue('');
    }
  };

  const handleStartTyping = (e: any) => {

    setTextAreaValue(e.target.value);
    if (!socket) return;


    dispatch(startTyping())
    socket.emit('typing', selectedChat?._id)

    if (tOut) clearTimeout(tOut);

    if (e.target.value.length == 0) { handleEndTyping() }
    const timeoutInterval = setTimeout(() => handleEndTyping(), 5000);
    setTout(timeoutInterval)
  };

  const handleEndTyping = () => {
    if (!socket) return;
    dispatch(stopTyping())
    socket.emit('stopTyping', selectedChat?._id)
  };

  const onEditorChange = (newContent: any) => {
    setMessageText(newContent)
    console.log(newContent)
  };

  return (
    <Box sx={{ px: 0, pb: 0 }} className="bg-card">
      {/* <MultiImageUpload/> */}

      {imageUrls?.length &&
        <div className='flex overflow-auto'>
          {imageUrls?.map((url, index) => (

            <ValidatedImage src={url} alt="" className='m-1 w-12 h-12'
              loading="lazy"
              key={index}
              width={500}
              height={500}
            />

          ))}
        </div>
      }

      <FormControl className=" px-2">
        <Stack
          direction="row"
          sx={{
            py: .5,
            pr: 1,
          }}
        >
          <Stack
            direction="row"
            sx={{
              py: .5,
              pr: 1,
            }}
          >
            <div className='flex my-auto'>
              
              <Popover>
                <PopoverTrigger><BsEmojiHeartEyesFill className='m-1' size={22}/></PopoverTrigger>
                <PopoverContent className='w-fit p-0  bottom-20 absolute '><EmojiPicker className='dark:bg-background z-20 border-0 p-0' onEmojiClick={(e) => setTextAreaValue((prev) => prev + e.emoji)} /></PopoverContent>
              </Popover>
              <input type="file" id='file-input' className='hidden' multiple accept="image/png, image/gif, image/jpeg " onChange={(event: any) => {
                setAttachments(Array.from(event.target.files))

                const files = event.target.files
                const urls = Array.from(files).map((file: any) => {
                  const url = URL.createObjectURL(file)

                  return url
                });

                if (urls.length > 0) {
                  setImageUrls(urls)
                } else {
                  setImageUrls(undefined)
                }



              }} />
              <label htmlFor="file-input" className='my-auto'>
                <MdOutlineLinkedCamera className='my-auto cursor-pointer m-1' size={24} />
              </label>
              
            </div>

          </Stack>
          <Textarea
            className="dark:bg-card w-full"
            placeholder="Type something here…"
            aria-label="Message"
            onChange={handleStartTyping}
            value={textAreaValue}
            maxRows={10}
            onKeyDown={(event) => {
              if (event.key === 'Enter' ) {
                handleSubmit();
              }
            }}
            inputMode="text"
            sx={{
              '& textarea:first-of-type': {
                minHeight: 40,
              },
            }}
          />
          <Button
            size="sm"
            color="primary"
            sx={{ alignSelf: 'center', borderRadius: 'sm' }}

            onClick={handleSubmit}
            className='mx-2'
          >
            {loading ? <span className=""><AiOutlineLoading3Quarters className='animate-spin' /></span> : <span className=""> <SendRoundedIcon /></span>}
          </Button>
        </Stack>

      </FormControl>
      {/* <Editor
      // initialValue={'hey'}
      apiKey='usz9bgh3l8dhmt1qo78mto3vej9zacwcwzm5yuyx5g6ocr3x'
      init={{
        height: 350,
        menubar: false,
        plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
        ],
        toolbar:
          "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
      }}
      onEditorChange={onEditorChange}
      className="border border-gray-300 rounded-md"
    /> */}



      {/* <div className="mt-2" dangerouslySetInnerHTML={{ __html: messageText }} /> */}
    </Box>
  );
}