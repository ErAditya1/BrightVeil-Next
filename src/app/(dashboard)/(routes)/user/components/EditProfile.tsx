"use client"
import React, { FormEvent, useEffect, useState } from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormHelperText from '@mui/joy/FormHelperText';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardOverflow from '@mui/joy/CardOverflow';
import DropZone from './DropZone';
import EditorToolbar from './EditorToolbar';
import { toast } from '@/components/ui/use-toast';
import api from '@/api';
import { AxiosError } from 'axios';
import { ApiResponse } from '@/types/ApiResponse';
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
import ValidatedImage from '@/components/ValidatedImage';
import { updateUser } from '@/store/user/userSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { FaCamera } from 'react-icons/fa6';
import { MdOutlineCancel } from 'react-icons/md';


export default function EditProfile() {
  const user = useAppSelector(state => state.auth.user);
  const dispatch = useAppDispatch();
  const [avatar, setAvatar] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [cover, setCover] = useState(null);
  const [coverUrl, setCoverUrl] = useState("");
  const [username, setUsername] = useState('');
  const [usernameMessage, setUsernameMessage] = useState('');
  const [suggestUsername, setSuggestUsername] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const debouncedUsername = useDebounce(username, 1000);

  const [avatarUploading, setAvatarUploading] = useState(false);
  const [coverUploading, setCoverUploading] = useState(false);

  const form = useForm<z.infer<typeof updateProfileSchema>>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: user?.name,
      mobileNumber: user?.mobileNumber,
      username: user?.username,
      about: user?.about,
      email: user?.email

    }
  })


  useEffect(() => {
    setAvatarUrl(user?.avatar?.url!);
    setCoverUrl(user?.coverImage?.url!);
  }, [user])
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


  const updateAvatar = async () => {
    setAvatarUploading(true)
    const formData = new FormData();

    if (!avatar) return

    formData.append("avatar", avatar);



    try {
      const res = await api.patch("/v1/users/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });
      if (res) {
        setAvatar(null);
        console.log(res.data);
        URL.revokeObjectURL(avatarUrl);
        setAvatarUrl(res.data.data?.avatar?.url);
        dispatch(updateUser(res.data.data));
        toast({
          title: 'Update Avatar image success',
          description: res.data.message,
          variant: 'success',
        });

      }
      setAvatarUploading(false)
    } catch (error) {
      setAvatarUploading(false)
      const axiosError = error as AxiosError<ApiResponse>;
      console.log(error)
      let errorMessage = axiosError.response?.data.message;
      toast({
        title: 'Update avatar image failed',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  };

  const updateCover = async () => {
    setCoverUploading(true)

    const formData = new FormData();
    if (!cover) return

    formData.append("coverImage", cover);


    try {
      const res = await api.patch("/v1/users/cover-image", formData);
      if (res) {
        setCover(null);
        setCoverUrl(res.data.data.coverImage.url);
        toast({
          title: 'Update cover image success',
          description: res.data.message,
          variant: 'success',
        });
      }
      setCoverUploading(false)
    } catch (error) {
      setCoverUploading(false)
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
        console.log(res.data.data)
        dispatch(updateUser(res.data.data));
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
          px: { xs: 0, md: 6 },
          py: { xs: 2, md: 3 },
        }}
      >
        <Card className="dark:bg-slate-900 p-0" >
          <Box sx={{ mb: 1 }}>
            <Typography level="title-md">Personal info</Typography>
            <Typography level="body-sm">
              Customize how your profile information will apper to the networks.
            </Typography>
          </Box>
          <Divider />
          <div className="relative h-48 select-none mb-4">


            {
              coverUrl ? (
                <div className="w-full h-full relative">
                  <ValidatedImage
                    src={coverUrl}
                    alt="Profile"
                    height={500}
                    width={500}
                    className="rounded-2 border-2 border-foreground w-full h-full"
                  />
                  {
                    cover &&
                    <div className="border bg-background cursor-pointer text-foreground rounded-full absolute top-2 right-2" onClick={() => {
                      setCover(null)
                      URL.revokeObjectURL(coverUrl)
                      setCoverUrl(user?.coverImage?.url || '')
                    }}>
                      <MdOutlineCancel size={18} className="text-foreground" />
                    </div>
                  }
                  <label htmlFor="cover" >

                    <FaCamera size={20} className="text-foreground absolute bottom-2 right-2 cursor-pointer" />
                  </label>
                  <input type="file" accept="image/png, image/gif, image/jpeg ,image/jpg" id='cover' className='hidden' onChange={(e: any) => {
                    setCover(e.target.files[0])
                    const url = URL.createObjectURL(e.target.files[0])
                    setCoverUrl(url)
                  }} />
                </div>
              ) : (

                <div className="border h-full w-w-full rounded-2 flex justify-center items-center">
                  <label htmlFor="cover">
                    <FaCamera size={32} className="text-foreground cursor-pointer" />
                  </label>
                  <input type="file" accept="image/png, image/gif, image/jpeg ,image/jpg" id='cover' className='hidden' onChange={(e: any) => {
                    setCover(e.target.files[0])
                    const url = URL.createObjectURL(e.target.files[0])
                    setCoverUrl(url)
                  }} />
                </div>
              )
            }


            {
              cover && (
                <div className="text-center my-2">
                  <Button className="mt-4" onClick={updateCover} disabled={coverUploading}>
                    {coverUploading ? 'Uploading...' : 'Update Cover'}
                  </Button>
                </div>
              )
            }
            {/* Profile Photo */}
            <div className="absolute -bottom-12 left-4">

              {
                avatarUrl ? (
                  <div className="w-full h-full relative">
                    <ValidatedImage
                      src={avatarUrl}
                      alt="Profile"
                      height={500}
                      width={500}
                      className="rounded-full border-4 border-foreground w-24 h-24"
                    />
                    {
                      avatar &&
                      <div className="  bg-background text-foreground rounded-full cursor-pointer absolute top-2 right-2" onClick={() => {
                        setAvatar(null)
                        URL.revokeObjectURL(avatarUrl)
                        setAvatarUrl(user?.avatar?.url || '')
                      }}>
                        <MdOutlineCancel size={18} className="text-foreground" />
                      </div>
                    }
                    <label htmlFor="avatar">

                      <FaCamera size={20} className="text-foreground absolute bottom-0 right-0 cursor-pointer" />
                    </label>
                    <input type="file" accept="image/png, image/gif, image/jpeg ,image/jpg" id='avatar' className='hidden' onChange={(e: any) => {
                      setAvatar(e.target.files[0])
                      console.log(e.target.files[0])  // Preview the image in the input field for the user.)
                      setAvatarUrl(URL.createObjectURL(e.target.files[0]))
                    }} />
                  </div>
                ) : (

                  <div className="border h-24 w-24 rounded-full flex justify-center items-center">
                    <label htmlFor="avatar">
                      <FaCamera size={32} className="text-foreground cursor-pointer" />
                    </label>
                    <input type="file" accept="image/png, image/gif, image/jpeg ,image/jpg" id='avatar' className='hidden' onChange={(e: any) => {
                      setAvatar(e.target.files[0])
                      const url = URL.createObjectURL(e.target.files[0])
                      console.log(url)  // Preview the image in the input field for the user.)
                      setAvatarUrl(url)
                    }} />
                  </div>
                )
              }

            </div>
            {
              avatar && (
                <div className="text-center my-2">
                  <Button className="mt-4" onClick={updateAvatar} disabled={avatarUploading}>
                    {avatarUploading ? 'Uploading...' : 'Update Avatar'}
                  </Button>
                </div>
              )
            }
          </div>
          <Form {...form} >
            <form onSubmit={form.handleSubmit(submit)}>
              <Stack
                direction="row"
                spacing={3}
                sx={{ display: {  md: 'flex' }, my: 4 }}
                className="flex-col"
              >

                <Stack direction="column" spacing={1}>


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
                  <Stack  spacing={2} className="flex flex-row w-full">
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
                  <Stack spacing={1}>
                      <FormField
                        name="email"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className='text-foreground'>Email:</FormLabel>
                            <Input {...field} name="email" />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
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

      </Stack>
    </Box>
  );
}