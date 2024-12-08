// store/chatSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the chat message type

export interface UserInterface {
  _id: string;
  username: string;
  name: string;
  email: string;
  avatar: {
    url: string;
  };
  isOnline: boolean;
  role: string;
}

export interface SelectedChat {
  _id: string;
  admin: string;
  username: string;
  name: string;
  email: string;
  avatar: {
    url: string;
  };
  isOnline: boolean;
  isGroupChat: boolean;
  participants: UserInterface[];
  createdAt: string;
  updatedAt: string;
}

export interface CreatedChat {
  _id: string;
  admin: string;
  isGroupChat: boolean;
  name: string;
  participants: UserInterface[];
  createdAt: string;
  updatedAt: string;
}

export interface ChatInterface {
  _id: string;
  admin: string;
  createdAt: string;
  isGroupChat: boolean;
  avatar: {
    url: string;
  };
  lastMessage: LastMessageInterface;
  participants: UserInterface[];
  name: string;
  updatedAt: string;
  unread?: boolean;
  unreadCount: number;
}

export interface ChatMessage {
  _id: string;
  content: string;
  chat: string;
  attachments: {
    url: string;
    public_id: string;
    type: string;
    size: number;
    _id: string;
  }[];
  urlpreviews: {
    title: string;
    description: string;
    image: string;
  }[];
  sender: UserInterface;
  createdAt: string;
  updatedAt: string;
  status: string;
}

export interface LastMessageInterface {
  _id: string;
  chat: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  sender: UserInterface;
  status: string;
}

interface ChatState {
  unreadMessageCount: number;
  isConnected: boolean;
  users: UserInterface[];
  chats: ChatInterface[];
  messages: ChatMessage[];
  isTyping: boolean;
  isOtherTyping: boolean;
  selectedChat: SelectedChat;
  createdChat: CreatedChat;
}

const initialState: ChatState = {
  unreadMessageCount: 0,
  isConnected: false,
  users: [],
  chats: [],
  messages: [],
  isTyping: false,
  isOtherTyping: false,
  selectedChat: {
    _id: "",
    name: "",
    username: "",
    email: "",
    avatar: {
      url: "",
    },
    admin: "",
    isGroupChat: false,
    participants: [],
    createdAt: "",
    updatedAt: "",
    isOnline: false,
  },
  createdChat: {
    admin: "",
    createdAt: "",
    isGroupChat: false,
    name: "",
    participants: [],
    updatedAt: "",
    _id: "",
  },
};

// Create the chat slice
const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addConnection: (state) => {
      state.isConnected = true;
    },
    removeConnection: (state) => {
      state.isConnected = false;
    },
    updateUserOnline: (state, action) => {
      state.chats.forEach((chat) => {
        chat.participants.forEach((participant) => {
          if (participant._id === action.payload.user) {
            participant.isOnline = action.payload.status;
          }
        });
      });
      if (state.selectedChat.username === action.payload.username) {
        state.selectedChat.isOnline = action.payload.status;
      }
      state.users.forEach((user) => {
        if (user._id === action.payload.user) {
          user.isOnline = action.payload.status;
        }
      });
    },
    startTyping: (state) => {
      state.isTyping = true;
    },
    stopTyping: (state) => {
      state.isTyping = false;
    },
    otherStartTyping: (state, action) => {
      if (state.selectedChat._id === action.payload) state.isOtherTyping = true;
    },
    otherStopTyping: (state, action) => {
      if (state.selectedChat._id === action.payload)
        state.isOtherTyping = false;
    },
    selectChat: (state, action) => {
      if (state.selectedChat._id !== action.payload._id) {
        state.messages = [];
      }
      state.isTyping = false;
      state.isOtherTyping = false;
      state.selectedChat = action.payload;
    },
    setCreatedChat: (state, action) => {
      state.createdChat = action.payload;
    },
    addMessages: (state, action) => {
      if (state.messages?.length > 0) {
        if (action.payload.length > 0) {
          state.messages = [...state.messages, ...action.payload];
        } else {
          state.messages = [...state.messages, action.payload];
        }
      } else {
        if (action.payload.length > 0) {
          state.messages = [...action.payload];
        } else {
          state.messages = [action.payload];
        }
      }
    },
    addReceivedMessage: (state, action) => {
      if (state.selectedChat._id === action.payload.chat) {
        state.messages.push(action.payload);
      }
    },
    removeDeletedMessage: (state, action) => {
      const chatIndex = state.chats.findIndex(
        (chat) => chat._id === action.payload.chat
      );
      // update messages
      if (state.selectedChat._id === action.payload.chat) {
        state.messages = state.messages.filter(
          (message) => message._id !== action.payload._id
        );
      } else {
        // update unread count

        if (chatIndex !== -1) {
          if (state.chats[chatIndex]?._id === state.selectedChat._id) {
            state.unreadMessageCount =
              state.unreadMessageCount - state.chats[chatIndex].unreadCount;

            state.chats[chatIndex].unreadCount = 0;
          } else {
            if (state.chats[chatIndex].unreadCount > 0) {
              state.chats[chatIndex].unreadCount =
                state.chats[chatIndex].unreadCount - 1;
            }
          }
        }
      }
    },

    deliveredMessage: (state, action) => {
      console.log("message delivered");
      state.messages.forEach((message) => {
        if (message._id === action.payload._id) {
          message.status = action.payload.status;
        }
      });
      state.chats.forEach((chat) => {
        if (chat.lastMessage?._id === action.payload._id) {
          chat.lastMessage.status = action.payload.status;
        }
      });
    },
    clearMessages: (state) => {
      state.messages = [];
    },
    // Add other chat reducers...
    addUsers: (state, action) => {
      state.users = [...action.payload];
    },
    addChats: (state, action) => {
      state.chats = [...action.payload];
      let unread =0;
       action.payload.map((ch:ChatInterface) => unread = unread+ch.unreadCount)
       state.unreadMessageCount = unread;
    },
    addNewChat: (state, action) => {
      state.chats = [action.payload, ...state.chats];
    },
    deleteChat: (state, action) => {
      console.log(action);
      state.chats = state.chats.filter(
        (chat) => chat._id !== action.payload._id
      );
      const chat = state.chats[0];
      state.selectedChat._id = "";
      state.messages = [];
      state.isTyping = false;
      state.isOtherTyping = false;
    },
    addChatLastMessage: (state, action) => {
      const chatIndex = state.chats.findIndex(
        (chat) => chat._id === action.payload.chat
      );
      if (chatIndex !== -1) {
        state.chats[chatIndex].lastMessage = action.payload;
      }
    },
    addUnreadCount: (state, action) => {
      const chatIndex = state.chats.findIndex(
        (chat) => chat._id === action.payload
      );
      if (chatIndex !== -1) {
        if (state.chats[chatIndex]?._id === state.selectedChat._id) {
          state.chats[chatIndex].unreadCount = 0;
        } else {
          state.unreadMessageCount++;
          state.chats[chatIndex].unreadCount =
            state.chats[chatIndex].unreadCount + 1;
        }
      }
    },
  },
});

export const {
  addConnection,
  removeConnection,
  updateUserOnline,
  startTyping,
  stopTyping,
  otherStartTyping,
  otherStopTyping,
  selectChat,
  setCreatedChat,
  addUsers,
  addChats,
  addNewChat,
  deleteChat,
  addMessages,
  clearMessages,
  removeDeletedMessage,
  addReceivedMessage,
  deliveredMessage,
  addChatLastMessage,
  addUnreadCount,
  // Export other chat action creators...
} = chatSlice.actions;

export default chatSlice.reducer;
