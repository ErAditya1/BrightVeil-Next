'use client';

import { ApiResponse } from '@/types/ApiResponse';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDebounce } from 'usehooks-ts';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { AxiosError } from 'axios';
import { EyeIcon, EyeOff, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signUpSchema } from '@/schemas/signUpSchema';
import BottomGradient from '@/components/BottomGradient';

import api from '@/api';
import { BsGithub, BsGoogle } from 'react-icons/bs';
import Image from 'next/image';

export default function SignUpForm() {
  const [username, setUsername] = useState('');
  const [usernameMessage, setUsernameMessage] = useState('');
  const [suggestUsername, setSuggestUsername] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const debouncedUsername = useDebounce(username, 1000);
  const [showPassword, setShowPassword] = useState(false)

  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (debouncedUsername) {
        setIsCheckingUsername(true);
        setUsernameMessage(''); // Reset message
        try {

          const response = await api.get<ApiResponse>(
            `/v1/users/check-username/?username=${debouncedUsername}`);

          if (response?.data) {
            console.log(response.data.data)
            setSuggestUsername(response.data.data.username);
          }
          setUsernameMessage(response.data.message);
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
          console.log(axiosError)
          setUsernameMessage(
            axiosError.response?.data.message ?? 'Error checking username'
          );
        } finally {
          setIsCheckingUsername(false);
        }
      }
    };
    checkUsernameUnique();
  }, [debouncedUsername]);

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true);

    try {
      const response = await api.post<ApiResponse>('/v1/users/register', data);

      toast({
        title: 'Success',
        description: response.data.message,
        variant: "success"
      });

      router.replace(`/verify/${response.data.data.username}`);

      setIsSubmitting(false);
    } catch (error) {
      console.error('Error during sign-up:', error);

      const axiosError = error as AxiosError<ApiResponse>;

      // Default error message
      let errorMessage = axiosError.response?.data.message;


      toast({
        title: 'Sign Up Failed',
        description: errorMessage,
        variant: 'destructive',
      });

      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-dvh ">
      <div className="w-full max-w-md p-8 space-y-8 bg-card border-2 text-card-foreground rounded-lg shadow-md">
        <div className="text-center flex justify-center flex-col items-center">
          <div className='w-20 h-20 rounded-full border-2 flex justify-center items-center'>
            <Image
              src='/brightveil_dark.jpeg'
              alt="brightveil logo"
              width={120}
              height={120}
              className=" w-full h-full rounded-full p-2 hidden dark:block"
            />
            <Image
              src='/brightveil_light.jpeg'
              alt="brightveil logo"
              width={120}
              height={120}
              className=" w-full h-full rounded-full p-2 block dark:hidden"
            />
          </div>
          <h1 className="text-4xl font-extrabold text-foreground  tracking-tight lg:text-5xl mb-6">
            Join BrightVeil
          </h1>
          <p className="mb-4 text-foreground">Sign up to start your anonymous adventure</p>
        </div>
        <div className="flex flex-row gap-2 ">
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"

          >
            <BsGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />

            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              GitHub
            </span>

            <BottomGradient />

          </button>
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"

          >
            <BsGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />

            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              GitHub
            </span>

            <BottomGradient />

          </button>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-foreground'>Full Name</FormLabel>
                  <Input {...field} name="name" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-foreground'>Username</FormLabel>
                  <Input
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      setUsername(e.target.value);
                    }}
                  />
                  {isCheckingUsername && <Loader2 className="animate-spin" />}
                  {!isCheckingUsername && usernameMessage && (
                    <>
                      <p
                        className={`text-sm ${usernameMessage === 'Username is available'
                          ? 'text-green-500'
                          : 'text-red-500'
                          }`}
                      >
                        {usernameMessage}
                      </p>

                      <>
                        {
                          suggestUsername
                          && <p
                            className={`text-sm text-green-500 float-right`}
                          >
                            Suggested Username: {suggestUsername}
                          </p>
                        }
                      </>
                    </>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-foreground'>Email</FormLabel>
                  <Input {...field} name="email" />
                  <p className='text-muted-foreground text-sm'>We will send you a verification code</p>
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
                <>
                  Sign Up
                  <BottomGradient />
                </>
              )}
            </Button>

          </form>
        </Form>
        <div className="text-center mt-4">
          <p>
            Already a member?{' '}
            <Link href="/sign-in" className="text-blue-600 hover:text-blue-800">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

