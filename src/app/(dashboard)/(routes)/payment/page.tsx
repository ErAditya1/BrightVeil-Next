// components/RazorpayCheckout.tsx
'use client'
import api from '@/api';
import GoBackButton from '@/components/GoBack';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/components/ui/use-toast';
import ValidatedImage from '@/components/ValidatedImage';
import { useAppSelector } from '@/store/hooks';
import { useTheme } from 'next-themes';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react';

const RazorpayCheckout = () => {
    const {resolvedTheme} = useTheme()
    const params = useSearchParams()
    const course = params.get('course')
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [amount, setAmount] = useState<number>(0); // default amount in INR
    const [savedAmount, setSavedAmount] = useState(0)
    const user = useAppSelector((state)=>state.auth.user)
    const [courseData, setCourseData] = useState({
        title: '',
        printPrice: 0,
        sellingPrice: 0,
        discount: 0,
        totalPrice: 0,
        isEnrolled: false,
        attachments: [],
        from: '',
        author: {
            _id: '',
            name: '',
            avatar: {
                secure_url: '',
            },
        },
        thumbnail: {
            secure_url: '',
        },
        chapters: [],
        language: '',
        description: '',
        _id: '',
        orderSummary: {
            totalAmount: 0,
            totalDiscount: 0,
            totalPrice: 0,
            orderItems: [],
        },
        orderItems: [],
        coupan: '',

    })

    const getCourseData = async () => {
        await api.get(`/v1/courses/course/order-summary/${course}`)
            .then((response) => {
                console.log(response)
                setCourseData(response.data.data)
                const summary = response.data.data
                if (summary.isEnrolled) {
                    toast({
                        title: 'Error',
                        description: 'You have already enrolled in this course.',
                        variant: 'destructive',
                    });
                    return router.push(`/courses/${course}`)

                }
                setAmount(summary.sellingPrice)
                setSavedAmount(summary?.printPrice- summary.sellingPrice)
            })
            .catch((err) => {
                console.error(err)
                toast({
                    title: 'Error',
                    description: 'Failed to fetch course data.',
                    variant: 'destructive',
                });
                router.push(`/courses/${course}`)
            }).finally(() => setLoading(false))
    }

    const userMandedatoryCheck = ()=>{
        if (!user) {
            toast({
                title: 'Error',
                description: 'You must be logged in to enroll in this course.',
                variant: 'destructive',
            });
            // router.push(`/auth/login?returnUrl=${router.asPath}`)
            return false
        }
        else if (!user.email || !user.name || !user.email || !user.mobileNumber ){
            toast({
                title: 'User details are required',
                description: 'Please check your email name or mobile number in profile',
                variant: 'destructive',
            });
            router.push(`/user/edit-profile`)
            return false
        }
        return true
    }

    

    const verifyAndEnrollCourse = async ({razorpay_payment_id,razorpay_order_id,razorpay_signature,amount}:{
        razorpay_payment_id:string,
        razorpay_order_id:string,
        razorpay_signature:string,
        amount:number,
    }) => {
        await api.post(`/v1/payment/verify/enroll/${course}`,{razorpay_payment_id,razorpay_order_id,razorpay_signature,amount,receiver_Id:courseData.author._id,course})
           .then((response) => {
                console.log(response)
                toast({
                    title: 'Success',
                    description: response.data.message,
                    variant:'success',
                });
                router.push(`/courses/${course}`)
            })
           .catch((err) => {
                console.error(err)
                toast({
                    title: 'Error',
                    description: err.response.data.message,
                    variant: 'destructive',
                });
            })
    }

    useEffect(() => {
        if (course) {
            getCourseData()
        }
        // eslint-disable-next-line
    }, [course])


    useEffect(() => {
        if (typeof window !== 'undefined' && !window.Razorpay) {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => console.log('Razorpay script loaded');
            document.body.appendChild(script);
        }
    }, []);


    const handlePayment = async () => {
        
        // check user details
        const res =userMandedatoryCheck()
        if (!res) return
        
        // 1. Create an order on the backend

        await api.post('/v1/payment/create-order', { amount: amount})
            .then((res) => {
                console.log(res);
                const order = res.data.data;
                if (typeof window !== 'undefined' && window.Razorpay) {
                    const options: any = {
                        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                        amount: order.amount,
                        currency: 'INR',
                        name: 'Bright Veil',
                        description: 'Transaction of course purchase',
                        order_id: order.id,
                        image:"/brightveilLight.jpg",
                        handler:  async (response: any) =>{
                            await verifyAndEnrollCourse({...response,amount: order.amount,})
                            
                        },
                        prefill: {
                            name: user?.name,
                            email: user?.email,
                            contact: user?.mobileNumber,
                        },
                        theme: {
                            color: resolvedTheme ==='dark'? '#030637':'#C6E7FF',
                            
                        },
                    };


                    const rzp1 = new (window as any).Razorpay(options);
                    rzp1.open();
                }
                else {
                    console.error('Razorpay library is not loaded!');
                }

            })
            .catch(err => {
                console.log(err);
                toast({
                    title: 'Payment Failed!',
                    description: err?.response?.data?.message,
                    variant: 'destructive',
                })
            });



    };

    return (
        <Suspense fallback={<div>Loading...</div>}>


        <div
            id=""
            className="flex flex-col gap-9 pb-5 md:gap-6 overflow-auto relative scrollbar-hide mx-auto max-w-[948px] px-3 w-full"
        >
            <GoBackButton />
            <span className="Typography_root__0mOSn font-bold Typography_regular__5kKM_">
                <span className="text-2xl lg:text-3xl">Order Summary</span>
            </span>
            <article className="grid grid-cols-10 gap-4 lg:gap-6 ">
                <section className="flex flex-col gap-4 col-span-10 md:col-span-6">
                    <div className="Card_root__nHisN  hover:shadow-all-round-strong shadow-all-round transition-all duration-200 rounded-xl backdrop-invert  backdrop-opacity-5 p-4 ">
                        {loading ? (
                            <div className="flex flex-col gap-5">
                                 <Skeleton className="  h-4 w-[50%] rounded-sm  "/>
                                <div className="flex gap-5 w-full">
                                    <div className="w-[250px] aspect-video bg-gray-300 animate-pulse rounded-sm overflow-hidden">
                                        <img
                                            src="https://www.tgsin.in/images/joomlart/demo/default.jpg"
                                            alt="loading-img"
                                            className="h-full w-full object-contain"
                                            
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2 justify-center w-full">
                                        <div className="w-[75%] h-3 bg-gray-300 animate-pulse rounded-sm"></div>
                                        <div className="w-[15%] h-3 bg-gray-300 animate-pulse rounded-sm"></div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-5">
                                <div className="w-[50%] h-4  text-xl">Items in cat:</div>
                                <div className="flex gap-5 w-full">
                                    <div className="w-[250px]   rounded-sm ">
                                        <ValidatedImage
                                            src={courseData?.thumbnail?.secure_url}
                                            alt="loading-img"
                                            className="aspect-video "
                                            height={500}
                                            width={500}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2 justify-center w-full">
                                        <div className="w-[75%]   rounded-sm">
                                            <p className='text-xs sm:text-sm'>{courseData?.title}</p>
                                        </div>
                                        <div className="w-[15%] h-3 ">
                                            <span>{courseData?.sellingPrice}</span>
                                            <span className="mx-2 line-through text-gray-500">
                                                {courseData?.printPrice}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    {loading ? (
                        <div className="Card_root__nHisN  hover:shadow-all-round-strong shadow-all-round transition-all duration-200 rounded-xl backdrop-invert  backdrop-opacity-5 p-4 ">
                            <div className="flex flex-col gap-5">
                                 <Skeleton className="  h-4 w-[50%] rounded-sm  "/>
                                <div className="flex flex-col gap-2 border border-gray-300 animate-pulse min-h-[250px] rounded-sm">
                                    <div className="flex items-center gap-2 w-full pt-2 px-2">
                                        <Skeleton className="  h-8 rounded-sm  " />
                                        <Skeleton className="  h-8 rounded-sm  " />
                                        <Skeleton className="  h-8 rounded-sm  " />
                                        <Skeleton className="  h-8 rounded-sm  " />
                                    </div>
                                    <div className="flex flex-col gap-4 pb-4 pt-2 px-4 border-b border-gray-300">
                                        <div className="flex flex-col gap-2">
                                             <Skeleton className="  h-3 w-[35%] rounded-sm  "/>
                                             <Skeleton className="  h-2 w-[75%] rounded-sm  "/>
                                             <Skeleton className="  h-2 w-[75%] rounded-sm  "/>
                                             <Skeleton className="  h-2 w-[75%] rounded-sm  "/>
                                             <Skeleton className="  h-2 w-[75%] rounded-sm  "/>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                             <Skeleton className="  h-3 w-[35%] rounded-sm  "/>
                                             <Skeleton className="  h-2 w-[75%] rounded-sm  "/>
                                             <Skeleton className="  h-2 w-[75%] rounded-sm  "/>
                                             <Skeleton className="  h-2 w-[75%] rounded-sm  "/>
                                             <Skeleton className="  h-2 w-[75%] rounded-sm  "/>
                                        </div>
                                    </div>
                                    <div className="p-2 pt-0 flex items-center justify-between">
                                         <Skeleton className="  h-8 w-[70px] rounded-sm  "/>
                                         <Skeleton className="  h-8 w-[70px] rounded-sm  "/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="Card_root__nHisN  hover:shadow-all-round-strong shadow-all-round transition-all duration-200 rounded-xl backdrop-invert  backdrop-opacity-5 p-4 ">
                            <div className="flex flex-col gap-5">
                                <div className="w-[50%] h-4 text-md  sm:text-lg">Recomended for You :</div>
                                {courseData?.orderItems ? (
                                    <div className="flex flex-col gap-2 border border-gray-300 animate-pulse min-h-[250px] rounded-sm">
                                        <div className="flex items-center gap-2 w-full pt-2 px-2">
                                            <Skeleton className="  h-8 rounded-sm  " />
                                            <Skeleton className="  h-8 rounded-sm  " />
                                            <Skeleton className="  h-8 rounded-sm  " />
                                            <Skeleton className="  h-8 rounded-sm  " />
                                            <Skeleton className="  h-8 rounded-sm  " />
                                        </div>
                                        <div className="flex flex-col gap-4 pb-4 pt-2 px-4 border-b border-gray-300">
                                            <div className="flex flex-col gap-2">
                                                 <Skeleton className="  h-3 w-[35%] rounded-sm  "/>
                                                 <Skeleton className="  h-2 w-[75%] rounded-sm  "/>
                                                 <Skeleton className="  h-2 w-[75%] rounded-sm  "/>
                                                 <Skeleton className="  h-2 w-[75%] rounded-sm  "/>
                                                 <Skeleton className="  h-2 w-[75%] rounded-sm  "/>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                 <Skeleton className="  h-3 w-[35%] rounded-sm  "/>
                                                 <Skeleton className="  h-2 w-[75%] rounded-sm  "/>
                                                 <Skeleton className="  h-2 w-[75%] rounded-sm  "/>
                                                 <Skeleton className="  h-2 w-[75%] rounded-sm  "/>
                                                 <Skeleton className="  h-2 w-[75%] rounded-sm  "/>
                                            </div>
                                        </div>
                                        <div className="p-2 pt-0 flex items-center justify-between">
                                             <Skeleton className="  h-8 w-[70px] rounded-sm  "/>
                                             <Skeleton className="  h-8 w-[70px] rounded-sm  "/>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="w-full h-full flex justify-center items-center">
                                        <span className="text-lg">Nothing recomended !</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </section>
                <section className="flex flex-col gap-4 col-span-10 md:col-span-4">
                    <div className="Card_root__nHisN  hover:shadow-all-round-strong shadow-all-round transition-all duration-200 rounded-xl backdrop-invert  backdrop-opacity-5 p-4 ">
                        <div className="flex flex-col gap-2">
                            {loading ? (
                                <>
                                    <section>
                                        <div className="flex justify-between items-center">
                                            <div className="flex gap-1.5 items-center w-full">
                                                <div className="flex flex-col w-full ">
                                                     <Skeleton className="  h-4 w-[70%] my-1 rounded-sm  "/>

                                                     <Skeleton className="  h-4 w-[70%] my-1 rounded-sm  "/>
                                                </div>
                                            </div>
                                            <div className="flex items-center opacity-40 cursor-not-allowed w-[50%]">
                                                 <Skeleton className="  h-4 w-[100%] rounded-sm  "/>
                                            </div>
                                        </div>
                                        <div className="flex border-t border-dashed border-t-[#D9DCE1] mt-2 pt-2 justify-center items-center gap-1 cursor-pointer">
                                             <Skeleton className="  h-4 w-[70%] rounded-sm  "/>
                                        </div>
                                    </section>
                                    <div className="flex flex-col gap-4 p-4 rounded-xl border border-[#EAECEF] w-full">
                                        <div className="w-[100%] h-6 bg-gray-300 animate-pulse rounded-sm"></div>
                                        <div className="flex flex-col gap-2">
                                            <div className="flex flex-col gap-1 border-b border-gray-300 pb-2">
                                                <div className="flex items-center justify-between">
                                                     <Skeleton className="  h-4 w-[50%] rounded-sm  "/>
                                                     <Skeleton className="  h-4 w-[25%] rounded-sm  "/>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                     <Skeleton className="  h-4 w-[50%] rounded-sm  "/>
                                                     <Skeleton className="  h-4 w-[25%] rounded-sm  "/>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                     <Skeleton className="  h-4 w-[50%] rounded-sm  "/>
                                                     <Skeleton className="  h-4 w-[25%] rounded-sm  "/>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                     <Skeleton className="  h-4 w-[50%] rounded-sm  "/>
                                                     <Skeleton className="  h-4 w-[25%] rounded-sm  "/>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                 <Skeleton className="  h-4 w-[50%] rounded-sm  "/>
                                                 <Skeleton className="  h-4 w-[25%] rounded-sm  "/>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        data-variant="primary"
                                        className="flex justify-center"
                                    >
                                         <Skeleton className="  h-8 w-[70%] rounded-sm  "/>
                                    </button>
                                </>
                            ) : (
                                <>
                                    {courseData?.coupan && (
                                        <section
                                            id="coupon_card"
                                            className="border w-full border-[#EAECEF] rounded-xl p-3"
                                        >
                                            <div className="flex justify-between items-center">
                                                <div className="flex gap-1.5 items-center">
                                                    <div>
                                                        <svg
                                                            width="24"
                                                            height="24"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                d=" 11.0382 8.47722 10.8781C8.09075 10.718 7.76043 10.447 7.52803 10.0991C7.29563 9.75134 7.17159 9.34243 7.17159 8.92412C7.17212 8.36335 7.39512 7.8257 7.79165 7.42917C8.18817 7.03265 8.72582 6.80965 9.28659 6.80912V6.80912ZM8.19459 16.2091C8.14105 16.2629 8.07743 16.3055 8.00739 16.3346C7.93734 16.3637 7.86224 16.3788 7.78639 16.3788C7.71053 16.3789 7.6354 16.364 7.56531 16.335C7.49521 16.306 7.43152 16.2635 7.37788 16.2098C7.32425 16.1562 7.28171 16.0925 7.25271 16.0224C7.22371 15.9523 7.20882 15.8772 7.20888 15.8013C7.20895 15.7255 7.22397 15.6504 7.25309 15.5803C7.28221 15.5103 7.32486 15.4467 7.37859 15.3931L14.9916 7.78012C15.0999 7.67222 15.2465 7.61169 15.3994 7.61183C15.5522 7.61196 15.6988 7.67274 15.8069 7.78083C15.915 7.88891 15.9758 8.03547 15.9759 8.18833C15.976 8.34118 15.9155 8.48785 15.8076 8.59612L8.19459 16.2091ZM13.9006 17.1861C13.4823 17.1861 13.0734 17.0621 12.7256 16.8297C12.3778 16.5973 12.1067 16.267 11.9466 15.8805C11.7865 15.494 11.7446 15.0688 11.8262 14.6585C11.9078 14.2482 12.1093 13.8714 12.4051 13.5756C12.7008 13.2798 13.0777 13.0784 13.488 12.9968C13.8982 12.9152 14.3235 12.957 14.71 13.1171C15.0964 13.2772 15.4268 13.5483 15.6592 13.8961C15.8915 14.2439 16.0156 14.6528 16.0156 15.0711C16.016 15.3492 15.9616 15.6247 15.8555 15.8817C15.7494 16.1388 15.5937 16.3724 15.3973 16.5693C15.2009 16.7662 14.9676 16.9224 14.7108 17.0291C14.454 17.1358 14.1787 17.1909 13.9006 17.1911V17.1861Z"
                                                                fill="#5A4BDA"
                                                            ></path>
                                                            <path
                                                                d="M13.9024 14.1152C13.7123 14.1152 13.5265 14.1716 13.3685 14.2772C13.2105 14.3828 13.0873 14.5329 13.0146 14.7085C12.9418 14.8841 12.9228 15.0773 12.9599 15.2637C12.997 15.4501 13.0885 15.6214 13.2229 15.7558C13.3573 15.8902 13.5285 15.9817 13.7149 16.0188C13.9014 16.0558 14.0946 16.0368 14.2702 15.9641C14.4458 15.8913 14.5959 15.7682 14.7014 15.6101C14.807 15.4521 14.8634 15.2663 14.8634 15.0762C14.8631 14.8214 14.7618 14.5772 14.5816 14.397C14.4015 14.2168 14.1572 14.1155 13.9024 14.1152Z"
                                                                fill="#5A4BDA"
                                                            ></path>
                                                            <path
                                                                d="M9.28522 7.96289C9.09515 7.96289 8.90935 8.01925 8.75131 8.12485C8.59328 8.23044 8.47011 8.38054 8.39737 8.55614C8.32464 8.73174 8.3056 8.92496 8.34268 9.11137C8.37976 9.29779 8.47129 9.46903 8.60568 9.60342C8.74008 9.73782 8.91132 9.82934 9.09773 9.86642C9.28415 9.9035 9.47737 9.88447 9.65297 9.81174C9.82857 9.739 9.97867 9.61583 10.0843 9.45779C10.1899 9.29976 10.2462 9.11396 10.2462 8.92389C10.246 8.6691 10.1446 8.42482 9.96445 8.24466C9.78428 8.06449 9.54001 7.96316 9.28522 7.96289Z"
                                                                fill="#5A4BDA"
                                                            ></path>
                                                        </svg>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="Typography_root__0mOSn font-medium Typography_regular__5kKM_">
                                                            <span
                                                                className="text-sm font-semibold"
                                                                id="apply_btn"
                                                            >
                                                                Apply Code/Coupon
                                                            </span>
                                                        </span>
                                                        <label className="Typography_root__0mOSn font-bold Typography_label__byL34">
                                                            <span className="text-gray-400">
                                                                no coupons available
                                                            </span>
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="flex items-center opacity-40 cursor-not-allowed">
                                                    <span className="Typography_root__0mOSn font-bold Typography_small__WFqk4">
                                                        <span className="text-primary" id="apply_btn">
                                                            APPLY
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex border-t border-dashed border-t-[#D9DCE1] mt-2 pt-2 justify-center items-center gap-1 cursor-pointer">
                                                <span className="Typography_root__0mOSn font-semibold Typography_tiny__Hgi_d">
                                                    <span className="text-gray-400" id="view_all_btn">
                                                        Apply Coupon Code
                                                    </span>
                                                </span>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                    aria-hidden="true"
                                                    height="12"
                                                    width="12"
                                                >
                                                    <path
                                                        fill-rule="evenodd"
                                                        d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
                                                        clip-rule="evenodd"
                                                    ></path>
                                                </svg>
                                            </div>
                                        </section>
                                    )}
                                    <div
                                        className="flex flex-col gap-4 p-4 rounded-xl border border-[#EAECEF]"
                                        id="payment_summary_card"
                                    >
                                        <h4 className="Typography_root__0mOSn font-bold Typography_heading4__NOaT9">
                                            Payment Summary
                                        </h4>
                                        <div className="flex flex-col gap-2">
                                            <div className="flex flex-col gap-1 border-b border-gray-300 pb-2">
                                                <div className="flex items-center justify-between">
                                                    <span className="Typography_root__0mOSn font-medium Typography_small__WFqk4">
                                                        <span className="text-gray-400" id="price_tag">
                                                            Price (1 items)
                                                        </span>
                                                    </span>
                                                    <span className="Typography_root__0mOSn font-medium Typography_small__WFqk4">
                                                        <span className="text-gray-400">
                                                            {courseData?.printPrice}
                                                        </span>
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="Typography_root__0mOSn font-medium Typography_small__WFqk4">
                                                        <span className="text-gray-400" id="discount_tag">
                                                            Discount
                                                        </span>
                                                    </span>
                                                    <span className="Typography_root__0mOSn font-medium Typography_small__WFqk4">
                                                        <span className="text-[#3F8E58]">
                                                            
                                                            {courseData?.discount}%
                                                        </span>
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="Typography_root__0mOSn font-medium Typography_small__WFqk4">
                                                        <span
                                                            className="text-gray-400"
                                                            id="delivery_charges"
                                                        >
                                                             Charges
                                                        </span>
                                                    </span>
                                                    <span className="Typography_root__0mOSn font-medium Typography_small__WFqk4">
                                                        <span className="text-gray-400">₹ 0</span>
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="Typography_root__0mOSn font-medium Typography_small__WFqk4">
                                                        <span
                                                            className="text-gray-400"
                                                            id="coupon_discount_tag"
                                                        >
                                                            Coupon Disc.
                                                        </span>
                                                    </span>
                                                    <span className="Typography_root__0mOSn font-medium Typography_small__WFqk4">
                                                        <span className="text-[#3F8E58]">- ₹ 0</span>
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="Typography_root__0mOSn font-medium Typography_small__WFqk4">
                                                        <span
                                                            className="text-gray-400"
                                                            id="coupon_discount_tag"
                                                        >
                                                            Saved Amount
                                                        </span>
                                                    </span>
                                                    <span className="Typography_root__0mOSn font-medium Typography_small__WFqk4">
                                                        <span className="text-[#3F8E58]">- ₹ 0
                                                            {courseData?.printPrice- courseData.sellingPrice}
                                                        </span>

                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="Typography_root__0mOSn font-bold Typography_regular__5kKM_">
                                                    <span className="text-gray-400" id="total_amount_tag">
                                                        Total Amount
                                                    </span>
                                                </span>
                                                <span className="Typography_root__0mOSn font-bold Typography_regular__5kKM_">
                                                    <span className="text-foreground">₹{amount}</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        data-variant="primary"
                                        className="flex justify-center"
                                        onClick={handlePayment}
                                    >
                                        <span className="font-bold whitespace-nowrap flex item-center transition justify-center bg-blue-900 text-white hover:bg-blue-500 hover:text-blue-800 p-2 w-36 rounded-lg px-4 ">
                                            <span className="text-sm sm:text-lg"  >
                                                Proceed To Buy
                                            </span>
                                        </span>
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </section>
            </article>
        </div>
        </Suspense>
    );
};

export default RazorpayCheckout;
