import { Box, IconButton, Typography } from '@mui/joy'
import React from 'react'
import GoBackButton from './GoBack'
import Link from 'next/link'
import Image from 'next/image'
import ColorSchemeToggle from './ColorSchemeToggle'

function SidebarTop() {
  return (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }} className="mt-12  br:mt-0 w-full flex justify-evenly">

    <GoBackButton />
    <Link href='/' className='w-full h-full flex flex-row gap-2 items-center'>
      <IconButton variant="soft" color="primary" size="sm" className='max-h-10 max-w-10'>
        {/* <BrightnessAutoRoundedIcon /> */}
        <Image src='/brightveilDark.jpeg'
          height={500}
          width={500}
          alt="Bright Veil Logo"
          className='h-full w-full rounded-full hidden dark:block'
        />
        <Image src='/brightveilLight.jpeg'
          height={500}
          width={500}
          alt="Bright Veil Logo"
          className='h-full w-full rounded-full block dark:hidden'
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