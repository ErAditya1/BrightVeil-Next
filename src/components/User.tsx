'use client'
import api from '@/api';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from './ui/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Box, IconButton, Typography } from '@mui/joy';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

function User({user}:any) {
    const router = useRouter();
    // const data = useSession()
    // const user = data?.data?.user;
    
  
  
  
    const logoutHandler = async () => {
  
      if (user && user?.accessToken) {
        
        api.patch("/v1/users/logout", {}, {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${user?.accessToken}`
          }
        })
          .then(async (response) => {
            await signOut();
            toast({
              title: 'Success',
              description: response.data.message,
              variant: 'success',
            });
            localStorage.clear();
            router.replace('/sign-in');
          }).catch(({ response }) => {
            console.log(response)
            toast({
  
              title: 'Signout failed',
              description: response.data.message,
              variant: 'destructive',
            });
          });
      }
  
     
    }
  return (
    <>
          <Avatar>
            <AvatarImage src={user?.avatar?.url} alt={user.name} />
            <AvatarFallback>{user?.name?.slice(0, 1)}</AvatarFallback>
          </Avatar>
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