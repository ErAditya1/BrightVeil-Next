import React from 'react'
import { HoverBorderGradient } from './ui/hover-border-gradient'
import { Chip } from '@mui/joy'

function FollowButton({ className }: any) {
    return (
        <HoverBorderGradient
            as="button"
            className={`bg-muted text-muted-foreground flex items-center space-x-2 ${className}`}
        >

            <Chip>5k</Chip>
            <span>Follow</span>

        </HoverBorderGradient>
    )
}

export default FollowButton