import { FC } from "react";
import Head from "next/head";

const PrivacyPolicy: FC = () => {
  return (
    <div className=" text-foreground bg-background">
      <Head>
        <title>Privacy Policy - Learning Platform</title>
        <meta name="description" content="Privacy Policy for Learning Platform" />
      </Head>

      <div className="container mx-auto py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-semibold text-center text-blue-600 mb-6">Privacy Policy</h1>

          <p className="text-lg mb-8">
            At Learning Platform, we take your privacy seriously. This Privacy Policy explains how we collect, use,
            and protect your personal information when you access and use our website and services.
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-blue-500">1. Information We Collect</h2>
              <p className="mt-4">
                We collect information from you when you register on our platform, make a purchase, or interact with our
                services. This may include:
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>Personal Information (name, email, phone number)</li>
                <li>Payment Information (credit card details, billing address)</li>
                <li>Usage Information (IP address, browser type, and activity on the platform)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-500">2. How We Use Your Information</h2>
              <p className="mt-4">
                The information we collect is used to provide and improve our services, including:
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>Processing your orders and payments</li>
                <li>Sending course updates and newsletters</li>
                <li>Personalizing your learning experience</li>
                <li>Improving the functionality and performance of our platform</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-500">3. Cookies & Tracking Technologies</h2>
              <p className="mt-4">
                We use cookies and other tracking technologies to enhance your experience on our platform. These technologies
                allow us to:
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>Analyze user activity to improve site functionality</li>
                <li>Provide personalized content and advertisements</li>
                <li>Ensure security and protect against fraud</li>
              </ul>
              <p className="mt-4">
                You can manage your cookie preferences in your browser settings, but disabling cookies may limit your ability
                to use certain features of our platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-500">4. User Rights</h2>
              <p className="mt-4">
                As a user, you have the following rights regarding your personal information:
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>Access and review the personal data we have collected about you</li>
                <li>Request correction or deletion of your data</li>
                <li>Opt-out of marketing communications at any time</li>
              </ul>
              <p className="mt-4">
                To exercise these rights, please contact us at privacy@learningplatform.com.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-500">5. Security</h2>
              <p className="mt-4">
                We implement industry-standard security measures to protect your personal information. This includes using
                encryption for sensitive data and ensuring secure storage.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-500">6. Payment and Billing Information</h2>
              <p className="mt-4">
                Payment transactions are processed securely through a third-party payment processor. We do not store your
                full credit card details; they are handled by our payment partner in compliance with PCI DSS standards.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-500">7. Changes to This Policy</h2>
              <p className="mt-4">
                We may update this Privacy Policy from time to time. When we make changes, we will post the updated policy on
                this page and update the "Effective Date" at the bottom of this policy. Please review this policy regularly to
                stay informed about how we are protecting your information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-500">8. Contact Information</h2>
              <p className="mt-4">
                If you have any questions or concerns about this Privacy Policy or our practices, please contact us at:
              </p>
              <ul className="list-inside mt-2">
                <li>Email: <a href="mailto:privacy@learningplatform.com" className="text-blue-500">privacy@learningplatform.com</a></li>
                <li>Phone: 1-800-123-4567</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
