'use client'

import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Skeleton } from '@/components/ui/skeleton';
import { BookOpen} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function PostCard({key}:any) {
  const [isLoading, setIsLoading] = React.useState(false);
  return (
    <Link href='/posts/abcd' key={key}>
      <Card variant="outlined" className="bg-card dark:bg-card text-card-foreground">
      <CardOverflow>
        <AspectRatio ratio="2">
          {
            isLoading ? (
              <Skeleton className=" w-full rounded" />
            ) : (
              <Image
                src="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318"
                loading="lazy"
                width={500}
                height={500}
                alt=""
              />
            )
          }
        </AspectRatio>
      </CardOverflow>
      <CardContent className="flex flex-row items-centr" >
        {
          isLoading ? (
            <React.Fragment>
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </React.Fragment>
          ) :
            (
              <React.Fragment>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="card-content ">
                  <Typography level="title-md" className="line-clamp-2">Yosemite National Park</Typography>
                  <Typography level="body-sm">California</Typography>
                </div>
              </React.Fragment>
            )
        }

      </CardContent>
      
    </Card>
    </Link>
  );
}
