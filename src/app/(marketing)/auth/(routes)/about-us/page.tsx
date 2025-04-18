// app/about/page.tsx or pages/about.tsx
import Link from 'next/link';
import React from 'react';

const AboutPage = () => {
  return (
    <main className="min-h-screen ">
      {/* Hero */}
      <section className="bg-gradient-to-r bg-transparent py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About BrightVeil</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          Empowering learners with high-quality courses, insightful blogs, and meaningful discussions.
        </p>
      </section>

      {/* Features */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center">What We Offer</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className=" p-6 rounded-lg shadow hover:shadow-md transition bg-card text-card-foreground">
            <h3 className="text-xl font-semibold mb-2">🎓 Free & Paid Courses</h3>
            <p>Access a wide range of video courses to learn at your own pace—free or premium.</p>
          </div>
          <div className=" p-6 rounded-lg shadow hover:shadow-md transition bg-card text-card-foreground">
            <h3 className="text-xl font-semibold mb-2">✍️ Educational Blogs</h3>
            <p>Stay updated with insightful blogs, guides, and expert-written content.</p>
          </div>
          <div className=" p-6 rounded-lg shadow hover:shadow-md transition bg-card text-card-foreground">
            <h3 className="text-xl font-semibold mb-2">💬 Community Discussion</h3>
            <p>Engage with fellow learners and educators in real-time chats and forums.</p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className=" py-16 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg">
            At BrightVeil, our mission is to bridge the gap between knowledge and accessibility by offering flexible and inclusive learning experiences for all.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Start Learning?</h2>
        <p className="mb-6">Join BrightVeil today and take the first step toward your goals.</p>
        <Link
          href="/auth/sign-up"
          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition"
        >
          Get Started
        </Link>
      </section>
    </main>
  );
};

export default AboutPage;
