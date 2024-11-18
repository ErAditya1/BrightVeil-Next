import React, { useEffect } from 'react'
import { HoverBorderGradient } from './ui/hover-border-gradient'
import { Chip } from '@mui/joy'
import { AxiosError } from 'axios'
import api from '@/api'
import { toast } from './ui/use-toast'

function FollowButton({ className, count, isFollowing, _id }: any) {
    const [following, setFollowing] = React.useState(isFollowing)
    const [followersCount, setFollowersCount] = React.useState(count)
    const [isLoading, setIsLoading] = React.useState(false)
    useEffect(() => {
        setFollowing(isFollowing)
        setFollowersCount(count)
    }, [isFollowing, count])


    const handleFallow = () => {
        if(isLoading)   return
        setIsLoading(true)
        api.post(`/v1/users/user-follow-handler/${_id}`)
            .then((res) => {
                setFollowing(!following)
                if (following) {
                    setFollowersCount(followersCount - 1)
                } else {
                    setFollowersCount(followersCount + 1)
                }
                toast({
                    title: 'Success!',
                    description: res.data.message,
                    variant: 'success'
                })
                setIsLoading(false)
            })
            .catch((error) => {
                setIsLoading(false)
                const axiosError = error as AxiosError<AxiosError>
                toast({
                    title: 'Follow Failed!',
                    description: axiosError.response?.data?.message || 'An error occurred',
                    variant: 'destructive'
                })
            })
    }

    return (
        <HoverBorderGradient
            as="button"
            className={`z-10 bg-muted text-muted-foreground flex items-center space-x-2 h-8 w-28 p-1 sm:p-2 sm:h-auto sm:w-auto ${className}`}
            onClick={handleFallow}
            
        >

            <Chip>{followersCount}</Chip>
            {
                following ? (
                    <span>Unfollow</span>
                ) : (
                    <span>Follow</span>
                )
            }

        </HoverBorderGradient>
    )
}

export default FollowButton