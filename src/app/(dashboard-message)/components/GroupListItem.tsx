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
import { selectChat } from '@/store/chat/chatSlice';
import { Checkbox } from '@mui/joy';

type ChatListItemProps = ListItemButtonProps & {
  _id: string;
  username: string;
  avatar: {
    url: string;
  }
  name: string;
  isOnline: boolean;
  unread?: boolean;
  toggleUserSelection:(args:string) => void;
  selectedUsers: string[];
  
};

export default function GroupListItem(props: ChatListItemProps) {
  const { _id,  username, avatar, name, isOnline} = props;
  const selectedChatId = useAppSelector((state) => state.chat.selectedChat._id);
  const selected = selectedChatId === _id;
  const dispatch = useAppDispatch()
  
  return (
    <React.Fragment>
      
      <ListItem>
        <ListItemButton
          onClick={() => {
            // toggleMessagesPane();
            
          }}
          selected={selected}
          color="neutral"
          sx={{
            flexDirection: 'column',
            alignItems: 'initial',
            gap: 1,
          }}
        >
          <Stack direction="row" spacing={1.5} >
            <AvatarWithStatus online={isOnline} src={avatar?.url} name={name} username={username}/>
            <Box sx={{ flex: 1 }}>
              <Typography level="title-sm">{name}</Typography>
              <Typography level="body-sm">{username}</Typography>
            </Box>
            <Box className="my-auto h-full flex justify-center">
              <Checkbox  variant="outlined" defaultChecked  checked={props.selectedUsers.includes(_id)}
                onChange={() => props.toggleUserSelection(_id)}/>
          </Box>
          </Stack>
          

        </ListItemButton>
      </ListItem>
      
      
      <ListDivider sx={{ margin: 0 }} />
    </React.Fragment>
  );
}