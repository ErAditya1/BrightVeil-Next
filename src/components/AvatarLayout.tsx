import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import Link from 'next/link';

function AvatarLayout({ className, src, name, username }: any) {
    const nameParts = name?.trim()?.split(/\s+/);


    if (username) {
        return(
            <Link href={`/users/profile/${username}`}>
            <Avatar className={`${className} border shadow-lg`} >
                <AvatarImage src={src} alt={name} />
                {
                    nameParts?.length && <AvatarFallback>{nameParts[0] && nameParts[0]?.slice(0, 1)}{nameParts[1] && nameParts[1]?.slice(0, 1)}</AvatarFallback>
                }
            </Avatar>
        </Link>
        )
    } else {
        return (
        
            <Avatar className={`${className} border shadow-lg`} >
                <AvatarImage src={src} alt={name} />
                {
                    nameParts?.length && <AvatarFallback>{nameParts[0] && nameParts[0]?.slice(0, 1)}{nameParts[1] && nameParts[1]?.slice(0, 1)}</AvatarFallback>
                }
            </Avatar>
        
        )
    }
   
}

export default AvatarLayout