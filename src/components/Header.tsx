"use client"
import * as React from 'react';
import GlobalStyles from '@mui/joy/GlobalStyles';
import Sheet from '@mui/joy/Sheet';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { cn, toggleSidebar } from '@/lib/utils';
import { SiGooglemessages } from 'react-icons/si';
import { Box, Chip, IconButton, Typography } from '@mui/joy';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { handleSidebar } from '@/store/setting/settingSlice';
import ColorSchemeToggle from './ColorSchemeToggle';
import GoBackButton from './GoBack';
import Link from 'next/link';
import Image from 'next/image';
import api from '@/api';
import { Search } from 'lucide-react';
import { MdMenuOpen } from 'react-icons/md';


export default function Header() {
  const { isSideBar } = useAppSelector((state) => state.setting)
  const { unreadMessageCount } = useAppSelector((state) => state.chat)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const handleSearch = (search: string) => {
    // router.push('/search')
    api.get(`/v1/comman/search?search=${encodeURIComponent(search)}&page=${1}&limit=${10}`)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
  }

      

  return (
    <Box
      sx={{
        display: {},
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'fixed',
        top: 0,
        width: '100vw',
        height: '50px',
        zIndex: 9998,
        p: 2,
        gap: 1,
        borderBottom: '1px solid',
        borderColor: 'background.level1',
        boxShadow: 'sm',
      }}
      className={cn(
        "sticky flex flex-row justify-between top-0 inset-x-0 h-14 w-full border-b  z-[99999] select-none border-background/80 bg-background/40 backdrop-blur-md",
        
    )}
    >
      <GlobalStyles
        styles={(theme) => ({
          ':root': {
            '--Header-height': '52px',
            [theme.breakpoints.up('md')]: {
              '--Header-height': '0px',
            },
          },
        })}
      />
      <div className='flex items-center gap-2 '>
        {!isSideBar ? <IconButton
          onClick={() => dispatch(handleSidebar(true))}
          variant="soft"
          color="primary"
          size="sm"
          className='z-[50] text-xl'
        >
          <MenuRoundedIcon />
        </IconButton> :
          <IconButton
            onClick={() => dispatch(handleSidebar(false))}
            variant="soft"
            color="primary"
            size="sm"
            className='z-[50] text-xl'
          >
            <MdMenuOpen size={20} />
          </IconButton>}

        <div className='hidden br:flex gap-2'>
          <GoBackButton />
          <Link href='/' className='w-full h-full flex flex-row gap-2 items-center'>
            <IconButton variant="soft" color="primary" size="sm" className='max-h-10 max-w-10 relative'>
              {/* <BrightnessAutoRoundedIcon /> */}
              <Image src='/brightveilDark.jpg'
                height={500}
                width={500}
                alt="Bright Veil Logo"
                className='h-full w-full rounded-full hidden dark:block absolute top-0'
              />
              <Image src='/brightveilLight.jpg'
                height={500}
                width={500}
                alt="Bright Veil Logo"
                className='h-full w-full rounded-full block dark:hidden absolute top-0'
              />
            </IconButton>
            <Typography level="title-lg">
              BrightVeil
            </Typography>
          </Link>

        </div>


      </div>
      <div className='flex gap-2 items-center '>
        <IconButton
          variant="soft" color="primary" size="sm"
        >
          <Search size={20} />
        </IconButton>
        <IconButton
          onClick={() => router.push("/chat")}
          variant="soft" color="primary" size="sm"
        >
          <SiGooglemessages size={20} />
          {unreadMessageCount > 0 && <Chip className="bg-transparent" sx={{ backgroundColor: 'error.500'}}>{unreadMessageCount+10 >99 ? '99+' : unreadMessageCount}</Chip>}
          
        </IconButton>
        <ColorSchemeToggle sx={{ m: 'auto' }} />
      </div>
    </Box>
  );
}