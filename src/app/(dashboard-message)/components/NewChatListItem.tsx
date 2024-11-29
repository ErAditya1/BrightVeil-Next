'use client'
import * as React from 'react';
import Box from '@mui/joy/Box';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, { ListItemButtonProps } from '@mui/joy/ListItemButton';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { toggleMessagesPane } from '@/lib/utils';
import Link from 'next/link';
import AvatarWithStatus from './AvatarWithStatus';
import { useAppDispatch, useAppSelector } from '@/store/hooks';


type ChatListItemProps = ListItemButtonProps & {
  _id: string;
  username: string;
  avatar: {
    url: string;
  }
  name: string;
  isOnline: boolean;
  unread?: boolean;
  setIsAddNew: (args: boolean) => void;
  handleSlide: ()=> void
};

export default function NewChatListItem(props: ChatListItemProps) {
  const { _id, username, avatar, name, isOnline, unread } = props;
  const createdChat = useAppSelector((state) => state.chat.createdChat._id);
  const selected = createdChat === _id;
  const dispatch = useAppDispatch()

  return (
    <React.Fragment>

      <ListItem>
        <ListItemButton
          onClick={() => {
            toggleMessagesPane();
            props?.setIsAddNew(false)
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
            <AvatarWithStatus online={isOnline} src={avatar?.url} name={name} username={username} />
            <Link href={`/chat?u=${username}`} className='w-full' >
              <Box sx={{ flex: 1 }} className=""onClick={props?.handleSlide} >
                <p className='line-clamp-1 text-sm sm:text-md'>{name}</p>
                <p className='line-clamp-1 text-xs sm:text-sm'>@{username}</p>
              </Box>
            </Link>

          </Stack>

        </ListItemButton>
      </ListItem>


      <ListDivider sx={{ margin: 0 }} />
    </React.Fragment>
  );
}