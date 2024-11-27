import { Box, IconButton, Typography } from '@mui/joy'
import React from 'react'
import GoBackButton from './GoBack'
import Link from 'next/link'
import ValidatedImage from '@/components/ValidatedImage';
import ColorSchemeToggle from './ColorSchemeToggle'
import Image from 'next/image';

function SidebarTop() {
  return (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }} className="mt-12  br:mt-0 w-full flex justify-evenly">

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
      <ColorSchemeToggle sx={{ ml: 'auto' }} />

    </Box>
  )
}

export default SidebarTop