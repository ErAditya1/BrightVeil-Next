'use client'
import React, { Suspense, useEffect, useRef, useState } from 'react';
import Sheet from '@mui/joy/Sheet';
import ChatsPane from '../../components/ChatsPane';
import MessagesPane from '../../components/MessagesPane';
import { useSocket } from '@/context/SocketContext';

import { toast } from '@/components/ui/use-toast';
import { ChatListItemInterface, ChatMessageInterface } from '@/interfaces/chat';
import api from '@/api';
import { LocalStorage } from '@/utils';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addChatLastMessage, addChats, addMessages, addNewChat, addReceivedMessage, addUnreadCount, addUsers, clearMessages, deleteChat, deliveredMessage, otherStartTyping, otherStopTyping, removeDeletedMessage, selectChat, stopTyping, updateUserOnline } from '@/store/chat/chatSlice';
import { useSearchParams } from 'next/navigation';
import { AxiosError } from 'axios';
import { ApiResponse } from '@/types/ApiResponse';
import Image from 'next/image';

const CONNECTED_EVENT = "connected";
const DISCONNECT_EVENT = "disconnect";
const USER_ONLINE_EVENT = "onlineStatusChanged"
const JOIN_CHAT_EVENT = "joinChat";
const NEW_CHAT_EVENT = "newChat";
const TYPING_EVENT = "typing";
const STOP_TYPING_EVENT = "stopTyping";
const MESSAGE_RECEIVED_EVENT = "messageReceived";
const MESSAGE_DELIVERED_EVENT = "messageDelivered";
const LEAVE_CHAT_EVENT = "leaveChat";
const UPDATE_GROUP_NAME_EVENT = "updateGroupName";
const MESSAGE_DELETE_EVENT = "messageDeleted";


