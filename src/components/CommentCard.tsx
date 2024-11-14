"use client"
import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { LuSendHorizonal } from "react-icons/lu";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { useState } from "react";
import { UserCommentCard } from "./UserCommentCard";
;
import api from "@/api";
import { useAppSelector } from "@/store/hooks";
import AvatarLayout from "./AvatarLayout";


export default function CommentCard({ _Id, comments ,type}:any) {
 
  const [comment, setComment] = useState("");
  const user = useAppSelector(state=> state.auth.user);


  const submitCommentHandler = () => {
    if (comment) {
      api.post(`/v1/comment/${type}/${_Id}`, {comment}).then(response => {
        setComment("");
        comments.push(response.data.data)
        console.log(response)
      })
      .catch(err =>{
        console.log(err);
       
      });
      

      
    }
  };

  return (
    <List
      sx={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "auto",
        "& ul": { padding: 0 },
      }}
      className="bg-background text-foreground rounded p-2 "
    >
      <div className="border-none">
        

        <ListItemText
          primary={<React.Fragment>
            <div className="flex gap-2 items-center bg-card p-2 rounded w-full">
            <AvatarLayout src={user?.avatar?.url} name={user?.name} username={user?.username}/>
            <div className="flex flex-col gap-1 w-full">
              <span className="text-md font-medium">{user?.name}</span>
              <div className="flex flex-row justify-center items-end w-full">
                <TextareaAutosize
                  name="comment"
                  required
                  className=" w-full bg-transparent rounded  p-1 border border-b-2 border-r-2 my-1"
                  placeholder="Add Comment..."
                  value={comment}
                  onChange={(e) => {
                    setComment(e?.target?.value);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' ) {
                      submitCommentHandler();
                    }
                  }}
                />
                <LuSendHorizonal
                  className=" text-xl  ml-1 items-center cursor-pointer"
                  onClick={submitCommentHandler}
                />
              </div>
              
            </div>
            </div>
          </React.Fragment>}
          
        />
      </div>
     
      {comments?.map((val:any, index:any) => (
        <UserCommentCard key={index} val={val} type={type}/>
      ))}
      
    </List>
  );
}
