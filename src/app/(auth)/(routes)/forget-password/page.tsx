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
import { forgetSchema } from '@/schemas/signInSchema';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import BottomGradient from '@/components/BottomGradient';
import api from '@/api';
import { ApiResponse } from '@/types/ApiResponse';
import { AxiosError } from 'axios';

export default function RequestPasswordForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof forgetSchema>>({
    resolver: zodResolver(forgetSchema),
    defaultValues: {
      identifier: '',
    },
  });

  const { toast } = useToast();

  const onSubmit = async (data: z.infer<typeof forgetSchema>) => {
    setIsSubmitting(true);

    try {

      const res = await api.post('/v1/users/request-reset-password',data);
      console.log(res)
      if(res){
        toast({
          title: 'Success',
          description: res.data.message,
          variant:'success',
        });
        
      }
      setIsSubmitting(false);
    } catch (error) {

      console.log(error);

      const axiosError = error as AxiosError<ApiResponse>;

      // Default error message
      let errorMessage = axiosError.response?.data.message;
      

      toast({
        title: 'Request faild',
        description: errorMessage,
        variant: 'destructive',
      });

      setIsSubmitting(false);
    }
  };

  return (
    
    <div className="flex justify-center items-center min-h-dvh ">
      <div className="w-full max-w-md p-8 space-y-8 bg-card text-card-foreground  border-2 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-foreground tracking-tight lg:text-5xl mb-6">
            Reset Pasword
          </h1>
          <p className="mb-4">Sign in to continue your secret conversations</p>
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
            
            <Button type="submit" className='w-full' disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                'Send Request'

              )}
              <BottomGradient />
            </Button>
          </form>
        </Form>
        
        <div className="text-center mt-4">
          <p>
            Not a member yet?{' '}
            <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">
              Sign up
            </Link>
          </p>
          <p>
            <Link href="/sign-in" className="text-blue-600 hover:text-blue-800">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
