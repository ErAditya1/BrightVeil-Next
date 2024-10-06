'use client'
import * as React from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import MyProfile from '../components/MyProfile'
import { useSession } from 'next-auth/react'
import WatchHistory from '../components/WatchHistory'
import Enrolled from '../components/Enrolled';
import Saved from '../components/Saved';
import Liked from '../components/Liked';
import AddCourseForm from '../components/AddCourse';
import AddedCourse from '../components/AddedCourse';


function Profile() {
  const user = useSession()?.data?.user
  console.log(user)
  const [placement, setPlacement] = React.useState<
    'history' | 'enrolled' | 'saved' | 'liked' | 'upload'
  >('history');

  return (
    <div>
      <MyProfile />
      <Tabs
        variant="plain"
        aria-label="Placement indicator tabs"
        value={placement}
        onChange={(event, newValue) => setPlacement(newValue as typeof placement)}
      >
        <div className=' w-full'>
          <TabList className="flex flex-row items-center overscroll-none overflow-auto gap-4 my-4">
            <div>
              <Tab disableIndicator value="history" className="">
                History
              </Tab>
            </div>
            <div>
            <Tab disableIndicator value="enrolled">
              Enrolled
            </Tab>
            </div>
            <div>
              <Tab disableIndicator value="saved">
                Saved
              </Tab>
            </div>
            <div>
            <Tab disableIndicator value="liked">
              Liked
            </Tab>
            </div>
            {
              user?.isAdmin && (
                <div>
                  <Tab disableIndicator value="add-new">
                    Courses
                  </Tab>
                </div>
              )
            }
            {
              user?.isAdmin && (
                <div>
                <Tab disableIndicator value="upload">
                  Upload
                </Tab>
                </div>
              )
            }
           
          </TabList>
        </div>
        <TabPanel value="history">
          <div className='w-full  overflow-auto p-2 rounded'>
            <div className=''>
              <h1 className='text-2xl font-bold'>Watch History</h1>
            </div>
            <WatchHistory />

          </div>
        </TabPanel>
        <TabPanel value="enrolled">
          <div className='w-full  overflow-auto p-2 rounded'>
            <div className=''>
              <h1 className='text-2xl font-bold'>Enrolled Courses</h1>
            </div>

            <Enrolled />

          </div>
        </TabPanel>
        <TabPanel value="saved">
          <div className='w-full  overflow-auto p-2 rounded'>
            <div className=''>
              <h1 className='text-2xl font-bold'>Saved</h1>
            </div>

            <Saved />

          </div>
        </TabPanel>
        <TabPanel value="liked">
          <div className='w-full  overflow-auto p-2 rounded'>
            <div className=''>
              <h1 className='text-2xl font-bold'>Liked</h1>
            </div>
            <Liked />
          </div>
        </TabPanel>
        
              <TabPanel value="add-new">
                <div className='grid md:grid-cols-2 gap-4 p-4 w-full '>
                  <div className=''>
                    <h1 className='text-2xl font-bold'>Add Course:</h1>
                    <AddCourseForm/>
                  </div>
                  <div className=''>
                    <h1 className='text-2xl font-bold'>Courses:</h1>
                    <AddedCourse/>
                  </div>

                    

                </div>
              </TabPanel>
              <TabPanel value="upload">
                <div className='w-full  overflow-auto p-2 rounded'>
                  <div className=''>
                    <h1 className='text-2xl font-bold'>Upload New</h1>
                  </div>


                </div>
              </TabPanel>
            
         
      </Tabs>


    </div>
  )
}

export default Profile







