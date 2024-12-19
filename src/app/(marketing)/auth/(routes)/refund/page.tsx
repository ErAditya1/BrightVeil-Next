import React from 'react';
import MaxWidthWrapper from '../../../components/global/max-width-wrapper';
import AnimationContainer from '../../../components/global/animation-container';

const RefundPolicy = () => {
    return (
        <MaxWidthWrapper className="max-w-3xl mx-auto px-8 mb-40">
            <AnimationContainer delay={0.1} className="w-full">
                <h1 className="text-4xl md:text-6xl font-heading font-bold my-12 text-center w-full">
                    Refund Policy
                </h1>
                <p className="text-sm mb-2 italic mt-20">
                    Last updated: 17th December 2025
                </p>
                <p className="mt-4">
                    At <strong>Bright Veil</strong>, we aim to provide a seamless and enriching learning experience. We understand that sometimes a course may not meet your expectations. This Refund Policy outlines the conditions under which we offer refunds for our paid courses.
                </p>

                <h2 className="text-xl font-medium mt-8">
                    Refund Eligibility
                </h2>

                <h3 className="text-lg mt-4">
                    1. Course Cancellation
                </h3>
                <p className="mt-8 text-muted-foreground">
                    If you have purchased a course but decide to cancel your enrollment before starting, you are eligible for a full refund within the first 7 days of purchase. 
                </p>

                <h3 className="text-lg mt-8">
                    2. Unavailability of Course Content
                </h3>
                <p className="mt-8 text-muted-foreground">
                    In the event that the course content is unavailable, or we are unable to provide access to the course for any reason, you will be eligible for a full refund. Please contact our support team to initiate the refund process in such cases.
                </p>

                <h3 className="text-lg mt-8">
                    3. Dissatisfaction with Course Content
                </h3>
                <p className="mt-8 text-muted-foreground">
                    If you are dissatisfied with the course content, we offer a 30-day money-back guarantee. You must provide feedback on why the course did not meet your expectations, and we will review your case to determine eligibility for a refund.
                </p>

                <h3 className="text-lg mt-8">
                    4. Non-refundable Conditions
                </h3>
                <p className="mt-8 text-muted-foreground">
                    Refunds are not available for the following cases:
                    <ul className="list-disc ml-8 text-muted-foreground">
                        <li>If you have completed more than 50% of the course content.</li>
                        <li>If the refund request is made after the 30-day refund window has expired.</li>
                        <li>If you have accessed the course materials or participated in course forums and discussions.</li>
                    </ul>
                </p>

                <h2 className="text-xl font-medium mt-12">
                    How to Request a Refund
                </h2>
                <p className="mt-8 text-muted-foreground">
                    To request a refund, please contact us within the eligible time period via email or phone with the following details:
                </p>
                <ul className="list-disc ml-8 text-muted-foreground">
                    <li>Your full name and email address used for registration.</li>
                    <li>The course title you wish to request a refund for.</li>
                    <li>A brief explanation of why you are requesting the refund.</li>
                </ul>

                <h3 className="text-lg mt-8">
                    Contact Information
                </h3>
                <p className="mt-8 text-muted-foreground">
                    You can reach us at:
                </p>
                <ul className="list-disc ml-8 text-muted-foreground">
                    <li>Email: <a href="mailto:mradityaji2@gmail.com" className="text-blue-600">mradityaji2@gmail.com</a></li>
                    <li>Phone: <a href="tel:+919473774390" className="text-blue-600">+91 94737 74390</a></li>
                </ul>

                <h2 className="text-xl font-medium mt-12">
                    Refund Process
                </h2>
                <p className="mt-8 text-muted-foreground">
                    Once your refund request is received, we will process it within 7 business days. If your request is approved, the refund will be issued to the original payment method.
                </p>

                <h2 className="text-xl font-medium mt-12">
                    Changes to This Refund Policy
                </h2>
                <p className="mt-8 text-muted-foreground">
                    We may update this Refund Policy from time to time. Any changes will be communicated via email or posted on our website with the updated "Last Updated" date at the top of this page.
                </p>

                <h2 className="text-xl font-medium mt-12">
                    Contact Us
                </h2>
                <p className="mt-8 text-muted-foreground">
                    If you have any questions or concerns regarding this Refund Policy, or if you wish to request a refund, please contact us at:
                </p>
                <ul className="list-disc ml-8 text-muted-foreground">
                    <li>Email: <a href="mailto:mradityaji2@gmail.com" className="text-blue-600">mradityaji2@gmail.com</a></li>
                    <li>Phone: <a href="tel:+919473774390" className="text-blue-600">+91 94737 74390</a></li>
                </ul>

                <p className="mt-8 font-medium">
                    By using Bright Veil's learning platform, you acknowledge that you have read, understood, and agree to the terms of this Refund Policy.
                </p>
            </AnimationContainer>
        </MaxWidthWrapper>
    );
};

export default RefundPolicy;
