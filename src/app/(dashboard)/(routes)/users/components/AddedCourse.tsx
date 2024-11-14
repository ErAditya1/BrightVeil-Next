import api from '@/api';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import CourseList from '../../(courses)/components/CourseList';


function AddedCourse() {
    const router = useRouter();
    const [courseData, setCourseData] = useState([{
        _id: '',
        title: '',
        isPublished: false, 
        printPrice: 0,
    }])
    useEffect(() => {
        
        api.patch(`/v1/courses/course/getAdminCourses`,{})
            .then(res => {
                setCourseData(res.data.data)
            })
            .catch(err => console.log(err))
        
    }, []);

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