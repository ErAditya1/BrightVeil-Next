
import Courses from '@/app/(marketing)/components/courses/Course';
import AnimationContainer from '@/app/(marketing)/components/global/animation-container';
import React from 'react'

const CoursePage = () => {
    return (
        <div className="flex flex-col items-center justify-center pb-20">
            <AnimationContainer delay={0.1} className="w-full">
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold font-heading text-center mt-6 !leading-tight">
                    Courses
                </h1>
                <p className="text-base md:text-lg mt-6 text-center text-muted-foreground">
                    Latest Courses .
                </p>
            </AnimationContainer>
            <AnimationContainer delay={0.2} className="w-full pt-20">
                <Courses />
            </AnimationContainer>
        </div>
    )
};

export default CoursePage
