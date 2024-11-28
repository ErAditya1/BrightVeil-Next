'use client'
import * as React from 'react';
import Stack from '@mui/joy/Stack';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import { Box, IconButton, Input, ListItemButton } from '@mui/joy';
import List from '@mui/joy/List';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ChatListItem from './ChatListItem';
import NewChatListItem from './NewChatListItem';

import api from '@/api';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import Typing from './Typing';
import { TbUsersGroup } from "react-icons/tb";
import GroupListItem from './GroupListItem';
import { FaCamera } from 'react-icons/fa6';
import { toast } from '@/components/ui/use-toast';
import { addNewChat } from '@/store/chat/chatSlice';
import ValidatedImage from '@/components/ValidatedImage';
import SidebarTop from '@/components/SidebarTop';
import { IoLogoWechat } from 'react-icons/io5';
import { MdDisabledByDefault } from 'react-icons/md';




export default function ChatsPane({ handleSlide }: any) {


  const dispatch = useAppDispatch()
  const { chats, users } = useAppSelector((state) => state.chat)

  const [filteredChats, setFilteredChat] = React.useState(chats);

  const [filterNewChats, setFilterNewChat] = React.useState(users);
  const [isAddNew, setIsAddNew] = React.useState(true);
  const [isGroupCreating, setIsGroupCreating] = React.useState(false)
  const [selectedUsers, setSelectedUsers] = React.useState([]);
  const [groupName, setGroupName] = React.useState('')
  const [groupAvatar, setGroupAvatar] = React.useState<File>()
  const [groupAvatarUrl, setGroupAvatarUrl] = React.useState('')
  const [isCreating, setIsCreating] = React.useState(false)

  React.useEffect(() => {
    setFilteredChat(chats)
    setFilterNewChat(users)
    if (chats.length > 0) sortChats(chats)
    if (chats.length === 0) {
      setIsAddNew(true)
    } else {
      setIsAddNew(false)
    }

  }, [chats, users])

  const sortChats = (chats: any) => {

    let ch = [...chats]
    ch.sort((a: any, b: any) => {
      const dateA = new Date(a?.lastMessage?.updatedAt).getTime();
      const dateB = new Date(b?.lastMessage?.updatedAt).getTime();
      if (dateA < dateB) {
        return 1;
      }
      if (dateA > dateB) {
        return -1;
      }
      return 0;
    });
    // dispatch(addChats(ch));
    setFilteredChat(ch)
    // return ch
  }

  // user selection for group
  const toggleUserSelection = (userId: any) => {
    setSelectedUsers((prevSelected: any) =>
      prevSelected.includes(userId)
        ? prevSelected.filter((id: string) => id !== userId)
        : [...prevSelected, userId]
    );
  };
  //  create group with selected user
  const handleCreateGroup = () => {

    if(isCreating) return
    if (selectedUsers.length > 1) {

      if (groupName.length < 3) {
        toast({
          title: 'Error',
          description: 'Group name should be at least 3 characters long.',
          variant: 'destructive'
        })
        return
      }

      setIsCreating(true)

      const formData = new FormData();
      if (groupAvatar) {
        formData.append("avatar", groupAvatar)
      }
      formData.append("name", groupName)

      selectedUsers.forEach((selectedUser) => {
        formData.append(`participants`, selectedUser);
      });

      console.log(formData.get("avatar"));


      api.post(`/v1/chat-app/chats/group`, formData,{
        headers: {
          'Content-Type':'multipart/form-data'
        }

      })
        .then((res) => {
          console.log(res.data.data)
          toast({
            title: 'Group created successfully',
            description: res.data.message,
            variant: 'success'
          })
          dispatch(addNewChat(res.data.data));
          setGroupName('')
          setIsGroupCreating(false)
          setIsAddNew(false)
          setSelectedUsers([]);
          URL.revokeObjectURL(groupAvatarUrl)
          setGroupAvatarUrl('')
          setGroupAvatar(undefined)
          
          
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => {
          setIsCreating(false)
        })


    } else {
      toast({
        title: 'Error',
        description: 'You need to select at least two users to create a group.',
        variant: 'destructive'
      })
    }
  };


  const chatFilter = (e: any) => {
    const searchValue = e.target.value.toLowerCase()
   

    const value = chats?.filter((chat) => {
      return chat.name?.toLocaleLowerCase().includes(searchValue)
    })

    setFilteredChat(value)

    const value2 = users?.filter((chat) => {
      return chat?.name?.toLocaleLowerCase()?.includes(searchValue) || chat?.username?.toLocaleLowerCase()?.includes(searchValue)
    })
    setFilterNewChat(value2)
  }
  const addNewFilter = (e: any) => {

    const searchValue = e.target.value.toLowerCase()
    const value = users?.filter((chat:any) => {
      return chat.name?.toLocaleLowerCase()?.includes(searchValue) || chat.username.toLocaleLowerCase().includes(searchValue)
    })

    setFilterNewChat(value)
  };


  return (
    <Sheet
      sx={{
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid',
        borderColor: 'divider',
        overflowY: 'auto',
      }}
      className="dark:bg-card h-full xs:h-dvh "
    >
      {
        chats?.length || users?.length ?
          <div>
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              justifyContent="space-between"
              p={2}
              pb={1.5}
            >


              <SidebarTop />
              <IconButton variant="soft" color="primary" size="sm" className='flex justify-center items-center gap-2'>
                {
                  isAddNew || isGroupCreating ? <MdDisabledByDefault size={23} className='cursor-pointer' onClick={() => {
                    setIsAddNew(!isAddNew)
                    setIsGroupCreating(false)

                  }} />
                    :
                    <IoLogoWechat size={23} className='cursor-pointer' onClick={() => {
                      setIsAddNew(!isAddNew)
                      setIsGroupCreating(false)

                    }} />
                }
              </IconButton>



              {/* <Dropdown>
                <MenuButton><MoreVertRoundedIcon /></MenuButton>
                <Menu>
                  <MenuItem > Theme </MenuItem>
                </Menu>
              </Dropdown> */}
            </Stack>
            <Stack>
              {
                isAddNew || isGroupCreating ?
                  <Stack>
                    {
                      isGroupCreating ?
                        <div className="">
                          <Box sx={{ px: 2, pb: 1.5 }}>
                            <Input
                              size="sm"
                              startDecorator={<SearchRoundedIcon />}
                              placeholder="Search"
                              aria-label="Search"
                              onChange={addNewFilter}
                            />
                          </Box>

                          <List
                            sx={{
                              py: 0,
                              '--ListItem-paddingY': '0.75rem',
                              '--ListItem-paddingX': '1rem',
                            }}
                          >

                            {
                              selectedUsers?.length > 1 &&
                              <Box className="">

                                <Box className=" p-4 border-b gap-4">
                                  <div className=''>

                                    {
                                      groupAvatarUrl ?
                                        <label htmlFor="group-icon" className='flex  items-center gap-4 cursor-pointer'>
                                          <div className='h-10 w-10 rounded-full relative'>
                                            <ValidatedImage
                                              loading="lazy"
                                              width={500}
                                              height={500}
                                              src={groupAvatarUrl} alt="" className='w-full h-full rounded-full' />
                                            <FaCamera className='h-4 w-4 absolute bottom-0 right-0 rounded bg-gray-800 p-[2px]' />
                                          </div>


                                          <p>Add Group Icon(Optional)</p>
                                        </label>
                                        :
                                        <label htmlFor="group-icon" className='flex  items-center gap-4 cursor-pointer'>
                                          <FaCamera className='h-10 w-10 rounded-full bg-gray-600 p-2' />
                                          <p>Add Group Icon(Optional)</p>
                                        </label>
                                    }


                                    <input type="file" id='group-icon' className='hidden' onChange={(e: any) => {
                                      setGroupAvatar(e.target?.files[0])
                                      setGroupAvatarUrl(URL.createObjectURL(e.target?.files[0]))
                                    }} />
                                  </div>
                                  <div className="  my-4">
                                    <label htmlFor="group-name">Provide Group Name</label>

                                    <input
                                      id="group-name"
                                      type="text"
                                      placeholder='Enter Group Name'
                                      className="w-full px-3 py-2 rounded-md text-sm bg-gray-200 dark:bg-popover border my-2"
                                      onChange={(event) => {
                                        setGroupName(event.target.value)
                                      }}
                                    />
                                  </div>
                                  <div className="flex flex-row gap-4 mb-4">
                                    <button disabled={isCreating} type='button' onClick={handleCreateGroup}
                                      className="   bg-green-700 py-2 w-full border  rounded text-center">
                                      <Typography level="title-sm" className="text-md my-auto">Create Group</Typography>
                                    </button>
                                    <button onClick={() => {
                                      setIsGroupCreating(false)
                                      setIsAddNew(true)
                                      setSelectedUsers([])
                                    }
                                    }
                                      className="   bg-popover py-2 w-full border  rounded text-center">
                                      <Typography level="title-sm" className="text-md my-auto">Cancel</Typography>
                                    </button>
                                  </div>
                                </Box>
                              </Box>
                            }
                            <Typography level="title-sm" className="text-xl p-4  border-b">Select Users</Typography>

                            {filterNewChats?.map((chat: any) => (
                              <GroupListItem
                                key={chat._id}
                                toggleUserSelection={toggleUserSelection}
                                selectedUsers={selectedUsers}
                                {...chat}
                              />
                            ))}
                          </List>
                        </div>
                        :
                        <div className="">
                          <Box sx={{ px: 2, pb: 1.5 }}>
                            <Input
                              size="sm"
                              startDecorator={<SearchRoundedIcon />}
                              placeholder="Search"
                              aria-label="Search"
                              onChange={addNewFilter}
                            />
                          </Box>

                          <List
                            sx={{
                              py: 0,
                              '--ListItem-paddingY': '0.75rem',
                              '--ListItem-paddingX': '1rem',
                            }}
                          >

                            <ListItemButton

                              onClick={() => {
                                setIsGroupCreating(true)
                                setIsAddNew(false)
                              }}

                              className='h-16 w-full bg-background flex items-center  border-b'
                            >
                              <Stack direction="row" spacing={1.5}>

                                <Box sx={{ flex: 1 }} className="flex flex-row items-center gap-4">

                                  <TbUsersGroup className='h-10 w-10 rounded-full bg-gray-600 p-2' />

                                  <Typography level="title-sm" className="text-xl">New Group</Typography>
                                </Box>

                              </Stack>

                            </ListItemButton>
                            <Typography level="title-sm" className="text-xl py-4 mx-4 border-b">Select User</Typography>

                            {filterNewChats?.map((chat: any) => (
                              <NewChatListItem
                                handleSlide={handleSlide}
                                key={chat._id}
                                setIsAddNew={setIsAddNew}
                                {...chat}
                              />
                            ))}
                          </List>
                        </div>
                    }
                  </Stack>

                  :
                  <div className="">
                    <Box sx={{ px: 2, pb: 1.5 }}>
                      <Input
                        size="sm"
                        startDecorator={<SearchRoundedIcon />}
                        placeholder="Search"
                        aria-label="Search"
                        onChange={chatFilter}
                      />
                    </Box>

                    <List
                      sx={{
                        py: 0,
                        '--ListItem-paddingY': '0.75rem',
                        '--ListItem-paddingX': '1rem',
                      }}
                    >
                      {filteredChats?.map((chat: any) => (
                        <ChatListItem
                          handleSlide={handleSlide}
                          key={chat._id}
                          {...chat}
                        />
                      ))}
                      {/* <hr />
                      {filterNewChats?.map((chat: any) => (
                        <NewChatListItem
                          key={chat._id}
                          {...chat}
                        />
                      ))} */}
                    </List>
                  </div>
              }
            </Stack>

          </div>
          :
          <div className='h-full w-full flex justify-center items-center bg-background'>
            <Typing />
          </div>
      }
    </Sheet>
  );
}