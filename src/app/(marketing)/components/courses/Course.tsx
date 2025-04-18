'use client'
import api from "@/api";
import MarketingCourseCard from "../MarketingCourseCard";
import { useEffect, useState } from "react";
interface Course {
  _id: string;
  // add other props used in MarketingCourseCard
}
const Courses = async () => {
    const [courseData, setCourseData] = useState([]) 
   
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
    <div className="flex flex-col items-center justify-center max-w-6xl mx-auto px-4 md:px-0">
      <div className="grid xs:grid-cols-2 md:grid-cols-3 mt-4 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {courseData?.map((course: Course, index: number) => (
          <MarketingCourseCard key={course?._id} _id={course?._id} />
        ))}
      </div>
    </div>
  );
};

export default Courses;
