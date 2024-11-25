"use client";
import api from "@/api";
import React, { useEffect, useState } from "react";
import CourseCard from "./(courses)/components/CourseCard";


function Home() {


  const [courseData, setCourseData] = useState([{ _id: "" }])
  useEffect(() => {
    
      api.patch("/v1/courses/course/getAllCourses", {})
        .then((res) => {
          console.log(res)
          setCourseData(res.data.data)
        })
        .catch((error) => {
          console.log(error)
        })
      
  }, [])

const [type, setType] = useState("");
// const tabs = [
//   {
//     title: "All",

//   },
//   {
//     title: "React",
//   },
//   {
//     title: "Vue",
//   },
//   {
//     title: "Angular",
//   },
//   {
//     title: "Short",
//   },
//   {
//     title: "Programming",
//   },
//   {
//     title: "React",
//   },
//   {
//     title: "Vue",
//   },
//   {
//     title: "Angular",
//   },
//   {
//     title: "Short",
//   },
//   {
//     title: "Programming",
//   },
//   {
//     title: "React",
//   },
//   {
//     title: "Vue",
//   },
//   {
//     title: "Angular",
//   },
//   {
//     title: "Short",
//   },
//   {
//     title: "Programming",
//   },
//   {
//     title: "React",
//   },
//   {
//     title: "Vue",
//   },
//   {
//     title: "Angular",
//   },
//   {
//     title: "Short",
//   },
//   {
//     title: "Programming",
//   },
// ];

return (
  <div className="text-foreground mt-2">
    {/* <div className="flex flex-row items-center overscroll-none overflow-auto gap-2 my-4">
      {tabs.map((tab, index) => {
        return (
          <div key={index} onClick={() => setType(tab.title)}>
            <HoverBorderGradient
              containerClassName="rounded-lg"
              as="button"
              className="bg-muted text-muted-foreground flex items-center space-x-2"
            >
              <span>{tab.title}</span>
            </HoverBorderGradient>
          </div>
        );
      })}
    </div> */}
    <div className="grid xs:grid-cols-2 md:grid-cols-3 m-4  lg:grid-cols-3 xl:grid-cols-4  gap-4">
      {
        courseData?.map((course) => (
          <CourseCard key={course?._id} _id={course?._id} />
        ))
      }
    </div>

  </div>
);
}

export default Home;
