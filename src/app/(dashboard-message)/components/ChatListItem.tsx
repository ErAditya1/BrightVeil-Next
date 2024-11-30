'use client'
import * as React from 'react';
import Box from '@mui/joy/Box';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import Stack from '@mui/joy/Stack';
import AvatarWithStatus from './AvatarWithStatus';
import { toggleMessagesPane } from '@/lib/utils';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { ChatInterface, SelectedChat } from '@/store/chat/chatSlice';

import { timeAgo } from '@/utils/agoTime';
import Link from 'next/link';
import { Chip } from '@mui/joy';
import MessageStatus from './MessageStatus';

type ChatListItemProps = ChatInterface & {
  handleSlide: () => void
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
          className='w-full'
        >
          <Link href={`/chat?${chat?.isGroupChat ? `g=${chat?._id}` : `u=${chat?.username}`}`} className='w-full' >
            <Stack direction="row" spacing={1.5}>
              <AvatarWithStatus online={chat?.isOnline} src={chat?.avatar?.url || ''} name={chat?.name || ''} username={chat?.username || ""} />
              <div className="flex flex-col w-full" onClick={props.handleSlide}>
                <p className='line-clamp-1 text-sm sm:text-md'>{chat?.name}</p>
                <p className='line-clamp-1 text-xs sm:text-sm'>@{chat?.username}</p>

              </div>

              <Box
                sx={{
                  lineHeight: 1.5,
                  textAlign: 'right',
                }}
                className="flex"
              >

                <p
                  className={`text-[8px] break-keep ${props?.unreadCount !== 0 && "text-green-600"}`}
                >
                  {props?.lastMessage?.createdAt && timeAgo(props?.lastMessage?.createdAt)}
                </p>

                {props.unreadCount !== 0 && (
                  <Chip className="my-auto text-sm px-2 h-[8px] bg-green-700">{props?.unreadCount}</Chip>
                )}

              </Box>
            </Stack>
          <div className='flex flex-row items-center gap-1 w-full max-w-full ml-8'>
            {user?._id === props?.lastMessage?.sender?._id && <MessageStatus messageStatus={props?.lastMessage?.status} />}
            <p className='line-clamp-1 text-xs  break-words break-all'> {props?.lastMessage?.content}
          </p>
          </div>
          </Link>


        </ListItemButton>
      </ListItem>

      <ListDivider sx={{ margin: 0 }} />
    </React.Fragment>
  );
}