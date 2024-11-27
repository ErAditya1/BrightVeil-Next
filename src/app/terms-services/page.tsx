import { FC } from "react";
import Head from "next/head";

const TermsAndConditions: FC = () => {
  return (
    <div className="bg-background text-foreground">
      <Head>
        <title>Terms and Conditions - Learning Platform</title>
        <meta name="description" content="Terms and Conditions for Learning Platform" />
      </Head>

      <div className="container mx-auto py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-semibold text-center text-blue-600 mb-6">Terms and Conditions</h1>

          <p className="text-lg mb-8">
            Please read these Terms and Conditions carefully before using our platform. By accessing or using our website
            and services, you agree to comply with and be bound by these terms.
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-blue-500">1. Introduction</h2>
              <p className="mt-4">
                These Terms and Conditions govern your use of the Learning Platform website and all services provided through
                it. By using our services, you agree to these terms. If you do not agree, you must stop using our platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-500">2. User Responsibilities</h2>
              <p className="mt-4">
                As a user, you are responsible for ensuring that all information you provide to us is accurate and up-to-date.
                You agree to use our services only for lawful purposes and in accordance with these terms.
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>You must not use our platform for any illegal activities.</li>
                <li>You agree to keep your account information secure and confidential.</li>
                <li>You agree not to share or distribute any course content unless authorized.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-500">3. Account Registration and Security</h2>
              <p className="mt-4">
                To access certain features of our platform, you must create an account. You agree to provide accurate and
                complete information during the registration process. You are responsible for maintaining the confidentiality of
                your account credentials and for all activities that occur under your account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-500">4. Payment Terms</h2>
              <p className="mt-4">
                Some courses and features on our platform are paid. By purchasing any course, you agree to the payment
                terms, including:
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>All payments must be made using accepted payment methods.</li>
                <li>Subscription or course fees are non-refundable except where required by law.</li>
                <li>We reserve the right to change pricing or billing terms at any time.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-500">5. Content Usage</h2>
              <p className="mt-4">
                All content provided through our platform, including courses, quizzes, and materials, is for personal and
                educational use only. You may not:
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>Reproduce, distribute, or modify the content without permission.</li>
                <li>Use our platform to upload or distribute harmful or illegal content.</li>
                <li>Engage in any activity that could harm the reputation of our platform.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-500">6. Intellectual Property</h2>
              <p className="mt-4">
                The content available on our platform, including text, images, and multimedia, is protected by copyright and
                intellectual property laws. All rights are reserved unless explicitly stated otherwise. You may not use our
                intellectual property without our express permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-500">7. Limitation of Liability</h2>
              <p className="mt-4">
                To the fullest extent permitted by law, Learning Platform will not be liable for any indirect, incidental,
                special, or consequential damages arising from your use of our platform, including any loss of data, business
                opportunities, or revenue.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-500">8. Indemnification</h2>
              <p className="mt-4">
                You agree to indemnify and hold harmless Learning Platform, its affiliates, and employees from any claims,
                losses, or damages, including legal fees, arising from your use of the platform or your violation of these
                terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-500">9. Termination</h2>
              <p className="mt-4">
                We reserve the right to suspend or terminate your access to the platform at our discretion, especially if you
                violate any of the terms outlined in this agreement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-500">10. Changes to Terms</h2>
              <p className="mt-4">
                We may modify these Terms and Conditions at any time. When we make changes, we will post the updated terms on
                this page and update the "Effective Date" at the bottom. You are encouraged to review these terms regularly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-500">11. Governing Law</h2>
              <p className="mt-4">
                These Terms and Conditions are governed by and construed in accordance with the laws of the jurisdiction in
                which we operate, without regard to its conflict of law principles.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-500">12. Contact Information</h2>
              <p className="mt-4">
                If you have any questions or concerns regarding these Terms and Conditions, please contact us at:
              </p>
              <ul className="list-inside mt-2">
                <li>Email: <a href="mailto:support@learningplatform.com" className="text-blue-500">support@learningplatform.com</a></li>
                <li>Phone: 1-800-123-4567</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
