'use client'

import api from '@/api';
import { ThemeProvider } from '@/components/theme-provider';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loginUser, logoutUser } from '@/store/user/userSlice';
import { CssBaseline, CssVarsProvider } from '@mui/joy';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { FaSpinner } from 'react-icons/fa6';

function UserContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter()
  const [user, setUser] = useState(null);
  const pathname = usePathname()

  const dispatch = useAppDispatch()
  const us = useAppSelector((state) => state.auth.user)
  const [loading, setLoading] = useState(true)
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)




  const isPublicPath =
    pathname.startsWith("/sign-in") ||
    pathname.startsWith("/sign-up") ||
    pathname.startsWith("/verify") ||
    pathname.startsWith("/reset-password") ||
    pathname.startsWith("/forget-password")


    const isClient: boolean = typeof window !== 'undefined' && typeof document !== 'undefined';
  useEffect(() => {
    if (isClient) {

      api.get('/v1/users/current-user')
        .then(response => {

          const user = response.data.data
          console.log(response)
          if (!isPublicPath) {
            router.push(pathname)
          } else {
            router.push('/')
          }
          setUser(user)
          dispatch(loginUser(user))
        })
        .catch(error => {
          console.log(error)
          setUser(null)
          dispatch(logoutUser())
          router.push('/sign-in')
        })
        .finally(() => {
          setLoading(false)
        })


    }
  }, [isClient])

  




  useEffect(() => {
    if (isLoggedIn && isPublicPath) {
      if (isPublicPath) {
        router.push('/')

      }
      else {
        router.push(pathname)
      }
    }

  }, [pathname, isLoggedIn])





  return (
    loading ? (
      

            <div className='bg-background h-screen w-screen flex justify-center items-center gap-4'>
              <FaSpinner className='animate-spin text-foreground' size={50} />
              Verifying...
            </div>

        
    ) : (
      <div>{children}</div>
    )
  )
}

export default UserContext