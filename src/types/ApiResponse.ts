

export interface ApiResponse {
  success: boolean;
  message: string;
  data:{
    username: string;
    _id: string;
    isVerified: boolean;
    isAdmin: boolean;
    role: string;
    accessToken: string;
  }
};
