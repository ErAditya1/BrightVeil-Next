"use client";
import api from "@/api";
import React, { useEffect, useState } from "react";
import CourseCard from "./(courses)/components/CourseCard";
import VideoCard from "./(courses)/components/VideoCard";
import PostCard from "@/components/PostCard";

function Home() {

  const [recomendedData, setRecomendedData] = useState([
    {
      type: "",
      contentId: "",
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // Track the current page

  // Fetching recommended data with pagination
  useEffect(() => {
    console.log("Getting more content...");
    setLoading(true);
    api.get(`/v1/videos/recomended?page=${page}`).then((res) => {
      console.log(res);
      const data = res.data.data;
      if(data){
        setRecomendedData((prev) => [...prev, ...data]);
      }
      setLoading(false); // Set loading to false after data is fetched
    }).catch((error) => {
      console.log(error);
      setLoading(false); // Set loading to false if there is an error
    });
  }, [page]); // The page is the dependency, so this effect will run when the page changes

  // Scroll event handler
  const handleScroll = () => {
    // Check if we're at the bottom of the page and not currently loading
    if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.scrollHeight && !loading) {
      setPage((prevPage) => prevPage + 1); // Load next page of recommendations
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading]); // Re-run the effect when the loading state changes

  return (
    <div className="text-foreground mt-2">
      <div className="grid xs:grid-cols-2 md:grid-cols-3 m-4 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {
          recomendedData?.map((item, index) => {
            if (item?.type === 'video') {
              return <VideoCard key={index} _id={item?.contentId} />
            } else if (item?.type === 'course') {
              return <CourseCard key={index} _id={item?.contentId} />
            } else if (item?.type === 'post') {
              return <PostCard key={index} _id={item?.contentId} />
            }
          })
        }
      </div>

      {loading && (
        <div className="text-center mt-4">
          <p>Loading More...</p>
        </div>
      )}
    </div>
  );
}

export default Home;
