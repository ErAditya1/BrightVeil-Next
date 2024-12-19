import React from 'react'
import AnimationContainer from '@/app/(marketing)/components/global/animation-container';
import MaxWidthWrapper from '@/app/(marketing)/components/global/max-width-wrapper';
import { BorderBeam } from '@/components/ui/border-beam';
import Image from 'next/image';



const CoursePage = () => {
    return (
        <div className="flex flex-col items-center justify-center py-20">
            <MaxWidthWrapper>

                <AnimationContainer delay={0.1}>
                    <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold font-heading text-center mt-6 !leading-tight">
                        Courses
                    </h1>
                    <p className="text-base md:text-lg mt-6 text-center text-muted-foreground">
                        Get in touch with us to learn more about our enterprise solutions.
                    </p>
                </AnimationContainer>

                <AnimationContainer delay={0.2} className="relative pt-20 pb-20 md:py-32 px-2 bg-transparent w-full">
                    <div className="absolute md:top-[10%] left-1/2 gradient w-3/4 -translate-x-1/2 h-1/4 md:h-1/3 inset-0 blur-[5rem] animate-image-glow"></div>
                    <div className="-m-2 rounded-xl p-2 ring-1 ring-inset ring-foreground/20 lg:-m-4 lg:rounded-2xl bg-opacity-50 backdrop-blur-3xl">
                        <BorderBeam
                            size={250}
                            duration={12}
                            delay={9}
                        />
                        <Image
                            src={`/assets/dark/course.png`}
                            alt="Dashboard"
                            width={1200}
                            height={1200}
                            quality={100}
                            className="rounded-md lg:rounded-xl bg-foreground/10 ring-1 ring-border hidden dark:block"
                        />
                        <Image
                            src={`/assets/light/course.png`}
                            alt="Dashboard"
                            width={1200}
                            height={1200}
                            quality={100}
                            className="rounded-md lg:rounded-xl bg-foreground/10 ring-1 ring-border dark:hidden"
                        />
                        <div className="absolute -bottom-4 inset-x-0 w-full h-1/2 bg-gradient-to-t from-background z-40"></div>
                        <div className="absolute bottom-0 md:-bottom-8 inset-x-0 w-full h-1/4 bg-gradient-to-t from-background z-50"></div>
                    </div>
                </AnimationContainer>
                <AnimationContainer delay={0.2} className="relative pt-20 pb-20 md:py-32 px-2 bg-transparent w-full">
                    <div className="absolute md:top-[10%] left-1/2 gradient w-3/4 -translate-x-1/2 h-1/4 md:h-1/3 inset-0 blur-[5rem] animate-image-glow"></div>
                    <div className="-m-2 rounded-xl p-2 ring-1 ring-inset ring-foreground/20 lg:-m-4 lg:rounded-2xl bg-opacity-50 backdrop-blur-3xl">
                        <BorderBeam
                            size={250}
                            duration={12}
                            delay={9}
                        />
                        <Image
                            src={`/assets/dark/course_form.png`}
                            alt="Dashboard"
                            width={1200}
                            height={1200}
                            quality={100}
                            className="rounded-md lg:rounded-xl bg-foreground/10 ring-1 ring-border hidden dark:block"
                        />
                        <Image
                            src={`/assets/light/course_form.png`}
                            alt="Dashboard"
                            width={1200}
                            height={1200}
                            quality={100}
                            className="rounded-md lg:rounded-xl bg-foreground/10 ring-1 ring-border dark:hidden"
                        />
                        <div className="absolute -bottom-4 inset-x-0 w-full h-1/2 bg-gradient-to-t from-background z-40"></div>
                        <div className="absolute bottom-0 md:-bottom-8 inset-x-0 w-full h-1/4 bg-gradient-to-t from-background z-50"></div>
                    </div>
                </AnimationContainer>
                <AnimationContainer delay={0.2} className="relative pt-20 pb-20 md:py-32 px-2 bg-transparent w-full">
                    <div className="absolute md:top-[10%] left-1/2 gradient w-3/4 -translate-x-1/2 h-1/4 md:h-1/3 inset-0 blur-[5rem] animate-image-glow"></div>
                    <div className="-m-2 rounded-xl p-2 ring-1 ring-inset ring-foreground/20 lg:-m-4 lg:rounded-2xl bg-opacity-50 backdrop-blur-3xl">
                        <BorderBeam
                            size={250}
                            duration={12}
                            delay={9}
                        />
                        <Image
                            src={`/assets/dark/post.png`}
                            alt="Dashboard"
                            width={1200}
                            height={1200}
                            quality={100}
                            className="rounded-md lg:rounded-xl bg-foreground/10 ring-1 ring-border hidden dark:block"
                        />
                        <Image
                            src={`/assets/light/post.png`}
                            alt="Dashboard"
                            width={1200}
                            height={1200}
                            quality={100}
                            className="rounded-md lg:rounded-xl bg-foreground/10 ring-1 ring-border dark:hidden"
                        />
                        <div className="absolute -bottom-4 inset-x-0 w-full h-1/2 bg-gradient-to-t from-background z-40"></div>
                        <div className="absolute bottom-0 md:-bottom-8 inset-x-0 w-full h-1/4 bg-gradient-to-t from-background z-50"></div>
                    </div>
                </AnimationContainer>
            </MaxWidthWrapper>

        </div>
    )
};

export default CoursePage
