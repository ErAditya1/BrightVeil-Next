'use client'

import React, { useRef, useState } from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import Textarea from '@mui/joy/Textarea';
import { IconButton, Sheet, Stack } from '@mui/joy';

import FormatBoldRoundedIcon from '@mui/icons-material/FormatBoldRounded';
import FormatItalicRoundedIcon from '@mui/icons-material/FormatItalicRounded';
import StrikethroughSRoundedIcon from '@mui/icons-material/StrikethroughSRounded';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addChatLastMessage, addMessages, startTyping, stopTyping } from '@/store/chat/chatSlice';
import { useSocket } from '@/context/SocketContext';
import api from '@/api';
import { useSession } from 'next-auth/react';

import { Editor } from '@tinymce/tinymce-react';
import { MdOutlineLinkedCamera } from 'react-icons/md';
import { MultiImageUpload } from '@/components/EdgeStore/MultiImageUpload';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { toast } from '@/components/ui/use-toast';


export default function MessageInput() {
  const token = useSession()?.data?.user?.accessToken
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

    if ((textAreaValue?.trim() !== '' || attachments.length) && token && !loading) {
      setLoading(true)
      const formData = new FormData();
      if (textAreaValue) {
        formData.append("content", textAreaValue);
      }
      if(attachments.length>5){
        toast({
          title: 'Error',
          description: 'Maximum 5 attachments are allowed',
          variant: 'destructive',
        })
      }
      attachments?.map((file) => {
        formData.append("attachments", file);
      });
      api.post(`/v1/chat-app/messages/${selectedChat?._id}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      })
        .then((res) => {
          console.log("message sent")
          // console.log(res)
          dispatch(addMessages(res?.data?.data))
          dispatch(addChatLastMessage(res?.data?.data));
          handleEndTyping()
          setAttachments([])
          // setImageUrls([])
          imageUrls?.map((url) =>(
            URL.revokeObjectURL(url)
          ))
          setImageUrls(undefined)
        }).catch((err) => {}).finally(() => {setLoading(false)});


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
      
        {imageUrls?.length  &&
        <div className='flex overflow-auto'>
          {imageUrls?.map((url) => (

            <img src={url} alt="" width='50px' height='50px' className='m-1 ' />

          ))}
          </div>
        }
      
      <FormControl className="flex flex-row px-2">
        <Stack
          direction="row"
          sx={{
            py: .5,
            pr: 1,
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
          className="flex flex-row"
        >
          <div className='flex my-auto'>
            <input type="file" id='file-input' className='hidden' multiple accept="image/png, image/gif, image/jpeg " onChange={(event: any) => {
              setAttachments(Array.from(event.target.files))

              const files = event.target.files
              const urls = Array.from(files).map((file: any) => {
                const url = URL.createObjectURL(file)

                return url
              });

              if(urls.length > 0){
                setImageUrls(urls)
              }else{
                setImageUrls(undefined)
              }
             


            }} />
            <label htmlFor="file-input" className='my-auto'>
              <MdOutlineLinkedCamera className='m-auto cursor-pointer' size={20} />
            </label>
            {/* <IconButton size="sm" variant="plain" color="neutral">
                  <FormatBoldRoundedIcon />
                </IconButton>
                <IconButton size="sm" variant="plain" color="neutral">
                  <FormatItalicRoundedIcon />
                </IconButton>
                <IconButton size="sm" variant="plain" color="neutral">
                  <StrikethroughSRoundedIcon />
                </IconButton>
                <IconButton size="sm" variant="plain" color="neutral">
                  <FormatListBulletedRoundedIcon />
                </IconButton> */}
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
            if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
              handleSubmit();
            }
          }}
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
          {loading ? <span className=""><AiOutlineLoading3Quarters className='animate-spin'/></span>: <span className=""> <SendRoundedIcon /></span>}
        </Button>
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