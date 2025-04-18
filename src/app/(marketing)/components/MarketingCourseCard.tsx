'use client';

import * as React from 'react';
import CardContent from '@mui/joy/CardContent';

import { Skeleton } from '@/components/ui/skeleton';
import { BookOpen } from 'lucide-react';
import Link from 'next/link';
import { AspectRatio, Card, CardOverflow, Divider, Typography } from '@mui/joy';
import api from '@/api';
import AvatarLayout from '@/components/AvatarLayout';
import { BiMoney } from 'react-icons/bi';
import { toast } from '@/components/ui/use-toast';
import { MdEventAvailable } from 'react-icons/md';
import ValidatedImage from '@/components/ValidatedImage';
import Image from 'next/image';

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
  isEnrolled: boolean;
  sellingPrice: number;
};

type Props = {
  _id: string;
};

export default function MarketingCourseCard({ _id }: Props) {
  const [courseData, setCourseData] = React.useState<CourseData>({
    thumbnail: { secure_url: '' },
    title: '',
    author: { name: '', avatar: { url: '' }, username: '' },
    chapterCount: 0,
    isFree: false,
    isEnrolled: false,
    sellingPrice: 0,
  });

  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/v1/courses/course/getMarketingCourses/${_id}`);
        setCourseData(res.data.data[0]);
        console.log(res)
      } catch (error) {

        console.log("Failed to fetch course data", error);
        
      } finally {
        setIsLoading(false);
      }
    };

    if (_id) fetchData();
  }, [_id]);

  

  return (
    // <Link href={`/auth/courses/${_id}`} key={_id}>
      <Card className={`dark:bg-card text-card-foreground p-0 shadow-lg h-full ${courseData?.isEnrolled && 'border border-green-700  shadow-green-700'}`}>
        <CardOverflow>
          <AspectRatio ratio="2">
            {isLoading ? (
              <Skeleton className="w-full rounded animate-pulse" />
            ) : (
              <Image
                src={courseData?.thumbnail?.secure_url }
                loading="lazy"
                width={500}
                height={500}
                alt={courseData?.title || 'Course Thumbnail'}
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
            <div className="flex flex-row gap-2 w-full h-14 items-center">
              <AvatarLayout
                src={courseData?.author?.avatar?.url || '/fallback-avatar.png'}
                name={courseData?.author?.name}
              />
              <div className="card-content flex justify-center flex-col">
                <p  className="line-clamp-2 break-words text-sm sm:text-md ">
                  {courseData?.title}
                </p>
                <p className="line-clamp-1 text-xs sm:text-md">
                  @{courseData?.author?.username}
                </p>
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
                <span>{courseData?.chapterCount} Chapters</span>
              </div>

              {courseData?.isEnrolled ? (
                <div className="flex flex-row items-center bg-background text-foreground p-1 rounded-lg text-xs">
                  <MdEventAvailable className="mx-2" size={15} />
                  <span>Enrolled</span>
                </div>
              )
              :
              <>
                {
                  courseData?.sellingPrice > 0? (
                    <div className="flex flex-row items-center bg-background text-foreground p-1 rounded-lg text-xs">
                      <BiMoney className="mx-2" size={15} />
                      <span>
                      ₹{courseData?.sellingPrice.toFixed(2)}
                        {courseData?.isFree? '(Free)' : ''}
                      </span>
                    </div>
                  )
                  : (
                    <div className="flex flex-row items-center bg-background text-foreground p-1 rounded-lg text-xs line-clamp-1">
                      <BiMoney className="mx-2" size={15} />
                      <span>
                        {courseData?.isFree? 'Free' : 'Price not available'}
                      </span>
                    </div>
                  )
                }
              </>
            
            }
            </CardContent>
          )}
        </CardOverflow>
      </Card>
    // </Link>
  );
}
