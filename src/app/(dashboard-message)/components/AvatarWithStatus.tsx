'use client'

import * as React from 'react';
import Badge from '@mui/joy/Badge';
import Avatar, { AvatarProps } from '@mui/joy/Avatar';
import AvatarLayout from '@/components/AvatarLayout';

type AvatarWithStatusProps = AvatarProps & {
  online?: boolean;
  name:string
  src:string
};

export default function AvatarWithStatus(props: AvatarWithStatusProps) {
  const { online = false, name, src ,className} = props;
  return (
    <div>
      <Badge
        color={online ? 'success' : 'neutral'}
        variant={online ? 'solid' : 'soft'}
        size="sm"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        badgeInset="4px 4px"
      >
        <AvatarLayout name={name} src={src} className={className}/>
      </Badge>
    </div>
  );
}