'use client'
import React, { useEffect, useState } from 'react'
import BlogPostForm from '../components/PostForm'
import api from '@/api'
import { toast } from '@/components/ui/use-toast'
import { AxiosError } from 'axios'
import PostCard from '@/components/PostCard'
import { HoverEffect } from '@/components/ui/card-hover-effect'

function page() {

  const [posts, setPosts] = useState([
    {
      _id:''
    }
  ])

  useEffect(() => {

    api.get("/v1/posts/get")
      .then((response) => {
        const data = response.data.data
        setPosts(data)
      })
      .catch((error)=> {
      const axiosError = error as AxiosError<AxiosError>
      console.log(axiosError)
      
    })

    }, [])

  return (
    <div className="w-full p-4">
      
      <div className="grid xs:grid-cols-2 md:grid-cols-3 mt-4 lg:grid-cols-3 xl:grid-cols-4 gap-4">
     {
       posts?.map((post , index) => (
        <HoverEffect index={index}> 
        <PostCard  key = {post?._id} _id = {post?._id}/>
        </HoverEffect>
       ))
     }
      </div>
    </div>
    
  )
}

export default page