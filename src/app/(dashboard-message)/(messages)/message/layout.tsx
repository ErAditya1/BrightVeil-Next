
import { ReactNode } from "react";

// SEO Metadata for Chat Page
export const metadata = {
    title: "Real-time Chat - Bright Veil Learning Platform", // Title for the Chat Page
    description: "Engage in real-time conversations with fellow learners and instructors on Bright Veil. Connect, share, and collaborate instantly!", // Short and SEO-friendly description
    keywords: "real-time chat, messaging, Bright Veil, live chat, learning platform, instant messaging, student communication, online learning", // Keywords specific to chat features and the platform
    author: "Aditya Kumar", // Author meta tag for content attribution
    robots: "index, follow", // Tells search engines to index this page and follow links
  
    // Open Graph (OG) Meta Tags for social media sharing
    og: {
      title: "Real-time Chat - Bright Veil Learning Platform",
      description: "Engage in real-time conversations with fellow learners and instructors on Bright Veil. Connect, share, and collaborate instantly!",
      image: "/brightveilLight.jpg", // Image for social media preview
      url: "https://brightveil.vercel.app/chat", // Chat page URL
      type: "website",
    },
  
    // Twitter Meta Tags for Twitter Card optimization
    twitter: {
      card: "summary_large_image", // Card type for Twitter
      title: "Real-time Chat - Bright Veil Learning Platform",
      description: "Engage in real-time conversations with fellow learners and instructors on Bright Veil. Connect, share, and collaborate instantly!",
      image: "/brightveilLight.jpg", // Image for Twitter sharing
    },
  };

  const ChatLayout = ({ children }: { children: ReactNode }) => {
    return (
      <>
        {children}
      </>
    );
  };
  
  export default ChatLayout;