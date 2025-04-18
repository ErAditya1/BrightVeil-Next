'use client'
import React, { useEffect, useState } from 'react'
import CourseCard from '../components/CourseCard'
import api from '@/api'
import { HoverEffect } from '@/components/ui/card-hover-effect'


function Page() {
  const [courseData, setCourseData] = useState([{_id:""}]) 
 
  useEffect( () => {
        api.patch("/v1/courses/course/getAllCourses")
      .then((res) => {
        console.log(res)
        setCourseData(res.data.data)
      })
      .catch((error) => {
        console.log(error)
      })
    
      
    
  },[])
  return (
    <div className="w-full p-4">
      
      <div className="grid xs:grid-cols-2 md:grid-cols-3 mt-4 lg:grid-cols-3 xl:grid-cols-4 gap-4">
     {
      courseData[0]?._id && courseData?.map((course , index) => (
        <HoverEffect index={index}> 
        <CourseCard  key = {course?._id} _id = {course?._id}/>
        </HoverEffect>
       ))
     }
      </div>
    </div>
  )
}

export default Page