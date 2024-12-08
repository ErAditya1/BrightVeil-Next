'use client'
import React, { Suspense, useState } from 'react';
import Sheet from '@mui/joy/Sheet';
import ChatsPane from '../../components/ChatsPane';
import MessagesPane from '../../components/MessagesPane';

import { useAppSelector } from '@/store/hooks';
import Image from 'next/image';








function Page() {
  const [isSlideIn, setIsSlideIn] = useState(true);

  const { selectedChat } = useAppSelector((state) => state.chat);

  const handleSlide = () => { setIsSlideIn(!isSlideIn) }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Sheet
        sx={{
          flex: 1,
          mx: 'auto',
          pt: { xs: 'var(--Header-height)', sm: 0 },
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'minmax(min-content, min(30%, 400px)) 1fr',
          },
        }}
        className="h-dvh  top-0"
      >
        <Sheet
          sx={{
            position: { xs: 'fixed', sm: 'sticky' },
            transform: {
              sm: 'none',
            },
            transition: 'transform 0.4s, width 0.4s',
            zIndex: 100,

          }}
          className={`h-full w-full overflow-auto transform transition-transform duration-300 ${isSlideIn ? "translate-x-0" : "-translate-x-full"
            }`}

        >
          <ChatsPane handleSlide={handleSlide} />
        </Sheet>
        {
          !selectedChat?._id ?
            <div className="w-full h-full flex justify-center items-center bg-background">
              <Image src="/whatsapp.gif"
                loading="lazy"
                width={200}
                height={200}
                className="h-20 w-20 rounded-full" alt="whatsapp loading button" 
                unoptimized
                />
            </div>
            : <MessagesPane handleSlide={handleSlide} />


        }

      </Sheet>
    </Suspense>
  );
}

export default function Message() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Page />
    </Suspense>
  )
}