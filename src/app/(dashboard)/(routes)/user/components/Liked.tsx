import React, { useState } from 'react'
import VideoCard from '../../(courses)/components/chapter/VideoCard';

function Liked() {
  
    const [videos, setVideos] = useState([{}, {}, {},{}, {}, {},{}, {}, {}]);

    return (
        <div className='w-full  overflow-auto p-2 rounded'>
            <div className="grid xs:grid-cols-2 md:grid-cols-3 mt-4 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
                
               { 
               videos?.map((data:any,index) => {
                return (
                    <VideoCard key={index} _id={data?._id}/>
                )
              })
              }
            </div>
        </div>
    )
  
}

export default Liked