'use client';

import * as React from 'react';
import CardContent from '@mui/joy/CardContent';

import { Skeleton } from '@/components/ui/skeleton';
import { BookOpen } from 'lucide-react';
import Link from 'next/link';
import { AspectRatio, Card, CardOverflow, Divider, Typography } from '@mui/joy';
import api from '@/api';
import Image from 'next/image';
import AvatarLayout from '@/components/AvatarLayout';
import { BiMoney } from 'react-icons/bi';

type CourseData = {
  thumbnail: {
    secure_url: string;
  };
  title: string;
  author: {
    name: string;
    avatar: {
      url: string;
    };
    username: string;
  };
  chapterCount: number;
  isFree: boolean;
};

type Props = {
  _id: string;
};

export default function CourseCard({ _id }: Props) {
  const [courseData, setCourseData] = React.useState<CourseData>({
    thumbnail: { secure_url: '' },
    title: '',
    author: { name: '', avatar: { url: '' }, username: '' },
    chapterCount: 0,
    isFree: false,
  });

  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/v1/courses/course/getPublishedCourses/${_id}`);
        setCourseData(res.data.data[0]);
      } catch (error) {
        console.error("Failed to fetch course data", error);
        setError('Failed to load course details');
      } finally {
        setIsLoading(false);
      }
    };

    if (_id) fetchData();
  }, [_id]);

  if (error) {
    return (
      <Card className="bg-card text-card-foreground">
        <CardContent className="text-center">
          <Typography level="body-sm" className="text-red-500">
            {error}
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Link href={`/courses/${_id}`} key={_id}>
      <Card className="bg-card text-card-foreground">
        <CardOverflow>
          <AspectRatio ratio="2">
            {isLoading ? (
              <Skeleton className="w-full rounded animate-pulse" />
            ) : (
              <Image
                src={courseData.thumbnail.secure_url || '/placeholder-image.png'}
                loading="lazy"
                width={500}
                height={500}
                alt={courseData.title || 'Course Thumbnail'}
              />
            )}
          </AspectRatio>
        </CardOverflow>

        <CardContent className="flex flex-row items-center w-full">
          {isLoading ? (
            <div className="flex flex-row flex-nowrap justify-between p-0 w-full">
              <Skeleton className="h-12 w-12 rounded-full animate-pulse" />
              <div className="space-y-2 w-full gap-2 pl-2">
                <Skeleton className="h-4 w-full animate-pulse" />
                <Skeleton className="h-4 w-full animate-pulse" />
                <Skeleton className="h-4 w-[50%] animate-pulse" />
              </div>
            </div>
          ) : (
            <div className="flex flex-row gap-2 w-full">
              <AvatarLayout
                src={courseData?.author?.avatar?.url || '/fallback-avatar.png'}
                name={courseData?.author?.name}
                username={courseData?.author?.username}
              />
              <div className="card-content h-16">
                <Typography level="title-md" className="line-clamp-2 break-words">
                  {courseData.title}
                </Typography>
                <Typography level="body-sm" className="line-clamp-1">
                  @{courseData.author.username}
                </Typography>
              </div>
            </div>
          )}
        </CardContent>

        <CardOverflow className="h-14">
          <Divider inset="context" />
          {isLoading ? (
            <CardContent>
              <div className="flex flex-row flex-nowrap justify-between items-center p-0">
                <Skeleton className="w-16 h-5 rounded animate-pulse" />
                <Skeleton className="w-12 h-5 rounded animate-pulse" />
              </div>
            </CardContent>
          ) : (
            <CardContent
              orientation="horizontal"
              className="flex items-center justify-between m-0 p-0"
            >
              <div className="flex flex-row items-center bg-background text-foreground p-1 rounded-lg text-xs">
                <BookOpen className="mx-2" size={15} />
                <span>{courseData.chapterCount} Chapters</span>
              </div>
              {courseData.isFree && (
                <div className="flex flex-row items-center bg-background text-foreground p-1 rounded-lg text-xs">
                  <BiMoney className="mx-2" size={15} />
                  <span>Free</span>
                </div>
              )}
            </CardContent>
          )}
        </CardOverflow>
      </Card>
    </Link>
  );
}
