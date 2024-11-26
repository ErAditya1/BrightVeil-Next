'use client';

import React, { Suspense, useEffect, useMemo, useState } from 'react';
import { FaSpinner } from 'react-icons/fa6';
import { MdOutlineCloudOff } from 'react-icons/md';
import { toast } from '@/components/ui/use-toast';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loginUser, logoutUser } from '@/store/user/userSlice';
import { AxiosError } from 'axios';
import api from '@/api';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

// Loading Screen Component
export function LoadingScreen({ message }: { message: string }) {
  return (
    <div className="bg-background text-foreground h-dvh w-screen flex justify-center items-center m-0 p-0">
      <FaSpinner className="animate-spin mx-4" size={50} />
      {message}
    </div>
  );
}

// No Network Screen Component
function NoNetworkScreen() {
  return (
    <div className="bg-background text-foreground h-dvh w-screen flex justify-center items-center m-0 p-0 text-sm sm:text-md">
      <MdOutlineCloudOff className="mx-4" size={50} />
      No Network Connection...
    </div>
  );
}

// Page Component
function Page({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();

  const accessToken = useMemo(() => {
    return searchParams.get('accessToken');
  }, [searchParams]);

  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  const [loading, setLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(true);
  const [showOffline, setShowOffline] = useState(false);

  const isPublicPath = useMemo(
    () =>
      ['/sign-in', '/sign-up', '/verify', '/reset-password', '/forget-password'].some((path) =>
        pathname.startsWith(path),
      ),
    [pathname],
  );

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    setIsOnline(navigator.onLine);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Show "offline" message after a delay
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (!isOnline) {
      timeout = setTimeout(() => setShowOffline(true), 3000);
    } else {
      setShowOffline(false);
    }
    return () => clearTimeout(timeout);
  }, [isOnline]);

  // Authentication logic
  useEffect(() => {


    api
      .get('/v1/users/current-user', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        const user = response.data.data;
        if (accessToken) {


          localStorage.setItem('BrightVeilUser', JSON.stringify(user));
        }
        dispatch(loginUser(user));
        if (isPublicPath) router.push('/');
      })
      .catch((error) => {
        const axiosError = error as AxiosError<AxiosError>;
        if (!isPublicPath) {
          toast({
            title: 'Authentication Failed',
            description: axiosError.response?.data?.message || 'Error occurred',
            variant: 'destructive',
          });
          router.push('/sign-in');
        }
        dispatch(logoutUser());
      })
      .finally(() => setLoading(false));

    if (!isOnline) {
      toast({
        title: 'No Internet Connection',
        description: 'Check your network and try again.',
        variant: 'warning',
      });
    }
  }, [accessToken, dispatch, isOnline, isPublicPath, router]);

  // Redirect logged-in users from public paths
  useEffect(() => {
    if (isLoggedIn && isPublicPath) {
      router.replace('/');
    }
  }, [isLoggedIn, isPublicPath, router]);

  // Render loading, offline, or children
  if (loading) return <LoadingScreen message="Verifying..." />;
  if (!isOnline && showOffline) return <NoNetworkScreen />;
  return <>{children}</>;
}

// UserContext Component
export default function UserContext({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<LoadingScreen message="Loading..." />}>
      <Page>{children}</Page>
    </Suspense>
  );
}
