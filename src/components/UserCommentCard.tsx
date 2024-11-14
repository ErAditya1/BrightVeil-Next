"use client"
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { ListItemText } from "@mui/material";

// import Like from "./Like";
import CommentCard from "./CommentCard";
import { FaReplyAll } from "react-icons/fa6";
import AvatarLayout from "./AvatarLayout";
import LikeButton from "./LikeButton";
import Delete from "./Delete";

export const UserCommentCard = ({ val, type }: any) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [addReply, setAddReply] = useState(false);

  const handleClickOutside = (event:any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setAddReply(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col m-0 p-0 my-2" key={val._id}>
      <div className="flex-start m-0 p-0 flex gap-2">

        <AvatarLayout
          src={val?.author?.avatar?.url}
          name={val?.author?.name}
          username={val?.author?.username}
        />

        <div className="flex flex-col ">
          <ListItemText
            className=" p-0 m-0 "
            primary={val?.author?.name}
            secondary={
              <div className="flex gap-4">
                {val.comment && (
                  <p className=" disabled text-sm text-card-foreground border-none ">
                    {val?.comment}
                  </p>
                )}

              </div>
            }
          />
          <div className=" flex flex-row items-center gap-2 my-2">
            <p>
              <LikeButton
                _id={val._id}
                likeCnt={val?.likeCount}
                liked={val?.isLiked}
                className="mr-2 mt-0 h-1 w-10"
                type="comment"
              />
            </p>

            {type !== "reply" && (


              <p
                className="text-sm ml-1 flex flex-row cursor-pointer"
                onClick={() => setAddReply(!addReply)}
              >
                <FaReplyAll />
                <span className="text-xs text-black bg-white ml-1 mt-2  h-4 p-1  text-center rounded-full  font-semibold flex justify-center items-center">
                  {val.replyCount}
                </span>
              </p>

            )}
            {val.isAuthor && (
              <p className="text-sm ml-3 flex flex-row cursor-pointer">

                <Delete url={`comment/post/${val._id}`} className="text-md" />
              </p>
            )}
          </div>

        </div>
      </div>

      {addReply && (
        <div className="relative width-full ml-6 mb-6" style={{ zIndex: 1 }} ref={dropdownRef}>
          <CommentCard
            _Id={val._id}
            comments={val?.commentsReply}
            type="reply"
            
          />
        </div>
      )}
    </div>
  );
};