function Page() {

  const { socket } = useSocket()

  const dispatch = useAppDispatch();
  const params = useSearchParams();
  const u = params.get('u');
  const g = params.get('g');
  const [isChatFetched, setIsChatFetched] = useState(false)


  const { isConnected, isTyping, isOtherTyping, users, chats, selectedChat, createdChat } = useAppSelector((state) => state.chat);

  const user = useAppSelector(state => state.auth.user);





  const currentChat = useRef<ChatListItemInterface | null>(null);


  const [chat, setChats] = useState<ChatListItemInterface[]>([]); // To store user's chats










  const getUsers = () => {
    if (isConnected) {
      api.get(`/v1/chat-app/chats/users`)
        .then((res) => {
          const users = res.data.data


          console.log(users)
          dispatch(addUsers(users))
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  const getChats = async () => {

    if (isConnected) {
      api.get(`/v1/chat-app/chats`)
        .then((res) => {
          const chats = res.data.data
          console.log(chats)
          setIsChatFetched(true)

          dispatch(addChats(chats || []))

          if (!selectedChat?._id && chats.length > 0) {

            if (u || g) {
              const chat = chats.filter((chat: any) => {
                if (!chat?.isGroupChat) {
                  const chatUser = chat?.participants?.filter((p: any) => p._id !== user?._id)[0];
                  console.log(chatUser);
                  if (chatUser && chatUser.username === u) {
                    console.log("selected chat username", chatUser?.username);
                    dispatch(selectChat({ _id: chat?._id, admin: chat?.admin, username: chatUser?.username, name: chatUser?.name, email: chatUser?.email, avatar: chatUser?.avatar, isOnline: chatUser?.isOnline, isGroupChat: chat?.isGroupChat, participants: chat?.participants, createdAt: chat?.createdAt, updatedAt: chat?.updatedAt }))
                    return chat
                  }

                }
                else {
                  if ( chat._id === g) {
                    dispatch(selectChat(chat))
                    return chat
                  }
                }

              })

            } else {
              const chat = chats[0]
              if (!chat?.isGroupChat) {
                const chatUser = chat?.participants?.filter((p: any) => p._id !== user?._id)[0];
                dispatch(selectChat({ _id: chat?._id, admin: chat?.admin, username: chatUser?.username, name: chatUser?.name, email: chatUser?.email, avatar: chatUser?.avatar, isOnline: chatUser?.isOnline, isGroupChat: chat?.isGroupChat, participants: chat?.participants, createdAt: chat?.createdAt, updatedAt: chat?.updatedAt }))

              } else {
                dispatch(selectChat(chat))

              }
            }


          }

        })
        .catch((error) => {
          console.log(error)
        })
    }

  };

  const getMessages = async () => {
    // Check if a chat is selected, if not, show an alert
    if (!selectedChat?._id) return alert("No chat is selected");

    // Check if socket is available, if not, show an alert
    if (!socket) return;


    console.log("Getting messages...");

    // Make an async request to fetch chat messages for the current chat
    api.get(`/v1/chat-app/messages/${selectedChat?._id}`)
      .then((res) => {
        console.log(res)
        const data = res.data.data
        dispatch(clearMessages())
        dispatch(addMessages(data || []))
        dispatch(addUnreadCount(selectedChat?._id))

      })
      .catch((error) => {
        console.log(error)
      })

  };


  const onConnect = () => {

    console.log('Socket Connected')
  };

  const onDisconnect = () => {
    console.log('Socket Disconnected')
  };

  const onlineStatusChanged = (user: any) => {

    dispatch(updateUserOnline(user))
  };

  const createUserChat = (username: string) => {

    if (username) {
      console.log(username)

      api.post(`/v1/chat-app/chats/c/${username}`, {})
        .then((res) => {
          console.log(res)
          const chat = res.data.data
          toast({
            title: "Chat created successfully",
            description: res.data.message + username,
            variant: "success",
          });

          const chatUser = chat?.participants?.filter((p: any) => p._id !== user?._id)[0];
          const ch = { _id: chat?._id, admin: chat?.admin, username: chatUser?.username, name: chatUser?.name, email: chatUser?.email, avatar: chatUser?.avatar, isOnline: chatUser?.isOnline, isGroupChat: chat?.isGroupChat, participants: chat?.participants, createdAt: chat?.createdAt, updatedAt: chat?.updatedAt }
          dispatch(selectChat(ch))
          if (chats.filter(ch => ch._id === chat._id).length > 0) return
          dispatch(addNewChat(ch))

        })
        .catch((error) => {
          console.log(error)
          const axiosError = error as AxiosError<ApiResponse>;

          let errorMessage = axiosError.response?.data.message;

          toast({
            title: "Creation failed...",
            description: errorMessage,
            variant: "destructive",
          });
        })
    }

  };



  const handleOnSocketTyping = (chatId: string) => {
    dispatch(otherStartTyping(chatId))
  };

  const handleOnSocketStopTyping = (chatId: string) => {
    dispatch(otherStopTyping(chatId));
  };



  const onMessageDelete = (message: ChatMessageInterface) => {

    dispatch(removeDeletedMessage(message))

    const lastMessage = chats.find((c) => c._id === message.chat)?.lastMessage
    if (lastMessage?._id === message._id) {

      api.get(`/v1/chat-app/chats`,).then((res) => {
        const chats = res.data.data
        dispatch(addChats(chats))
      }).catch((err) => { console.log(err) })
    }

  }


  const onMessageReceived = (message: ChatMessageInterface) => {
    // Check if the received message belongs to the currently active chat
    if (message?.chat === selectedChat?._id) {
      console.log('Received message')
    }
    dispatch(addUnreadCount(message.chat))
    dispatch(addReceivedMessage(message))
    dispatch(addChatLastMessage(message))

  };
  const onMessageDelivered = (message: ChatMessageInterface) => {
    dispatch(deliveredMessage(message))
    if (message.chat === selectedChat._id) {
      console.log('message was delivered')
    }
  }



  const onNewChat = (chat: ChatListItemInterface) => {
    dispatch(addNewChat(chat));
  };

  // This function handles the event when a user leaves a chat.
  const onChatLeave = (chat: ChatListItemInterface) => {
    // Check if the chat the user is leaving is the current active chat.
    console.log('chat removed')
    dispatch(deleteChat(chat))
  };

  // Function to handle changes in group name
  const onGroupNameChange = (chat: ChatListItemInterface) => {
    // Check if the chat being changed is the currently active chat


    // Update the list of chats with the new chat details
    setChats((prev) => [
      // Map through the previous chats
      ...prev.map((c) => {
        // If the current chat in the map matches the chat being changed, return the updated chat
        if (c._id === chat._id) {
          return chat;
        }
        // Otherwise, return the chat as-is without any changes
        return c;
      }),
    ]);
  };





  useEffect(() => {
    getUsers()
    getChats();
  }, [isConnected])


  useEffect(() => {

    if (!u) return
    if (!isChatFetched) return

    const chat = chats?.filter((chat: any) => {
      if (!chat?.isGroupChat) {
        const chatUser = chat?.participants?.filter((p: any) => p._id !== user?._id)[0];
        if (chatUser && chatUser.username === u) {
          dispatch(selectChat({ _id: chat?._id, admin: chat?.admin, username: chatUser?.username, name: chatUser?.name, email: chatUser?.email, avatar: chatUser?.avatar, isOnline: chatUser?.isOnline, isGroupChat: chat?.isGroupChat, participants: chat?.participants, createdAt: chat?.createdAt, updatedAt: chat?.updatedAt }))

          return chat
        }
      }
    })

    if (chat.length === 0) {
      createUserChat(u)
    }
  }, [u])
  useEffect(() => {

    if (!g) return

    const chat = chats?.filter((chat: any) => {
      if (chat?.isGroupChat && chat?._id === g) {

        dispatch(selectChat(chat));
        return chat
      }
    })


  }, [g])





  useEffect(() => {



    if (selectedChat?._id && socket) {




      // If the socket connection exists, emit an event to join the specific chat using its ID.
      socket.emit(JOIN_CHAT_EVENT, (e: any) => {
        console.log(`Joined chat: ${e.chatId}`);
      });

      socket.emit(JOIN_CHAT_EVENT, selectedChat?._id);

      // Fetch the messages for the current chat.
      getMessages();
    }
    // An empty dependency array ensures this useEffect runs only once, similar to componentDidMount.
  }, [selectedChat._id]);


  // This useEffect handles the setting up and tearing down of socket event listeners.
  useEffect(() => {
    // If the socket isn't initialized, we don't set up listeners.
    if (!socket) return;
    // Set up event listeners for various socket events:
    // Listener for when the socket connects.
    socket.on(CONNECTED_EVENT, onConnect);
    // Listener for when the socket disconnects.
    socket.on(DISCONNECT_EVENT, onDisconnect);

    socket.on(USER_ONLINE_EVENT, onlineStatusChanged);
    // Listener for when a user is typing.
    socket.on(TYPING_EVENT, handleOnSocketTyping);
    // Listener for when a user stops typing.
    socket.on(STOP_TYPING_EVENT, handleOnSocketStopTyping);
    // Listener for when a new message is received.
    socket.on(MESSAGE_RECEIVED_EVENT, onMessageReceived);

    socket.on(MESSAGE_DELIVERED_EVENT, onMessageDelivered);
    // Listener for the initiation of a new chat.
    socket.on(NEW_CHAT_EVENT, onNewChat);
    // Listener for when a user leaves a chat.
    socket.on(LEAVE_CHAT_EVENT, onChatLeave);
    // Listener for when a group's name is updated.
    socket.on(UPDATE_GROUP_NAME_EVENT, onGroupNameChange);
    //Listener for when a message is deleted
    socket.on(MESSAGE_DELETE_EVENT, onMessageDelete);
    // When the component using this hook unmounts or if `socket` or `chats` change:
    return () => {
      // Remove all the event listeners we set up to avoid memory leaks and unintended behaviors.
      socket.off(CONNECTED_EVENT, onConnect);
      socket.off(DISCONNECT_EVENT, onDisconnect);
      socket.off(TYPING_EVENT, handleOnSocketTyping);
      socket.off(STOP_TYPING_EVENT, handleOnSocketStopTyping);
      socket.off(MESSAGE_RECEIVED_EVENT, onMessageReceived);
      socket.off(MESSAGE_DELIVERED_EVENT);
      socket.off(NEW_CHAT_EVENT, onNewChat);
      socket.off(LEAVE_CHAT_EVENT, onChatLeave);
      socket.off(UPDATE_GROUP_NAME_EVENT, onGroupNameChange);
      socket.off(MESSAGE_DELETE_EVENT, onMessageDelete);
    };

    // Note:
    // The `chats` array is used in the `onMessageReceived` function.
    // We need the latest state value of `chats`. If we don't pass `chats` in the dependency array,
    // the `onMessageReceived` will consider the initial value of the `chats` array, which is empty.
    // This will not cause infinite renders because the functions in the socket are getting mounted and not executed.
    // So, even if some socket callbacks are updating the `chats` state, it's not
    // updating on each `useEffect` call but on each socket call.
  }, [socket, chats]);

  return (
    <Sheet
      sx={{
        flex: 1,
        height: '100%',

        mx: 'auto',
        pt: { xs: 'var(--Header-height)', sm: 0 },
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'minmax(min-content, min(30%, 400px)) 1fr',
        },
      }}
      className="h-dvh  top-0"
    >
      <Sheet
        sx={{
          position: { xs: 'fixed', sm: 'sticky' },
          transform: {
            xs: 'translateX(calc(100%  * (var(--MessagesPane-slideIn, 0) - 1)))',
            sm: 'none',
          },
          transition: 'transform 0.4s, width 0.4s',
          zIndex: 100,
          width: '100%',

        }}
        className="h-full overflow-auto"
      >
        <ChatsPane />
      </Sheet>
      {
        !selectedChat?._id ?
          <div className="w-full h-full flex justify-center items-center bg-background">
            <Image src="/whatsapp.gif"
              loading="lazy"
              width={200}
              height={200}
              className="h-20 w-20 rounded-full" alt="whatsapp loading button" />
          </div>
          : <MessagesPane />


      }

    </Sheet>
  );
}

export default function Message() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Page />
    </Suspense>
  )
}