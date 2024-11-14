import { createSlice } from "@reduxjs/toolkit";

interface CourseInterface {
  title: string;
  description: string;
  thumbnail: {
    secure_url: string;
    public_id: string;
  };
  language: string;
  printPrice: number;
  discount: number;
  sellingPrice: number;
  from: string;
  to: string;
  chapters: chapterInterface[]

}
interface chapterInterface {
  _id: string;
  title: string;
  isPublished: boolean;
  isFree: boolean;
  position: number;
  description: string;

}

interface Interface {
  editCourse:CourseInterface
}

const initialState:Interface = {
  editCourse:{
    title: '',
    description: '',
    thumbnail: {
      secure_url: '',
      public_id: '',
    },
    language: '',
    printPrice: 0,
    discount: 0,
    sellingPrice: 0,
    from: '',
    to: '',
    chapters:[],
  },
}


const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
   addEditCourse:(state,action) => {
     state.editCourse = action.payload;
   },
  },
});

export const { 
  addEditCourse,

} = postSlice.actions;

export default postSlice.reducer;
