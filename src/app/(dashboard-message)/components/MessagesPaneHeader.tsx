'use client'
import * as React from 'react';
import Avatar from '@mui/joy/Avatar';

import Button from '@mui/joy/Button';
import Chip from '@mui/joy/Chip';
import IconButton from '@mui/joy/IconButton';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import CircleIcon from '@mui/icons-material/Circle';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';

import { toggleMessagesPane } from '@/lib/utils';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import AvatarLayout from '@/components/AvatarLayout';
import { Dropdown, Menu, MenuButton, MenuItem } from '@mui/joy';
import { MdDelete } from 'react-icons/md';

import api from '@/api';
import { toast } from '@/components/ui/use-toast';
import { deleteChat } from '@/store/chat/chatSlice';




export default function MessagesPaneHeader() {
  const selectedChat = useAppSelector((state) => state.chat.selectedChat)
  const user = useAppSelector(state=> state.auth.user);
  const dispatch = useAppDispatch()
  const deleteChatHandler = () => {
    // TODO: Implement chat deletion
    
      api.delete(`/v1/chat-app/chats/remove/${selectedChat._id}`)
        .then((res) => {
          console.log(res)
          // remove chat from store and close the messages pane
          toast({
            title: 'Chat deleted successfully',
            description: res.data.message,
            variant: 'success'
          })
          dispatch(deleteChat(selectedChat))
          // redirect to chats page
        })
        .catch((error) => {
          console.log(error);
        });
    

  }
  const deleteGroupHandler = () => {
    // TODO: Implement chat deletion
    
      api.delete(`/v1/chat-app/chats/group/${selectedChat._id}`)
        .then((res) => {
          console.log(res)
          // remove chat from store and close the messages pane
          toast({
            title: 'Chat deleted successfully',
            description: res.data.message,
            variant: 'success'
          })
          dispatch(deleteChat(selectedChat))
          // redirect to chats page
        })
        .catch((error) => {
          console.log(error);
        });
    

  }
  const leaveGroupHandler = () => {
    // TODO: Implement chat deletion
    
      api.delete(`/v1/chat-app/chats/leave/group/${selectedChat._id}`)
        .then((res) => {
          console.log(res)
          // remove chat from store and close the messages pane
          toast({
            title: 'Chat deleted successfully',
            description: res.data.message,
            variant: 'success'
          })
          dispatch(deleteChat(selectedChat))
          // redirect to chats page
        })
        .catch((error) => {
          console.log(error);
        });
    

  }

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      sx={{
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
      py={{ xs: 2, md: 2 }}
      px={{ xs: 1, md: 2 }}
      className="bg-card text-card-foreground"
    >
      <Stack direction="row" spacing={{ xs: 1, md: 2 }} alignItems="center">
        <IconButton
          variant="plain"
          color="neutral"
          size="sm"
          sx={{
            display: { xs: 'inline-flex', sm: 'none' },
          }}
          onClick={() => toggleMessagesPane()}
        >
          <ArrowBackIosNewRoundedIcon />
        </IconButton>
        <AvatarLayout src={selectedChat?.avatar?.url} name={selectedChat?.name} username={selectedChat?.username}/>
        <div>
          <Typography
            fontWeight="lg"
            fontSize="lg"
            component="h2"
            noWrap
            endDecorator={
              selectedChat?.isOnline ? (
                <Chip
                  variant="outlined"
                  size="sm"
                  color="neutral"
                  sx={{
                    borderRadius: 'sm',
                  }}
                  startDecorator={
                    <CircleIcon sx={{ fontSize: 8 }} color="success" />
                  }
                  slotProps={{ root: { component: 'span' } }}
                >
                  Online
                </Chip>
              ) : undefined
            }
          >
            {selectedChat?.name}
          </Typography>
          <Typography level="body-sm">@{selectedChat?.username}</Typography>
        </div>
      </Stack>
      <Stack spacing={1} direction="row" alignItems="center">
        {/* <Button
          startDecorator={<PhoneInTalkRoundedIcon />}
          color="neutral"
          variant="outlined"
          size="sm"
          sx={{
            display: { xs: 'none', md: 'inline-flex' },
          }}
        >
          Call
        </Button> */}
        <Button
          color="neutral"
          variant="outlined"
          size="sm"
          sx={{
            display: { xs: 'none', md: 'inline-flex' },
          }}
        >
          {selectedChat?.isGroupChat ? <span>View Group</span> : <span>View Profile</span>}
        </Button>

        <Dropdown>
          <MenuButton><MoreVertRoundedIcon /></MenuButton>
          <Menu>

            {
              selectedChat?.isGroupChat ? (

                <>
                  {
                    selectedChat?.admin === user?._id ?
                      (
                        <MenuItem onClick={deleteGroupHandler}>Delete Group<MdDelete /></MenuItem>

                      )
                      :
                      (
                        <MenuItem onClick={leaveGroupHandler}>Leave Group <MdDelete/></MenuItem>
                      )
                  }
                </>

              ) :
                (
                  <MenuItem onClick={deleteChatHandler}>Delete <MdDelete /></MenuItem>

                )
            }
          </Menu>
        </Dropdown>
      </Stack>
    </Stack>
  );
}