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
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import BottomGradient from '@/components/BottomGradient';
import { IconBrandGithub, IconBrandGoogle } from '@tabler/icons-react';
import api from '@/api';
import { ApiResponse } from '@/types/ApiResponse';
import { AxiosError } from 'axios';
import { signIn } from 'next-auth/react';

export default function SignInForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

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

      const result = await signIn('credentials', {
        redirect: false,
        identifier: data.identifier,
        password: data.password,
      });



      if (result?.error) {
        if (result.error === 'CredentialsSignin') {
          toast({
            title: 'Login Failed',
            description: 'Incorrect username or password',
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Error',
            description: result.error,
            variant: 'destructive',
          });
        }
        setIsSubmitting(false);
      } else {
        setIsSubmitting(false);
        // toast({
        //   title: 'Success',
        //   description: "Logged in successfully",
        //   variant: "success",
        // });
      }

      if (result?.url) {
        router.replace('/message');
      }




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

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="w-full max-w-md p-8 space-y-8 bg-card text-card-foreground  border-2 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-foreground tracking-tight lg:text-5xl mb-6">
            Welcome Back to innovadi
          </h1>
          <p className="mb-4">Sign in to continue your secret conversations</p>
        </div>
        <div className="flex flex-row gap-2 ">
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            onClick={() => {
              signIn('github', {
                callbackUrl: 'http://localhost:3000/',
              });
            }
            }
          >
            <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />

            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              GitHub
            </span>

            <BottomGradient />

          </button>
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            onClick={() => {
              signIn('google', {
                callbackUrl: 'http://localhost:3000/',
              })
            }
            }
          >

            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />

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
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <Input type="password" {...field} />
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
          <p className='text-blue-500 cursor-pointer'>
            Fargot Passward!
          </p>
        </div>
        <div className="text-center mt-4">
          <p>
            Not a member yet?{' '}
            <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
