
import AnimationContainer from '@/app/(marketing)/components/global/animation-container';
import MaxWidthWrapper from '@/app/(marketing)/components/global/max-width-wrapper';
import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// Define the type for FAQ items
interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

// FAQ data with correct typing
const FAQ: FAQItem[] = [
    {
      id: "item-1",
      question: "Is Bright Veil accessible?",
      answer: "Yes. Bright Veil adheres to the WAI-ARIA design pattern, ensuring accessibility for all users, including those with disabilities.",
    },
    {
      id: "item-2",
      question: "Do I need a credit card to sign up?",
      answer: "No, signing up is free, and no credit card is required. You can browse courses and access some free content immediately after signing up.",
    },
    {
      id: "item-3",
      question: "What courses are available on Bright Veil?",
      answer: "Bright Veil offers a wide range of courses, both free and paid, across various categories such as technology, business, and personal development. Explore the course catalog to find courses that match your interests.",
    },
    {
      id: "item-4",
      question: "How can I enroll in a course?",
      answer: "To enroll in a course, simply browse through the available courses, select one, and click the 'Enroll' button. You can enroll in both free and paid courses.",
    },
    {
      id: "item-5",
      question: "Can I download notes and materials from the courses?",
      answer: "Yes, you can download course materials, including notes, presentations, and other resources, for offline access.",
    },
    {
      id: "item-6",
      question: "Are quizzes available in every course?",
      answer: "Not every course includes quizzes, but many courses offer quizzes to help you test your knowledge and track your progress.",
    },
    {
      id: "item-7",
      question: "How can I track my progress in a course?",
      answer: "Bright Veil offers a progress tracker for each course. You can see your completion percentage, track lessons you have completed, and monitor your quiz scores.",
    },
    {
      id: "item-8",
      question: "Can I interact with other learners and instructors?",
      answer: "Yes, Bright Veil offers chat functionalities, including one-on-one and group chats with instructors and peers to ask questions, clarify doubts, and discuss course topics.",
    },
    {
      id: "item-9",
      question: "Can I write and share blog posts?",
      answer: "Yes! As a member of the Bright Veil community, you can write and share your blog posts to engage with others and contribute your knowledge and ideas.",
    },
    {
      id: "item-10",
      question: "Is my personal data secure on Bright Veil?",
      answer: "Yes, Bright Veil is committed to ensuring the privacy and security of your data. We use industry-standard encryption to protect your information. Please review our Privacy Policy for more details.",
    },
    {
      id: "item-11",
      question: "How do I reset my password?",
      answer: "If you've forgotten your password, click on the 'Forgot Password' link on the login page, and we'll send you instructions to reset it.",
    },
    {
      id: "item-12",
      question: "Can I cancel my subscription?",
      answer: "Yes, you can cancel your subscription at any time. If you are subscribed to a paid course or membership, you will lose access at the end of the billing cycle after cancellation.",
    },
    {
      id: "item-13",
      question: "Do you offer any discounts for courses?",
      answer: "Bright Veil occasionally offers discounts and promotions for paid courses. Keep an eye on our site for any announcements regarding discounts.",
    },
    {
      id: "item-14",
      question: "How do I contact support?",
      answer: "If you need help, you can contact our support team by emailing us at support@brightveil.io. We’ll respond to your inquiry as quickly as possible.",
    },
    {
      id: "item-15",
      question: "How do I update my profile information?",
      answer: "To update your profile information, go to your account settings, and edit your details such as name, email address, and password.",
    },
    {
      id: "item-16",
      question: "Can I switch between free and paid courses?",
      answer: "Yes, you can switch between free and paid courses at any time. If you upgrade to a paid course, you will get access to additional content not available in free courses.",
    },
    {
      id: "item-17",
      question: "Can I get a certificate after completing a course?",
      answer: "Yes, Bright Veil offers certificates of completion for many courses. You can download and print these certificates once you've completed a course.",
    },
    {
      id: "item-18",
      question: "Is there a mobile app for Bright Veil?",
      answer: "Currently, Bright Veil does not offer a dedicated mobile app. However, you can access the platform through your mobile browser, which is fully optimized for mobile use.",
    },
    {
      id: "item-19",
      question: "What payment methods do you accept for paid courses?",
      answer: "We accept various payment methods including credit cards, debit cards, and PayPal for paid courses and subscriptions.",
    },
    {
      id: "item-20",
      question: "Can I refund a paid course?",
      answer: "We offer a refund policy for paid courses. Please review our refund policy for more information or contact support if you are unsatisfied with your purchase.",
    },
    {
      id: "item-21",
      question: "How do I unsubscribe from email notifications?",
      answer: "You can unsubscribe from email notifications by clicking the 'unsubscribe' link at the bottom of any email we send you or by managing your preferences in the account settings.",
    },
    {
      id: "item-22",
      question: "How do I report inappropriate content?",
      answer: "If you encounter inappropriate content, you can report it by clicking on the 'Report' button next to the content, or by contacting support@brightveil.io with details.",
    },
    {
      id: "item-23",
      question: "Can I share my course materials with others?",
      answer: "Course materials are intended for personal use only. Sharing materials with others without authorization is prohibited under our terms of service.",
    },
    {
      id: "item-24",
      question: "Is Bright Veil available in other languages?",
      answer: "Currently, Bright Veil is only available in English. However, we plan to add support for other languages in the future.",
    },
    {
      id: "item-25",
      question: "What happens if I fail a quiz?",
      answer: "If you fail a quiz, you can retake it. Most courses allow multiple attempts to ensure you can learn and improve your understanding of the material.",
    },
  ];
  

const HelpPage = () => {
    return (
        <div className="flex flex-col items-center justify-center py-20">
            <AnimationContainer delay={0.1} className="w-full">
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold font-heading text-center mt-6 !leading-tight">
                    Help
                </h1>
                <p className="text-base md:text-lg mt-6 text-center text-muted-foreground">
                    Need help? We got you.
                </p>
            </AnimationContainer>
            <MaxWidthWrapper className="mb-40">
                <AnimationContainer delay={0.3}>
                    <div className="mt-20 w-full">
                        <div className="flex flex-col items-center justify-center w-full pt-12">
                            <h2 className="mt-6 text-2xl font-semibold text-center lg:text-3xl xl:text-4xl">
                                Frequently Asked Questions
                            </h2>
                            <p className="max-w-lg mt-6 text-center text-neutral-500">
                                Here are some of the most common questions we get asked. If you have a question that isn&apos;t answered here, feel free to reach out to us.
                            </p>
                        </div>

                        <div className="max-w-3xl mx-auto w-full mt-20">
                            <Accordion type="single" collapsible>
                                {FAQ.map((faq) => (
                                    <AccordionItem key={faq.id} value={faq.id}>
                                        <AccordionTrigger aria-expanded="false">{faq.question}</AccordionTrigger>
                                        <AccordionContent>{faq.answer}</AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    </div>
                </AnimationContainer>
            </MaxWidthWrapper>
        </div>
    )
};

export default HelpPage
