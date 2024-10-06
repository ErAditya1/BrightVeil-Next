"use client"
import React, { FormEvent, useEffect, useState } from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormHelperText from '@mui/joy/FormHelperText';
import IconButton from '@mui/joy/IconButton';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardOverflow from '@mui/joy/CardOverflow';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded';
import VideocamRoundedIcon from '@mui/icons-material/VideocamRounded';
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';

import DropZone from './DropZone';
import EditorToolbar from './EditorToolbar';
import { toast } from '@/components/ui/use-toast';
import api from '@/api';
import { AxiosError } from 'axios';
import { ApiResponse } from '@/types/ApiResponse';
import { useSession } from 'next-auth/react';
import { Loader2, Save } from 'lucide-react';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateProfileSchema } from '@/schemas/updateProfileSchema';
import { z } from 'zod';
import { useDebounce } from 'usehooks-ts';
import BottomGradient from '@/components/BottomGradient';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';


export default function EditProfile() {
  const user = useSession()?.data?.user
  const [avatar, setAvatar] = useState("");
  const [cover, setCover] = useState("");
  const [username, setUsername] = useState('');
  const [usernameMessage, setUsernameMessage] = useState('');
  const [suggestUsername, setSuggestUsername] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const debouncedUsername = useDebounce(username, 1000);

  const form = useForm<z.infer<typeof updateProfileSchema>>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: user?.name,
      mobileNumber: user?.mobileNumber,
      username: user?.username,
      about: user?.about,

    }
  })

  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (debouncedUsername) {
        setIsCheckingUsername(true);
        setUsernameMessage(''); // Reset message
        try {

          const response = await api.get<ApiResponse>(
            `/v1/users/check-username/?username=${debouncedUsername}`);

          if (response?.data) {
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

  const avatarChangeHandler = (event: any) => {
    event.preventDefault();
    setAvatar(event.target.files[0]);
  };
  const coverChangeHandler = (event: any) => {
    event.preventDefault();
    setCover(event.target.files[0]);
  };
  const updateAvatar = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    console.log(avatar)
    formData.append("avatar", avatar);
    console.log(formData);


    try {
      const res = await api.patch("/v1/users/avatar", formData, {
        headers: {
          "Authorization": `Bearer ${user?.accessToken}`
        }
      });
      if (res) {
        setAvatar("");
        toast({
          title: 'Update Avatar image success',
          description: res.data.message,
          variant: 'success',
        });
        return res.data.message;
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      let errorMessage = axiosError.response?.data.message;
      toast({
        title: 'Update cover image failed',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  };
  const updateCover = async (event: any) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("coverImage", cover);

    try {
      const res = await api.patch("/v1/users/cover-image", formData);
      if (res) {
        setCover("");
        toast({
          title: 'Update cover image success',
          description: res.data.message,
          variant: 'success',
        });
        return res.data.message;
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      let errorMessage = axiosError.response?.data.message;
      toast({
        title: 'Update cover image failed',
        description: errorMessage,
        variant: 'destructive',
      });
    }

  };

  const submit = async (data: z.infer<typeof updateProfileSchema>) => {
    console.log(data)
    setIsSubmitting(true);

    try {
      const res = await api.patch('/v1/users/update-account', data, {
        headers: {
          "Authorization": `Bearer ${user?.accessToken}`
        }
      })
      if (res) {
        toast({
          title: 'Update profile success',
          description: res.data.message,
          variant: 'success',
        });
        setIsSubmitting(false)
      }
    } catch (error) {

      setIsSubmitting(false);
      const axiosError = error as AxiosError<ApiResponse>;

      let errorMessage = axiosError.response?.data.message;

      toast({
        title: 'Update profile failed',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  };





  return (
    <Box sx={{ flex: 1, width: '100%' }}>

      <Stack
        spacing={4}
        sx={{
          display: 'flex',
          maxWidth: '800px',
          mx: 'auto',
          px: { xs: 2, md: 6 },
          py: { xs: 2, md: 3 },
        }}
      >
        <Card className="dark:bg-slate-900">
          <Box sx={{ mb: 1 }}>
            <Typography level="title-md">Personal info</Typography>
            <Typography level="body-sm">
              Customize how your profile information will apper to the networks.
            </Typography>
          </Box>
          <Divider />
          <Form {...form} >
            <form onSubmit={form.handleSubmit(submit)}>
              <Stack
                direction="row"
                spacing={3}
                sx={{ display: { xs: 'none', md: 'flex' }, my: 1 }}
              >

                <Stack direction="column" spacing={1}>
                  <Typography className="text-center">
                    {user?.name}
                  </Typography>

                  {
                    user?.avatar?.url ? (
                      <AspectRatio
                        ratio="1"
                        maxHeight={200}
                        sx={{ flex: 1, minWidth: 120, borderRadius: '100%' }}
                      >
                        <Image
                          src={user?.avatar?.url}
                          loading="lazy"
                          width={500}
                          height={500}
                          alt=""
                        />
                      </AspectRatio>
                    ) : (<AspectRatio
                      ratio="1"
                      maxHeight={200}
                      sx={{ flex: 1, minWidth: 120, borderRadius: '100%' }}
                    >
                      <Typography className=" text-4xl bg-card text-card-foreground">
                        {user?.name?.slice(0, 1)}
                      </Typography>
                    </AspectRatio>)
                  }





                </Stack>

                <Stack spacing={2} sx={{ flexGrow: 1 }}>

                  <Stack spacing={1}>
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
                  </Stack>
                  <Stack direction="row" spacing={2}>
                    <Stack spacing={1}>
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
                    </Stack>
                    <Stack spacing={1}>
                      <FormField
                        name="mobileNumber"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className='text-foreground'>Mobile Number</FormLabel>
                            <Input {...field} name="mobileNumber" />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </Stack>
                  </Stack>
                  <Stack spacing={2} sx={{ my: 1 }}>
                    <FormField
                      name="about"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='text-foreground'>About</FormLabel>
                          <Textarea
                            {...field}
                            name='about'
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormHelperText sx={{ mt: 0.75, fontSize: 'xs' }}>
                      Max 200 characters
                    </FormHelperText>
                  </Stack>



                </Stack>

              </Stack>
              <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>

                  <Button type="submit" className='w-full' disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Please wait
                      </>
                    ) : (
                      <>
                        Save
                      </>
                    )}
                  </Button>
                </CardActions>
              </CardOverflow>
            </form>
          </Form>


        </Card>
        <Card className="dark:bg-slate-900">
          <Box sx={{ mb: 1 }}>
            <Typography level="title-md">Bio</Typography>
            <Typography level="body-sm">
              Write a short introduction to be displayed on your profile
            </Typography>
          </Box>
          <Divider />
          <Stack spacing={2} sx={{ my: 1 }}>
            <EditorToolbar />
            <Textarea
              defaultValue="I'm a software developer based in Bangkok, Thailand. My goal is to solve UI problems with neat CSS without using too much JavaScript."
            />
            <FormHelperText sx={{ mt: 0.75, fontSize: 'xs' }}>
              275 characters left
            </FormHelperText>
          </Stack>
          <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
            <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
              <Button size="sm" variant="outlined" color="neutral">
                Cancel
              </Button>
              <Button size="sm" variant="solid">
                Save
              </Button>
            </CardActions>
          </CardOverflow>
        </Card>
        <Card className="dark:bg-slate-900">
          <Box sx={{ mb: 1 }}>
            <Typography level="title-md">Portfolio projects</Typography>
            <Typography level="body-sm">
              Share a few snippets of your work.
            </Typography>
          </Box>
          <Divider />
          <Stack spacing={2} sx={{ my: 1 }}>
            <DropZone />

          </Stack>
          <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
            <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
              <Button size="sm" variant="outlined" color="neutral">
                Cancel
              </Button>
              <Button size="sm" variant="solid">
                Save
              </Button>
            </CardActions>
          </CardOverflow>
        </Card>
      </Stack>
    </Box>
  );
}