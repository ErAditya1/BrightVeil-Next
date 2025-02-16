import React from "react";

import Box from "@mui/joy/Box";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata = {
  title:
    "Bright Veil Learning Platform - Free & Paid Courses with Real-Time Doubt Solutions",
  description:
    "Bright Veil offers an extensive collection of both free and paid courses across various domains. Learn at your own pace and get real-time doubt-solving through our integrated chat app. Empower your learning journey with us.",
  keywords:
    "online learning platform, free courses, paid courses, doubt solutions, real-time chat, interactive learning, learning app, skill development, live courses, student communication",
  author: "Bright Veil Team",
  robots: "index, follow", // Ensures search engines index this page and follow links.

  // Open Graph (OG) Meta Tags for social media sharing
  og: {
    title:
      "Bright Veil Learning Platform - Free & Paid Courses with Real-Time Doubt Solutions",
    description:
      "Explore free and paid courses across various domains and interact with fellow learners and instructors for real-time doubt solutions via our integrated chat app. Join Bright Veil and start learning today!",
    image: "/brightveilLight.jpg", // Image for social media preview (make sure to use a relevant image here)
    url: "https://brightveil.vercel.app", // Main platform URL
    type: "website", // Type of content
  },

  // Twitter Meta Tags for optimized sharing on Twitter
  twitter: {
    card: "summary_large_image", // Type of Twitter card
    title:
      "Bright Veil Learning Platform - Free & Paid Courses with Real-Time Doubt Solutions",
    description:
      "Bright Veil offers a vast library of free and paid courses, with real-time doubt-solving through an integrated chat app. Join our learning community today!",
    image: "/brightveilLight.jpg", // Image for Twitter sharing
  },
};

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: "flex" }}>
      <Header />
      <Sidebar />

      <Box
        component="main"
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          height: "100dvh",
          gap: 1,
          overflow: "auto",
        }}
        className=" pt-14 br:m-0 MainContent "
      >
        <Navbar />
        {children}

        <Footer />
      </Box>
    </Box>
  );
}

export default DashboardLayout;
