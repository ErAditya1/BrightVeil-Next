import React from 'react'
import { Button } from './ui/button'
import AvatarLayout from './AvatarLayout'
import Link from 'next/link'

type User = {
    author: {
        _id: string,
        name: string,
        username: string,
        avatar: {
            url: string,
        },

    },
    isSelf: false,
    isFollowingToMe: false,
    isIamFollowing: true
}[]
function UserFollowCard({ users }: { users: User }) {
    console.log(users)
    return (
        <div className="flex flex-col gap-2 w-dvw xs:w-72 p-2 h-fit">
            {
                users?.map((user: any) => (
                    <div className='flex flex-row items-center justify-evenly w-full ' key={user?.author?._id}>
                        <div className='flex flex-row items-center w-full'>
                            <AvatarLayout className="h-10 w-10 mr-1 text-xl" src={user?.author?.avatar?.url} name={user?.author?.name} username={user?.author?.username} />
                            <div className="card-content mx-2">
                                <p className="line-clamp-1 text-sm lg:text-md">{user?.author?.name}</p>
                                <p className='line-clamp-1 text-xs lg:text-md'>@{user?.author?.username}</p>
                            </div>
                        </div>
                        {
                            !user?.isSelf &&
                            <Link href={`/user/profile/${user?.author?.username}`}>
                                <Button className="" >
                                    {user?.isIamFollowing ? 'Unfollow' : <>{
                                        user?.isFollowingToMe ? 'Follow Back' : "Follow"
                                    }</>}
                                </Button>
                            </Link>
                        }


                    </div>
                )
                )
            }
        </div>
    )
}

export default UserFollowCard