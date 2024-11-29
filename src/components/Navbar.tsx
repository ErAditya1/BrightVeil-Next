'use client'
import { Box, IconButton, Typography } from "@mui/joy"
import ValidatedImage from '@/components/ValidatedImage'
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

import { MessageCircleMoreIcon } from "lucide-react"
import { GrAnnounce } from "react-icons/gr";

const Navbar = () => {
  

  return (
    <>


      {/* <div className='bg-card text-card-foreground flex items-center justify-between p-4'>

        <div className='hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2'>
          <ValidatedImage src="/search.png" alt="" width={14} height={14} />
          <input type="text" placeholder="Search..." className="w-[200px] p-2 bg-transparent outline-none" />
        </div>

        <div className='flex items-center gap-6 justify-end w-full'>
          <IconButton variant="soft" color="primary" size="sm">
            <Link href="/chat" className=' rounded-full w-7 h-7 flex items-center justify-center cursor-pointer'>
              <MessageCircleMoreIcon />
            </Link>
          </IconButton>
          <IconButton variant="soft" color="primary" size="sm">
            <Link href="/announcement" className=' rounded-full w-7 h-7 flex items-center justify-center cursor-pointer'>
              <GrAnnounce className="text-xl " />
            </Link>
            <div className='absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center bg-purple-500 text-white rounded-full text-xs'>1</div>
          </IconButton>

          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>


            {data.status === "authenticated" && <>

              <Box sx={{ minWidth: 0, flex: 1 }}>
                <p className="text-sm">@{user.username}</p>
                <p className="text-xs aaa float-end">{user.role}</p>
              </Box>
              <Avatar>
                <AvatarImage src={user?.avatar?.url} alt={user.name} />
                <AvatarFallback>{user?.name?.slice(0, 1)}</AvatarFallback>
              </Avatar>


            </>
            }
          </Box>
        </div>
      </div> */}


    </>

  )
}

export default Navbar