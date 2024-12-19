import React from 'react';
import AnimationContainer from '../../../components/global/animation-container';
import MaxWidthWrapper from '@/app/(marketing)/components/global/max-width-wrapper';
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
    question: "Is it accessible?",
    answer: "Yes. It adheres to the WAI-ARIA design pattern, ensuring accessibility for all users.",
  },
  {
    id: "item-2",
    question: "What features does the software offer?",
    answer: "Our link management software offers features like link shortening, click tracking, customizable branded links, and AI-powered suggestions.",
  },
  {
    id: "item-3",
    question: "How does the pricing work?",
    answer: "We offer three plans: Free, Pro ($9/month), and Business ($49/month). Yearly subscriptions come with a discount.",
  },
  {
    id: "item-4",
    question: "Can I upgrade or downgrade my plan?",
    answer: "Yes! You can easily upgrade or downgrade your plan at any time through your account settings.",
  },
  {
    id: "item-5",
    question: "Is there customer support available?",
    answer: "Absolutely! We provide community support for all users and priority support for Pro and Business plan subscribers.",
  },
  {
    id: "item-6",
    question: "Can I track my link clicks?",
    answer: "Yes, our software allows you to track clicks on your links, providing insights into user engagement and demographics.",
  },
  {
    id: "item-7",
    question: "Is there a mobile app available?",
    answer: "Currently, we do not have a dedicated mobile app, but our web application is fully responsive and works well on mobile devices.",
  },
  {
    id: "item-8",
    question: "What payment methods do you accept?",
    answer: "We accept various payment methods including credit cards, PayPal, and other secure payment options.",
  },
];

// EnterprisePage component
const EnterprisePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <AnimationContainer delay={0.1}>
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold font-heading text-center mt-6 !leading-tight">
          Enterprise
        </h1>
        <p className="text-base md:text-lg mt-6 text-center text-muted-foreground">
          Get in touch with us to learn more about our enterprise solutions.
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
  );
};

export default EnterprisePage;
