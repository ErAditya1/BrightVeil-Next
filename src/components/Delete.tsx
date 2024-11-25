import api from "@/api";
;
import React from "react";
import { FaTrash } from "react-icons/fa6";

export default function Delete({ className, url }:{className: string, url: string}) {
  

  const deleteHandler = () => {

    api.delete(`/v1/${url}`)
    .then((response) => {
      console.log(response?.data.data);
    }).catch((error) =>{console.log(error)});
    
    
  };
  return (
    <button
      onClick={deleteHandler}
      className={`  flex   justify-center items-center rounded-full  ${className}`}
    >
      <FaTrash className={` mx-2 p-0 `} />
    </button>
  );
}
