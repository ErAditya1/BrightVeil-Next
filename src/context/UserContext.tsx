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
import Sheet from '@mui/joy/Sheet';
import { useSocket } from '@/context/SocketContext';

import { ChatListItemInterface, ChatMessageInterface } from '@/interfaces/chat';
import { addChatLastMessage, addChats, addMessages, addNewChat, addReceivedMessage, addUnreadCount, addUsers, clearMessages, deleteChat, deliveredMessage, otherStartTyping, otherStopTyping, removeDeletedMessage, selectChat, stopTyping, updateUserOnline } from '@/store/chat/chatSlice';

import { ApiResponse } from '@/types/ApiResponse';
import { v4 as uuidv4 } from 'uuid';

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


// Loading Screen Component
export function LoadingScreen({ message, className = 'h-dvh w-full ', size = 50 }: any) {
  return (
    <div className={`bg-background text-foreground  flex justify-center items-center m-0 p-0 ${className}`}>
      <FaSpinner className="animate-spin mx-4" size={size} />
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
  const searchParams = useSearchParams();

  const accessToken = useMemo(() => {
    return searchParams.get('accessToken');
  }, [searchParams]);

  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  const [loading, setLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(true);
  const [showOffline, setShowOffline] = useState(false);
  const [token, setToken] = useState('')

  const [isSlideIn, setIsSlideIn] = useState(true);
  const { socket } = useSocket()

  const dispatch = useAppDispatch();
  const params = useSearchParams();
  const u = params.get('u');
  const g = params.get('g');
  const [isChatFetched, setIsChatFetched] = useState(false)


  const { isConnected, chats, selectedChat } = useAppSelector((state) => state.chat);

  const user = useAppSelector(state => state.auth.user);










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

                  if (chatUser && chatUser.username === u || chat?._id === u) {
                    dispatch(selectChat({ _id: chat?._id, admin: chat?.admin, username: chatUser?.username, name: chatUser?.name, email: chatUser?.email, avatar: chatUser?.avatar, isOnline: chatUser?.isOnline, isGroupChat: chat?.isGroupChat, participants: chat?.participants, createdAt: chat?.createdAt, updatedAt: chat?.updatedAt }))
                    return chat
                  }

                }
                else {
                  if (chat._id === g) {
                    dispatch(selectChat(chat))
                    return chat
                  }
                }

              })

            }


          }

        })
        .catch((error) => {
          console.log(error)
        })
    }

  };

  const getMessages = async () => {
    if (!selectedChat?._id) return alert("No chat is selected");
    setIsSlideIn(false)
    // Check if socket is available, if not, show an alert
    if (!socket) return;



    // Make an async request to fetch chat messages for the current chat
    api.get(`/v1/chat-app/messages/${selectedChat?._id}`)
      .then((res) => {
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
        if (chatUser && chatUser.username === u || chat?._id === u) {
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


  }, [socket, chats]);
  const isPublicPath = useMemo(
    () =>
      ['/sign-in', '/sign-up', '/verify', '/reset-password', '/forget-password', '/auth'].some((path) =>
        pathname.startsWith(path),
      ),
    [pathname],
  );
  const commanPath = useMemo(
    () =>
      ['/terms-services', '/privacy-policy', 'support'].some((path) =>
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
        const { user, device } = response.data.data;
        user.accessToken = device.accessToken;
        user.refreshToken = device.refreshToken;
        user.accessTokenExpires = Date.now() + (1000 * 60 * 60)
        console.log(user)

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
          router.push('/auth/sign-in');
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


      if (accessToken) {
        getCurrentUser()
      }
      else if (user && user.accessTokenExpires > Date.now()) {

        dispatch(loginUser(user));
        setLoading(false);
        if (isPublicPath) router.push('/');

      } else if (user && user.accessTokenExpires <= Date.now()) {
        getCurrentUser()
      } else {
        if (!isPublicPath && !commanPath) {
          router.push('/auth');
        }
        dispatch(logoutUser());
        setLoading(false)
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
    if (!pathname.startsWith('/chat')) {
      dispatch(selectChat({ _id: '' }))
    }
  }, [accessToken, dispatch, isOnline, isPublicPath, router, pathname]);

  // Redirect logged-in users from public paths
  useEffect(() => {
    if (isLoggedIn && isPublicPath) {
      router.replace('/');
    }

  }, [isLoggedIn, isPublicPath, router]);


  useEffect(() => {
    // This code will only run on the client-side (browser)
    if (typeof window !== 'undefined') {
      let uniqueId = localStorage.getItem('uniqueId');
      if (!uniqueId) {
        // Generate a new unique ID if it doesn't exist
        const uniqueId = uuidv4();
        // Store it in localStorage and/or cookies
        localStorage.setItem('uniqueId', uniqueId);
        document.cookie = `uniqueId=${uniqueId}; path=/; max-age=${60 * 60 * 24 * 365}`;  // 1 year expiration
      }
      const blockConsole = () => {
        if (window.console) {
          // Override console methods with an empty function
          const methods: (keyof Console)[] = ['log', 'info', 'warn', 'debug', 'error'];
          methods.forEach((method) => {
            // Override with a function that matches the expected signature
            (window.console[method] as (...args: any[]) => void) = (...args: any[]) => { };
          });
        }
      };
      // Block the console with the specified arguments and return
      if (process.env.NODE_ENV === 'production') {
        blockConsole();
      }

      dispatch(handleSidebar(window.screen.width >= 900));
    }
  }, []);
  useEffect(() => {
    if (isLoggedIn && isOnline) {
      if (typeof window !== 'undefined' && 'serviceWorker' in navigator && 'PushManager' in window) {


        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            navigator.serviceWorker.register('/service-worker.js')
              .then((registration) => {
                console.log('Service Worker registered', registration.scope);

                // Subscribe the user to Push Notifications
                registration.pushManager.getSubscription().then((subscription) => {
                  if (subscription) {
                    console.log('Already subscribed');
                  } else {
                    registration.pushManager.subscribe({
                      userVisibleOnly: true,
                      applicationServerKey: 'BOj4llN4WfhksTyrnYQl4so0KroAfkj6OkdxKYNIVBQKKLWj7nQrfKqZj9kaXpPz5iwJMZZqDedLTcE0r3Edf8M'
                    }).then((subscription) => {
                      console.log('User is subscribed', subscription);
                      // Send subscription to the backend
                      api.post("/v1/notification/save-subscription", { subscription: subscription })
                        .then((data) => console.log('Subscription sent', data))
                        .catch((error) => console.error('Subscription error', error));
                    });
                  }
                });
              })
              .catch((error) => {
                console.error('Service Worker registration failed', error);
              });
          }
        });

      };
    }


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
