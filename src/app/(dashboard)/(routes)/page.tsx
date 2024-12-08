"use client";
import api from "@/api";
import React, { useEffect, useState, useCallback } from "react";
import CourseCard from "./(courses)/components/CourseCard";
import VideoCard from "./(courses)/components/VideoCard";
import PostCard from "@/components/PostCard";
import { LoadingScreen } from "@/context/UserContext";
import { HoverEffect } from "@/components/ui/card-hover-effect";

function Home() {
  const [recomendedData, setRecomendedData] = useState([
    {
      type: "",
      contentId: "",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [noMoreContent, setNoMoreContent] = useState(false)
  const [enrolledCourse, setEnrolledCourse] = useState([
    {
      course_Id: "",
    },
  ]);

  // Fetch enrolled courses
  useEffect(() => {
    api
      .patch(`/v1/courses/course/getEnrolledCourses`)
      .then((res) => {
        const data = res.data.data;
        if (data) {
          setEnrolledCourse(data);
        }
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Fetch recommended data with pagination
  useEffect(() => {
    console.log("Getting more content...");
    setLoading(true);
    api
      .get(`/v1/comman/recomended?page=${page}`)
      .then((res) => {
        console.log(res);
        const data = res.data.data;
        if (data.length > 0) {
          setRecomendedData((prev) => [...prev, ...data]);
        }else{
          setNoMoreContent(true);
        }
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [page]);

  // Use IntersectionObserver to detect when the user reaches the end of the page
  const loadMoreContent = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    if (entry.isIntersecting && !loading && !noMoreContent) {
      setPage((prevPage) => prevPage + 1); // Load next page of recommendations
    }
  }, [loading]);

  useEffect(() => {
    const observer = new IntersectionObserver(loadMoreContent, {
      rootMargin: "200px", // Trigger when 200px before reaching the bottom
    });

    const sentinel = document.getElementById("sentinel");
    if (sentinel) {
      observer.observe(sentinel); // Observe the sentinel element
    }

    return () => {
      if (sentinel) {
        observer.unobserve(sentinel); // Clean up the observer when the component is unmounted
      }
    };
  }, [loadMoreContent]);

  return (
    <div className="text-foreground mt-2">
      <div className="grid xs:grid-cols-2 md:grid-cols-3 m-4 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {enrolledCourse[0]?.course_Id &&
          enrolledCourse.map((course, index) => (
            <HoverEffect index={index}>
              <CourseCard key={index} _id={course?.course_Id} />
            </HoverEffect>
          ))}

        {recomendedData?.map((item, index) => {
          if (item?.type === "video") {
            return <HoverEffect index={index}> <VideoCard key={index} _id={item?.contentId} /></HoverEffect>;
          } else if (item?.type === "course") {
            return <HoverEffect index={index}> <CourseCard key={index} _id={item?.contentId} /></HoverEffect>;
          } else if (item?.type === "post") {
            return <HoverEffect index={index}> <PostCard key={index} _id={item?.contentId} /></HoverEffect>;
          }
        })}
      </div>


        {
          noMoreContent && (
            <div className="text-center mt-4">
              No more content to load.
            </div>
          )
        }

      {loading && !noMoreContent && (
        <div className="text-center mt-4 ">
          <LoadingScreen message="loading..." className="h-20 " size={25}/>
        </div>
      )}
      <div id="sentinel"></div>
    </div>
  );
}

export default Home;
