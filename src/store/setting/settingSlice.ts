import { createSlice } from "@reduxjs/toolkit";

interface SettingInterface {
  isSideBar: boolean;
}



const initialState: SettingInterface = {
  isSideBar: false,
};

const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    
    handleSidebar(state, actions){
      
      state.isSideBar = actions.payload;
    },
    
    
  },
});

export const { handleSidebar} = settingSlice.actions;

export default settingSlice.reducer;
