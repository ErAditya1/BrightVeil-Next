import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

function AvatarLayout({className, src, name}:any) {
    const nameParts = name?.trim()?.split(/\s+/);

    
    return (
        <Avatar className={className }>
            <AvatarImage src={src} alt={name} />
            {
                nameParts?.length && <AvatarFallback>{nameParts[0] && nameParts[0]?.slice(0,1) }{nameParts[1] && nameParts[1]?.slice(0,1)}</AvatarFallback>
            }
        </Avatar>
    )
}

export default AvatarLayout