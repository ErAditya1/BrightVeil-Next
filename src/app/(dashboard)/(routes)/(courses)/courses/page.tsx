'use client'
import React, { useEffect, useState } from 'react'
import CourseCard from '../components/CourseCard'
import api from '@/api'
import { useSession } from 'next-auth/react'

function Page() {
  const  user  = useSession()?.data?.user
  const [courseData, setCourseData] = useState([{_id:""}]) 
  useEffect( () => {
    if(user && user.accessToken){
        api.patch("/v1/courses/course/getAllCourses",{},{
        headers: {
          'Authorization': `Bearer ${user?.accessToken}`,
        },
      })
      .then((res) => {
        console.log(res)
        setCourseData(res.data.data)
      })
      .catch((error) => {
        console.log(error)
      })
    }
    
  },[user])
  const videoUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'; // YouTube video URL
  const thumbnailUrl = 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg'; // Thumbnail URL
  return (
    <div className="w-full p-4">
      
      <div className="grid xs:grid-cols-2 md:grid-cols-3 mt-4 lg:grid-cols-3 xl:grid-cols-4 gap-4">
     {
       courseData.map((course , index) => (
        <CourseCard  key = {course?._id} _id = {course?._id}/>
       ))
     }
      </div>
    </div>
  )
}

export default Page