export type UserProps = {
  _id: string;
    name: string;
    username: string;
    email: string;
    avatar: {
      url: string
    }
    isOnline: boolean;
  };
  
  export type MessageProps = {
    _id: string;
    content: string;
    chat: string;
    status:string;
    attachments: {
      url: string;
      public_id: string;
    }[];
    sender: UserProps;
    createdAt: string;
    updatedAt:string;
  };
  
  export type ChatProps = {
    _id: string;
    name: string;
    username: string;
    avatar: {
      url: string;
    };
    isOnline: boolean;

  };

  export type ChatListItemProps= {
    admin: string;
    createdAt: string;
    isGroupChat: true;
    lastMessage?: MessageProps;
    name: string;
    participants: UserProps[];
    updatedAt: string;
    _id: string;
  }
  