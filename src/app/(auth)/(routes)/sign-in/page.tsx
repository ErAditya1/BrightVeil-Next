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

export default function SignInForm() {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
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
    setIsSubmitting(true);

    try {


      const result = await api.post('/v1/users/login', {
        identifier: data.identifier,
        password: data.password,
      });



      const user = result.data.data.user
      user.accessTokenExpires = currentTime + (1000 * 60 * 60);
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


      const result = await api.get('/v1/google');
      console.log(result)

      //>> Here  I am providing the server google oauth url directlu then it's working

      // const redirectUrl = process.env.NODE_ENV === 'production' ? `${process.env.NEXT_PUBLIC_SERVER_URI}/v1/users/google` : 'http://localhost:8000/api/v1/users/google';

      // window.location.href = `${redirectUrl}`


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

      const redirectUrl = process.env.NODE_ENV === 'production' ? `${process.env.NEXT_PUBLIC_SERVER_URI}/v1/users/github` : 'http://localhost:8000/api/v1/users/github';

      window.location.href = `${redirectUrl}`
      // Handle the result from Google OAuth
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
            <Image
              src='/brightveilDark.jpg'
              alt="brightveil logo"
              width={120}
              height={120}
              className=" w-full h-full rounded-full p-2 hidden dark:block"
            />
            <Image
              src='/brightveilLight.jpg'
              alt="brightveil logo"
              width={120}
              height={120}
              className=" w-full h-full rounded-full p-2 block dark:hidden"
            />
          </div>
          <h1 className="text-4xl font-extrabold text-foreground tracking-tight lg:text-5xl mb-6">
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
          <Link href='/forget-password' className='text-blue-500 cursor-pointer'>
            Fargot Passward!
          </Link>
        </div>
        <div className="text-center mt-4">
          <p>
            Not a member yet?{' '}
            <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">
              Sign up
            </Link>
          </p>
        </div>
        <div className="text-center mt-2 flex justify-evenly ">
          
            <Link href="/privacy-policy" className="text-blue-600 hover:text-blue-800">
              Privacy Policy
            </Link>
            <Link href="/terms-services" className="text-blue-600 hover:text-blue-800">
              Terms & Services
            </Link>
          
        </div>
      </div>
    </div>
  );
}
