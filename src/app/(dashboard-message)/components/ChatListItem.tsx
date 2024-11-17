'use client'
import * as React from 'react';
import Box from '@mui/joy/Box';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, { ListItemButtonProps } from '@mui/joy/ListItemButton';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import CircleIcon from '@mui/icons-material/Circle';
import AvatarWithStatus from './AvatarWithStatus';
import { ChatProps, MessageProps, UserProps } from '@/types/MessageProps';
import { toggleMessagesPane } from '@/lib/utils';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addUnreadCount, ChatInterface, LastMessageInterface, selectChat, SelectedChat, UserInterface } from '@/store/chat/chatSlice';

import { getChatObjectMetadata } from '@/utils';
import { timeAgo } from '@/utils/agoTime';
import Link from 'next/link';
import MessageStatus from './MessageStatus';
import { Chip } from '@mui/joy';

type ChatListItemProps = ChatInterface & {

};

export default function ChatListItem(props: ChatListItemProps) {
  const user = useAppSelector(state => state.auth.user);
  const selectedChatId = useAppSelector((state) => state.chat.selectedChat._id);

  const [chat, setChat] = React.useState<SelectedChat>()
  const chatUser = props?.participants?.filter(p => p._id !== user?._id)[0];
  React.useEffect(() => {
    if (props?.isGroupChat) {
      setChat({ _id: props?._id, admin: props?.admin, username: 'group', name: props?.name, email: "", avatar: props?.avatar, isOnline: false, isGroupChat: props?.isGroupChat, participants: props?.participants, createdAt: props?.createdAt, updatedAt: props?.updatedAt })
    }
    else {
      setChat({ _id: props?._id, admin: props?.admin, username: chatUser?.username, name: chatUser?.name, email: chatUser?.email, avatar: chatUser?.avatar, isOnline: chatUser?.isOnline, isGroupChat: props?.isGroupChat, participants: props?.participants, createdAt: props?.createdAt, updatedAt: props?.updatedAt })
    }
  }, [props])

  const selected = selectedChatId === props?._id;
  const dispatch = useAppDispatch()
  return (
    <React.Fragment>

      <ListItem>
        <ListItemButton
          onClick={() => {
            toggleMessagesPane();
          }}
          selected={selected}
          color="neutral"
          sx={{
            flexDirection: 'column',
            alignItems: 'initial',
            gap: 1,
          }}
        >
          <Stack direction="row" spacing={1.5}>
            <AvatarWithStatus online={chat?.isOnline} src={chat?.avatar?.url || ''} name={chat?.name || ''} username={chat?.username || ""} />
            <Link href={`/message?${chat?.isGroupChat? `g=${chat?._id}` :`u=${chat?.username}`}`} className='w-full'>
              <Box sx={{ flex: 1 }} className="">
                <p className='line-clamp-1 text-sm sm:text-md'>{chat?.name}</p>
                <p className='line-clamp-1 text-xs sm:text-sm'>@{chat?.username}</p>
                {/* <p className='line-clamp-1 text-xs sm:text-sm'>{user?._id === props?.lastMessage?.sender?._id && <MessageStatus messageStatus={props?.lastMessage?.status} />} {props?.lastMessage?.content}
                </p> */}
              </Box>
            </Link>
            
            <Box
              sx={{
                lineHeight: 1.5,
                textAlign: 'right',
              }}

            >

              <p
                className={`text-xs break-keep ${props.unreadCount !== 0 && "text-green-600"}`}
              >
                {props?.lastMessage?.createdAt && timeAgo(props?.lastMessage?.createdAt)}
              </p>

              {props.unreadCount !== 0 && (
                <Chip className="my-auto text-sm px-2 h-[8px] bg-green-700">{props?.unreadCount}</Chip>
              )}

            </Box>
          </Stack>


        </ListItemButton>
      </ListItem>

      <ListDivider sx={{ margin: 0 }} />
    </React.Fragment>
  );
}