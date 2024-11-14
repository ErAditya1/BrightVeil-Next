'use client'
import api from '@/api';

import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from './ui/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Box, IconButton, Typography } from '@mui/joy';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { logoutUser } from '@/store/user/userSlice';
import { useAppDispatch } from '@/store/hooks';
import AvatarLayout from './AvatarLayout';

function User({ user }: any) {
  const router = useRouter();

  const dispatch = useAppDispatch();



  const logoutHandler = async () => {



    api.patch("/v1/users/logout", {})
      .then(async (response) => {
        localStorage.removeItem('BrightVeilUser');
        dispatch(logoutUser());
        toast({
          title: 'Success',
          description: response.data.message,
          variant: 'success',
        });
        router.push('/sign-in');
      }).catch(({ response }) => {
        console.log(response)
        toast({

          title: 'Signout failed',
          description: response.data.message,
          variant: 'destructive',
        });
      });
  }



  return (
    <>
      <AvatarLayout username={user?.username} src={user?.avatar?.url} name={user?.name}/>
      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Typography level="title-sm">{user.name}</Typography>
        <Typography level="body-xs">{user.email}</Typography>
      </Box>
      <IconButton size="sm" variant="plain" color="neutral">
        <LogoutRoundedIcon onClick={logoutHandler} />
      </IconButton>

    </>
  )
}

export default User