import React from 'react';
import MaxWidthWrapper from '../../../components/global/max-width-wrapper';
import AnimationContainer from '../../../components/global/animation-container';

const Privacy = () => {
    return (
        <MaxWidthWrapper className="max-w-3xl mx-auto px-8 mb-40">
            <AnimationContainer delay={0.1} className="w-full">
                <h1 className="text-4xl md:text-6xl font-heading font-bold my-12 text-center w-full">
                    Privacy Policy
                </h1>
                <p className="text-sm mb-2 italic mt-20">
                    Last updated: 19th December 2025
                </p>
                <p className="mt-4">
                    At <strong>Bright Veil</strong>, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website, register for courses, and access our services.
                </p>

                <h2 className="text-xl font-medium mt-8">
                    Information We Collect
                </h2>

                <h3 className="text-lg mt-4">
                    Personal Information
                </h3>
                <p className="mt-8 text-muted-foreground">
                    When you register for an account, purchase courses, or use our services, we collect personal information that can identify you. This includes your:
                    <ul className="list-disc ml-8 text-muted-foreground">
                        <li>Full name</li>
                        <li>Email address</li>
                        <li>Billing information (payment details, such as credit card information)</li>
                        <li>Profile details (e.g., username, password)</li>
                        <li>Course purchase and usage history</li>
                    </ul>
                </p>

                <h3 className="text-lg font-medium mt-12">
                    Non-Personal Information
                </h3>
                <p className="mt-8 text-muted-foreground">
                    We may collect non-personal information, which does not directly identify you. This can include:
                    <ul className="list-disc ml-8 text-muted-foreground">
                        <li>IP addresses</li>
                        <li>Browser types and device information</li>
                        <li>Referring URLs</li>
                        <li>Usage data (such as time spent on courses, pages visited, and interactions)</li>
                    </ul>
                </p>

                <h3 className="text-lg font-medium mt-8">
                    Cookies and Tracking Technologies
                </h3>
                <p className="mt-8">
                    We use cookies and similar tracking technologies to enhance your experience with our platform. Cookies are used to store your preferences, analyze usage patterns, and personalize your experience. You can manage or disable cookies through your browser settings.
                </p>

                <h2 className="text-xl font-medium mt-12">
                    How We Use Your Information
                </h2>

                <h3 className="text-lg mt-8">
                    To Provide and Improve Our Services
                </h3>
                <div className="mt-8">
                    We use the information we collect to:
                    <ul className="list-disc ml-8 text-muted-foreground">
                        <li>Provide access to courses, content, and educational resources.</li>
                        <li>Process payments and manage your account.</li>
                        <li>Improve our services, including website functionality, course content, and platform performance.</li>
                        <li>Personalize your experience and recommend relevant courses or resources.</li>
                    </ul>
                </div>

                <h3 className="text-xl font-medium mt-12">
                    Communication
                </h3>
                <div className="mt-8">
                    We may use your contact details to:
                    <ul className="list-disc ml-8 text-muted-foreground">
                        <li>Send you important updates related to your account, courses, or platform maintenance.</li>
                        <li>Notify you about new courses, promotions, and other educational materials.</li>
                        <li>Respond to your inquiries, provide customer support, and resolve issues related to your account or course experience.</li>
                    </ul>
                </div>

                <h3 className="text-lg mt-8">
                    Analytics and Research
                </h3>
                <div className="mt-8">
                    We use non-personal information for internal purposes, including:
                    <ul className="list-disc ml-8 text-muted-foreground">
                        <li>Monitoring and analyzing trends in course engagement and user preferences.</li>
                        <li>Conducting research to improve our platform, content, and services.</li>
                    </ul>
                </div>

                <h2 className="text-xl font-medium mt-12">
                    How We Share Your Information
                </h2>

                <h3 className="text-lg mt-8">
                    Service Providers
                </h3>
                <p className="mt-8 text-muted-foreground">
                    We may share your information with third-party service providers who assist us in operating our platform, such as payment processors, email marketing services, course hosting providers, and analytics partners.
                </p>

                <h3 className="text-lg mt-8">
                    Legal Requirements
                </h3>
                <p className="mt-8 text-muted-foreground">
                    We may disclose your information if required to do so by law or in response to valid requests by public authorities, such as a court order or government investigation.
                </p>

                <h3 className="text-lg mt-8">
                    Business Transfers
                </h3>
                <p className="mt-8 text-muted-foreground">
                    In the event of a merger, acquisition, or sale of some or all of our assets, your information may be transferred to the acquiring entity.
                </p>

                <h2 className="text-xl font-medium mt-12">
                    Data Security
                </h2>
                <p className="mt-8 text-muted-foreground">
                    We implement reasonable security measures to protect your personal information against unauthorized access, alteration, and disclosure. However, please note that no method of electronic storage or transmission is 100% secure.
                </p>

                <h2 className="text-xl font-medium mt-12">
                    Data Retention
                </h2>
                <p className="mt-8 text-muted-foreground">
                    We retain your personal information for as long as necessary to fulfill the purposes for which it was collected, comply with legal obligations, resolve disputes, and enforce our agreements. After this period, your data will be securely deleted or anonymized.
                </p>

                <h2 className="text-xl font-medium mt-12">
                    Your Rights and Choices
                </h2>

                <h3 className="text-lg mt-8">
                    Access and Update
                </h3>
                <p className="mt-8 text-muted-foreground">
                    You have the right to access, update, or correct your personal information by logging into your account. You can also update your email preferences and course settings through your account settings.
                </p>

                <h3 className="text-lg mt-8">
                    Opt-Out of Marketing Communications
                </h3>
                <p className="mt-8 text-muted-foreground">
                    You may opt out of receiving promotional emails or notifications from us by following the unsubscribe instructions in those communications. You may also contact us directly to opt out.
                </p>

                <h3 className="text-lg mt-8">
                    Data Deletion
                </h3>
                <p className="mt-8 text-muted-foreground">
                    You can request the deletion of your personal information by contacting us at <a href="mailto:mradityaji2@gmail.com" className="text-blue-600">mradityaji2@gmail.com</a>. Please note that some data may need to be retained for legal or operational purposes.
                </p>

                <h2 className="text-xl font-medium mt-12">
                    Children's Privacy
                </h2>
                <p className="mt-8 text-muted-foreground">
                    Our platform is not intended for individuals under the age of 18, and we do not knowingly collect personal information from children. If we learn that we have collected personal information from a child under 18, we will take steps to delete that information.
                </p>

                <h2 className="text-xl font-medium mt-12">
                    International Data Transfers
                </h2>
                <p className="mt-8 text-muted-foreground">
                    Your personal information may be transferred to and processed in countries other than your own. We ensure that appropriate safeguards are in place to protect your data in accordance with applicable data protection laws.
                </p>

                <h2 className="text-xl font-medium mt-12">
                    Changes to This Privacy Policy
                </h2>
                <p className="mt-8 text-muted-foreground">
                    We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the updated policy on our website with the updated "Last Updated" date.
                </p>

                <h2 className="text-xl font-medium mt-12">
                    Contact Us
                </h2>
                <p className="mt-8 text-muted-foreground">
                    If you have any questions or concerns about this Privacy Policy or how we handle your personal information, please contact us at:
                </p>
                <ul className="list-disc ml-8 text-muted-foreground">
                    <li>Email: <a href="mailto:mradityaji2@gmail.com" className="text-blue-600">mradityaji2@gmail.com</a></li>
                    <li>Phone: <a href="tel:+919473774390" className="text-blue-600">+91 94737 74390</a></li>
                </ul>

                <p className="mt-8 font-medium">
                    By using Bright Veil, you acknowledge that you have read, understood, and agree to the terms of this Privacy Policy.
                </p>
            </AnimationContainer>
        </MaxWidthWrapper>
    );
};

export default Privacy;
