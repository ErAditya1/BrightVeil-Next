"use client"  
import * as React from 'react';
import GlobalStyles from '@mui/joy/GlobalStyles';
import Sheet from '@mui/joy/Sheet';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { toggleSidebar } from '@/lib/utils';
import { SiGooglemessages } from 'react-icons/si';
import { IconButton } from '@mui/joy';
import { useRouter } from 'next/navigation';


export default function Header() {
  const router = useRouter()
  return (
    <Sheet
      sx={{
        display: { xs: 'flex', md: 'none' },
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'fixed',
        top: 0,
        width: '100vw',
        height: 'var(--Header-height)',
        zIndex: 9998,
        p: 2,
        gap: 1,
        borderBottom: '1px solid',
        borderColor: 'background.level1',
        boxShadow: 'sm',
      }}
      className= "dark:bg-slate-900 flex justify-between items-center"
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
      <IconButton
        onClick={() => toggleSidebar()}
        variant="soft"
        color="primary"
        size="sm"
      >
        <MenuRoundedIcon />
      </IconButton>
      <div>
      <IconButton
        onClick={() => router.push("/chat")}
        variant="soft" color="primary" size="md"
      >
        <SiGooglemessages size={26}/>
      </IconButton>
      </div>
    </Sheet>
  );
}