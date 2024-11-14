import { createSlice } from "@reduxjs/toolkit";

export interface User {
  _id: string;
  avatar: {
    url: string;
    public_id: string;
  };
  coverImage: {
    url: string;
    public_id: string;
  };
  role:string,
  name: string;
  isOnline: boolean;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  accessTokenExpires: number;
  accessToken: string;
  refreshToken: string;
  mobileNumber: string;
  about: string;
} 


export interface UserInterface {
  isLoggedIn: boolean;
  user: User | null; // Replace User with the actual user object type
  
}

const initialState: UserInterface = {
  isLoggedIn: false,
  user: null,
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser(state, action) {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logoutUser(state) {
      state.isLoggedIn = false;
      state.user = null;
    },
    updateUser(state, action) {
      console.log("Updating user", action.payload);
      state.user = action.payload;
    }
  },
});

export const { loginUser, logoutUser ,updateUser} = userSlice.actions;

export default userSlice.reducer;
