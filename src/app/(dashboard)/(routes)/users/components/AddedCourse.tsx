import api from '@/api';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import CourseList from '../../(courses)/components/CourseList';
import { useSession } from 'next-auth/react';

function AddedCourse() {
    const router = useRouter();
    const [courseData, setCourseData] = useState([{
        _id: '',
        title: '',
        isPublished: false, 
        printPrice: 0,
    }])
    const  user  = useSession()?.data?.user
    useEffect(() => {
        if(user && user.accessToken){
        api.patch(`/v1/courses/course/getAdminCourses`,{}, {
            headers: {
                'Authorization': `Bearer ${user?.accessToken}`
            }
        })
            .then(res => {
                setCourseData(res.data.data)
            })
            .catch(err => console.log(err))
        }
    }, [user]);

    const onEdit = (_id:String) => {
        router.push(`/courses/edit-course/${_id}`)
    }
  return (
    <div>
        <CourseList
            onEdit = {onEdit}
            items = {courseData}
        />
    </div>
  )
}

export default AddedCourse