
import api from "@/api";
import MarketingCourseCard from "../MarketingCourseCard";

const Courses = async() => {

    const res = await api.patch("/v1/courses/course/getAllCourses");
    const courses = res.data.data || [];
    console.log(courses)
    return (
        <div className="flex flex-col items-center justify-center max-w-6xl mx-auto px-4 md:px-0">
            <div className="grid xs:grid-cols-2 md:grid-cols-3 mt-4 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                 {
                  courses?.map((course:any , index:number) => (
                    
                    <MarketingCourseCard  key = {course?._id} _id = {course?._id}/>
                    
                   ))
                 }
                  </div>
        </div>
    )
};

export default Courses
