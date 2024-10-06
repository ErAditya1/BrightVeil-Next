'use client'
import  React, { useRef } from 'react';
import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import AvatarWithStatus from './AvatarWithStatus';
import ChatBubble from './ChatBubble';
import MessageInput from './MessageInput';
import MessagesPaneHeader from './MessagesPaneHeader';
import { ChatProps, MessageProps } from '@/types/MessageProps';
import { useAppSelector } from '@/store/hooks';
import Typing from './Typing';
import { useSession } from 'next-auth/react';
import { useSocket } from '@/context/SocketContext';
import { Stack } from '@mui/material';

type MessagesPaneProps = {
  chat: ChatProps;
};

export default function MessagesPane() {

  const user = useSession()?.data?.user
  const {selectedChat, messages} = useAppSelector((state)=> state.chat)
  
  const {_id, name, username, avatar, isOnline}  = selectedChat
  const isOtherTyping = useAppSelector((state)=> state.chat.isOtherTyping)
  
 

  if(selectedChat._id){
    return (
      <Sheet
      sx={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'background.level1',
      }}
      className="h-screen"
    >
      <MessagesPaneHeader   />
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          minHeight: 0,
          px: 2,
          py: 3,
          overflowY: 'scroll',
          flexDirection: 'column-reverse',
        }}
        className="bg-background"
      >
        {
          (messages?.length > 0 ) && user ? 
          <div>
            <Stack spacing={1} justifyContent="flex-end">
          {
           messages?.map((message:any, index: number) => {
            const isYou = message?.sender?._id === user?._id 
            const whoPrevious = message?.sender?._id === messages[index-1]?.sender?._id
            
            return (
              <div
                key={index}
                className={` flex   ${isYou ? 'flex-row-reverse' : 'flex-row'} `}
                
              >
                <div className=''>
                  
                  {!isYou && !whoPrevious  && (
                    <AvatarWithStatus
                      online={message?.sender?.isOnline}
                      src={message?.sender?.avatar?.url}
                      name={message?.sender?.name}
                      className='h-8 w-8'
                    />
                  )}
                  <ChatBubble whoPrevious={whoPrevious} variant={isYou ? 'sent' : 'received'} {...message} />
                </div>
              </div>
            );
          })
        } 
        </Stack>
        {isOtherTyping && 
         <Typing/>
        }
          </div>:
          <div className='h-full w-full flex justify-center items-center'>
            <Typing/>
          </div>
        }
      </Box>
      <MessageInput/>
    </Sheet>
    )
  }else{
    return <h1> Welcome in chat</h1>;
  }
}