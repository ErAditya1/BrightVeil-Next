'use client'

import * as React from 'react';
import Badge from '@mui/joy/Badge';
import Avatar, { AvatarProps } from '@mui/joy/Avatar';
import AvatarLayout from '@/components/AvatarLayout';

type AvatarWithStatusProps = AvatarProps & {
  online?: boolean;
  name:string
  src:string
  username: string; // Optional prop for displaying username next to the avatar. This can be useful for displaying the user's name in a user profile.
};

export default function AvatarWithStatus(props: AvatarWithStatusProps) {
  const { online = false, name, src ,className, username} = props;
  return (
    <div>
      {
        online ? <Badge
        color={online ? 'success' : 'neutral'}
        variant={online ? 'solid' : 'soft'}
        size="sm"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        badgeInset="4px 4px"
      >
        <AvatarLayout name={name} src={src} className={className} username={username}/>
      </Badge>
      :<AvatarLayout name={name} src={src} className={className} username={username}/>
      }
    </div>
  );
}