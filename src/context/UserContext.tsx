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
// import { messagingInstance, onMessage, requestPermissionAndGetToken } from '../lib/firebase-config';
import { Router } from 'next/router';
import { handleSidebar } from '@/store/setting/settingSlice';


// Loading Screen Component
export function LoadingScreen({ message, className = 'h-dvh w-full ', size=50 }: any) {
  return (
    <div className={`bg-background text-foreground  flex justify-center items-center m-0 p-0 ${className}`}>
      <FaSpinner className="animate-spin mx-4"  size={size}/>
      {message}
    </div>
  );
}

// No Network Screen Component
function NoNetworkScreen() {
  return (
    <div className="bg-background text-foreground h-dvh w-full flex justify-center items-center m-0 p-0 text-sm sm:text-md">
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
  const [token, setToken] = useState('')

  const isPublicPath = useMemo(
    () =>
      ['/sign-in', '/sign-up', '/verify', '/reset-password', '/forget-password'].some((path) =>
        pathname.startsWith(path),
      ),
    [pathname],
  );
  const commanPath = useMemo(
    () =>
      ['/terms-services', '/privacy-policy'].some((path) =>
        pathname.startsWith(path),
      ),
    [pathname],
  );

  useEffect(() => {
    const handleRouteChange = (url: any) => {
      window.gtag('config', 'G-KFBC9X698J', {
        page_path: url,
      });
    };

    // Track route changes (page views)
    Router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);



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


  const getCurrentUser = () => {
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
        if (!isPublicPath && !commanPath) {
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
  }



  // Authentication logic
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('BrightVeilUser');
      const user = storedUser ? JSON.parse(storedUser) : null;
      console.log(user);
      console.log("")

      if (accessToken) {
        getCurrentUser()
      }
      else if (user && user.accessTokenExpires > Date.now()) {
        
          dispatch(loginUser(user));
          setLoading(false);
          if (isPublicPath) router.push('/');
        
      } else {
        getCurrentUser()
      }
      if (user) {
        if (pathname.startsWith('/admin') && user.role !== 'admin') {
          handleAccessDenied();
        } else if (pathname.startsWith('/teacher') && user.role !== 'teacher') {
          handleAccessDenied();
        } else if (pathname.startsWith('/student') && user.role !== 'student') {
          handleAccessDenied();
        }
      }
      function handleAccessDenied() {
        toast({
          title: 'Access Denied',
          description: 'You are not authorized to access this page.',
          variant: 'destructive',
        });
        router.push('/');
      }
    }


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


  useEffect(() => {
    // This code will only run on the client-side (browser)
    if (typeof window !== 'undefined') {
      dispatch(handleSidebar(window.screen.width >= 900));
    }
  }, []);
  useEffect(() => {
    if (isLoggedIn && isOnline) {
      if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
        // requestPermissionAndGetToken()
      };
    }

    // const unsubscribe = onMessage(messagingInstance, (payload: any) => {
    //   console.log('Message received: ', payload);
    //   new Notification(payload.notification?.title || 'Bright Veil', {
    //     body: payload.notification?.body,
    //   });
    // });

    // return () => unsubscribe();
  }, [isLoggedIn, isOnline]);

  if (loading) return <LoadingScreen message="Verifying..." className="h-dvh w-screen" />;
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
