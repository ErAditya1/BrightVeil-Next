import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
import { AiFillTwitterCircle } from 'react-icons/ai';
import { FaInstagramSquare } from 'react-icons/fa';
import { FaFacebook, FaLinkedin } from 'react-icons/fa6';
import { ImProfile } from "react-icons/im";


export const metadata = {
    title: "Support - Bright Veil Learning Platform",
    description: "Need assistance? Contact Bright Veil support for any questions, course help, or platform-related inquiries. We're here to help!",
    keywords: "support, help, contact, customer service, Bright Veil, learning platform, technical support, contact us, React, online learning, help center",
    author: "Aditya Kumar",
    robots: "index, follow", // Direct search engines to index this page
    og: {
      title: "Support - Bright Veil Learning Platform",
      description: "Need assistance? Contact Bright Veil support for any questions, course help, or platform-related inquiries. We're here to help!",
      image: "/brightveilLight.jpg", // Optional image for social sharing (e.g., Facebook, Twitter)
      url: "https://brightveil.vercel.app/support", // The URL of your support page
      type: "website", // Open Graph type
    },
    twitter: {
      card: "summary_large_image",
      title: "Support - Bright Veil Learning Platform",
      description: "Need assistance? Contact Bright Veil support for any questions, course help, or platform-related inquiries. We're here to help!",
      image: "/brightveilLight.jpg", // Optional image for Twitter
    },
  };
const SupportPage = () => {
    return (
        <div className="bg-gradient-to-r bg-background text-foreground">
            <div className="max-w-screen-xl mx-auto p-2 sm:p-8">
                {/* Page Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold  mb-4">
                        Need Help? We're Here for You!
                    </h1>
                    <p className=" text-lg">
                        Contact us through any of the methods below. We're happy to assist you!
                    </p>
                </div>

                {/* Contact Form */}
                <div className="flex justify-center mb-16">
                    <div className="w-full max-w-lg">
                        <div className="bg-card text-card-foreground p-6 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-semibold  mb-6">
                                Send Us a Message
                            </h2>

                            <form>
                                <div className="space-y-4">
                                    {/* Name Field */}
                                    <div>
                                        <label className="block ">Your Name</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2  border-border rounded-md"
                                            required
                                        />
                                    </div>

                                    {/* Email Field */}
                                    <div>
                                        <label className="block ">Email Address</label>
                                        <input
                                            type="email"
                                            className="w-full px-4 py-2  border-border rounded-md"
                                            required
                                        />
                                    </div>

                                    {/* Message Field */}
                                    <div>
                                        <label className="block ">Your Message</label>
                                        <textarea
                                            className="w-full px-4 py-2 border border--border rounded-md"

                                            required
                                        ></textarea>
                                    </div>

                                    <div className="text-center mt-4">
                                        <Button
                                            type="submit"
                                            className="w-full py-3  transition"
                                        >
                                            Send Message
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Social Media Links */}
                <div className="flex justify-center space-x-4  sm:space-x-8 mb-16 bg-card text-card-foreground rounded sm:p-2 py-4">
                    <a
                        href="https://www.facebook.com/adityakumar411/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-700 hover:text-blue-800 transition"
                    >
                        <span className="text-3xl"><FaFacebook /></span>
                    </a>
                    <a
                        href="https://twitter.com/excited_adi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 transition"
                    >
                        <span className="text-3xl"><AiFillTwitterCircle /></span>
                    </a>
                    <a
                        href="https://linkedin.com/in/adityaji1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-700 hover:text-blue-800 transition"
                    >
                        <span className="text-3xl"><FaLinkedin /></span>
                    </a>
                    <a
                        href="https://www.instagram.com/excited_adi/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className=" text-pink-600 hover:text-red-600 transition"
                    >
                        <span className="text-3xl"><FaInstagramSquare /></span>
                    </a>
                </div>

                {/* Developer & Platform Owner Info */}
                <div className="bg-background text-foreground border border-border p-2 sm:p-8 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-6">
                        Contact Developer or Platform Owner
                    </h2>
                    <div className="mb-4">
                        <p className="text-lg font-semibold">Developer: Aditya Kumar</p>
                        <p className="text-gray-600">
                            Email: <a href="mailto:mradityaji2@gmail.com" target='_blank' className="text-indigo-600">mradityaji2@gmail.com</a>
                        </p>
                        <p className="text-gray-600">Phone: +91 9473774390</p>
                        <div className=" flex flex-row gap-2 items-center">
                            <p className='text-gray-600'>Portfolio: </p>
                            <ImProfile />
                            <a href='https://eraditya.great-site.net' target='_blank' className='text-blue-600'>https://eraditya.great-site.net</a>


                        </div>
                        <p className="text-gray-600 space-x-3">Message Us:
                            <Link href={'/chat?u=aditya'}>
                                <Button>Message</Button>
                            </Link>
                        </p>
                    </div>
                    <div>
                        <p className="text-lg font-semibold">Platform Owner: Mr. Owner</p>
                        <p className="text-gray-600">
                            Email: <a href="mailto:owner@example.com" className="text-indigo-600">owner@example.com</a>
                        </p>
                        <p className="text-gray-600">Phone: +91 987 654 321</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SupportPage;
