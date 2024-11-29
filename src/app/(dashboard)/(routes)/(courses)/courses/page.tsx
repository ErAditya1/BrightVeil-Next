'use client'
import React, { useEffect, useState } from 'react'
import CourseCard from '../components/CourseCard'
import api from '@/api'
import Cookies from 'js-cookie';


function Page() {
  const [courseData, setCourseData] = useState([{_id:""}]) 
  useEffect(() => {
    // Access the cookies directly on the client-side
    const accessToken = Cookies.get('accessToken');
    const refreshToken = Cookies.get('refreshToken');

    console.log('Access Token:', accessToken);
    console.log('Refresh Token:', refreshToken);
  }, []);
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
       courseData?.map((course , index) => (
        <CourseCard  key = {course?._id} _id = {course?._id}/>
       ))
     }
      </div>
    </div>
  )
}

export default Page