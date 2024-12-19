'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { signInSchema } from '@/schemas/signInSchema';
import { useEffect, useState } from 'react';
import { EyeIcon, EyeOff, Loader2 } from 'lucide-react';
import BottomGradient from '@/components/BottomGradient';
import api from '@/api';
import { ApiResponse } from '@/types/ApiResponse';
import { AxiosError } from 'axios';
import { useAppDispatch } from '@/store/hooks';
import { loginUser } from '@/store/user/userSlice';
import { BsGithub, BsGoogle } from 'react-icons/bs';
import ValidatedImage from '@/components/ValidatedImage';
import Image from 'next/image';
import { Icons } from '@/components/icons';


const getOSDetails = () => {
  const userAgent = navigator.userAgent;
  let os = 'Unknown OS';

  if (userAgent.indexOf('Win') !== -1) os = 'Windows';
  if (userAgent.indexOf('Mac') !== -1) os = 'macOS';
  if (userAgent.indexOf('X11') !== -1) os = 'UNIX';
  if (userAgent.indexOf('Linux') !== -1) os = 'Linux';
  if (userAgent.indexOf('Android') !== -1) os = 'Android';
  if (userAgent.indexOf('iPhone') !== -1 || userAgent.indexOf('iPad') !== -1) os = 'iOS';

  return os;
};

const getDeviceInfo = () => {
  const os = getOSDetails();
  const language = navigator.language;
  const screen = `${window.screen.width}x${window.screen.height}`;
  return { os, language, screen };
};

const getGeoLocation = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        resolve({
          latitude: position.coords.latitude || '',
          longitude: position.coords.longitude  || '',
        });
      }, reject);
    } else {
      reject("Geolocation not available");
    }
  });
};







export default function SignInForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [showPassword, setShowPassword] = useState(false)
  useEffect(() => { setCurrentTime(Date.now()) }, [])





  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  const { toast } = useToast();

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    // const geo = await getGeoLocation();
    const deviceInfo = getDeviceInfo();

   

    setIsSubmitting(true);

    try {

      const result = await api.post('/v1/users/login', {
        identifier: data.identifier,
        password: data.password,
        deviceType: deviceInfo.os,
        language: deviceInfo.language,
        screen: deviceInfo.screen,
      });


      console.log(result)
      const user = result.data.data.user
      user.accessTokenExpires = currentTime + (1000 * 60 * 60);
      user.accessToken = result.data.data.accessToken;
      user.refreshToken = result.data.data.refreshToken;
      console.log(user);
      dispatch(loginUser(user))
      localStorage.setItem('BrightVeilUser', JSON.stringify(user));

      setIsSubmitting(false);
      toast({

        title: 'Login Successful',
        description: result?.data?.message,
        variant: 'success',
      })
      router.push('/');

    } catch (error) {

      console.error('Error during sign-up:', error);

      const axiosError = error as AxiosError<ApiResponse>;

      // Default error message
      let errorMessage = axiosError.response?.data.message;


      toast({
        title: 'Login Failed',
        description: errorMessage,
        variant: 'destructive',
      });

      setIsSubmitting(false);
    }
  };

  const loginWithGoogle = async () => {
    try {


      // const result = await api.get('/v1/users/google');
      // console.log(result)

      //>> Here  I am providing the server google oauth url directlu then it's working

      const redirectUrl = process.env.NODE_ENV === 'production' ? `${process.env.NEXT_PUBLIC_SERVER_URI || 'https://lms-backend-mh2d.onrender.com/api'}/v1/users/google` : 'http://localhost:8000/api/v1/users/google';

      window.location.href = `${redirectUrl}`


    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: 'Google Login Failed',
        description: axiosError?.response?.data.message,
        variant: 'destructive',
      })
      console.error('Error during Google login:', error);
      // Handle the error during Google OAuth
    }
  }
  const loginWithGithub = async () => {
    try {
      // const result = await api.get('/v1/users/github',{
      //   withCredentials: true,
      // });
      // console.log(result);

      const redirectUrl = process.env.NODE_ENV === 'production' ? `${process.env.NEXT_PUBLIC_SERVER_URI || 'https://lms-backend-mh2d.onrender.com/api'}/v1/users/github` : 'http://localhost:8000/api/v1/users/github';

      window.location.href = `${redirectUrl}`

    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;

      toast({
        title: 'Github Login Failed',
        description: axiosError?.response?.data.message,
        variant: 'destructive',
      })
      console.error('Error during Github login:', error);
      // Handle the error during Google OAuth
    }
  }


  return (
    <div className="flex justify-center items-center min-h-dvh ">
      <div className="w-full max-w-md p-8 space-y-8 bg-card text-card-foreground  border-2 rounded-lg shadow-md">
        <div className="text-center flex justify-center flex-col items-center">
          <div className='w-20 h-20 rounded-full border-2 flex justify-center items-center'>
            <Icons.logo/>
          </div>
          <h1 className=" font-extrabold text-foreground tracking-tight text-2xl sm:text-4xl lg:text-5xl mb-6">
            Welcome Back to BrightVeil
          </h1>
          <p className="mb-4">Sign in to continue your secret conversations</p>
        </div>
        <div className="flex flex-row gap-2 ">
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full bg-background rounded-md h-10 font-medium shadow-input  dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            onClick={loginWithGithub}
          >
            <BsGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />

            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              GitHub
            </span>

            <BottomGradient />

          </button>
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full  rounded-md h-10 font-medium shadow-input bg-background dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"

            onClick={loginWithGoogle}
          >

            <BsGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />

            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              Google
            </span>

            <BottomGradient />

          </button>

        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="identifier"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email/Username</FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem className='relative'>
                  <FormLabel>Password</FormLabel>
                  <Input type={showPassword ? "text" : 'password'} {...field} />
                  <span className="text-gray-400 hover:text-gray-600 cursor-pointer absolute right-2 bottom-2" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff /> : <EyeIcon />}
                  </span>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className='w-full' disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                'Sign In'

              )}
              <BottomGradient />
            </Button>
          </form>
        </Form>
        <div className="float-right">
          <Link href='/auth/forget-password' className='text-blue-500 cursor-pointer'>
            Fargot Passward!
          </Link>
        </div>
        <div className="text-center mt-4">
          <p>
            Not a member yet?
            <Link href="/auth/sign-up" className="text-blue-600 hover:text-blue-800">
              Sign up
            </Link>
          </p>
        </div>
        
      </div>
    </div>
  );
}
