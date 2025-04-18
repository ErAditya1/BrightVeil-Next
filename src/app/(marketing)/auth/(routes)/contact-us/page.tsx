
import { motion } from "framer-motion";
import AnimationContainer from "../../../components/global/animation-container";
import MaxWidthWrapper from "../../../components/global/max-width-wrapper";

import Image from "next/image";

const ContactPage = () => {
    return (
        <MaxWidthWrapper className="max-w-3xl mx-auto px-8 mb-40">
            <AnimationContainer delay={0.1} className="w-full">
                {/* About Section */}
                <h1 className="text-4xl md:text-6xl font-heading font-bold my-12 text-center w-full">
                    Contact Us!
                </h1>





                <h2 className="text-2xl font-semibold mt-8">Get in Touch</h2>
                <p className="mt-4 text-muted-foreground">
                    Feel free to reach out via the contact form below or connect with me through any of my social media channels.
                </p>



                {/* Contact Information */}
                <h2 className="text-2xl font-semibold mt-8">Office Location</h2>
                <p className="mt-4 text-muted-foreground">
                    <strong>Office Address:</strong><br />
                    Usmanpur Kothi, Barabanki, Uttar Pradesh, India<br />
                    Pincode: 225120
                </p>

                {/* Google Map */}
                <div className="mt-8">
                    <h2 className="text-2xl font-semibold">Find Us on the Map</h2>
                    <div className="mt-4 w-full h-96">
                        {/* Embed Google Map */}
                        <iframe
                            src={`https://www.google.com/maps/embed/v1/place?q=Usmanpur%20Kothi,%20Barabanki,%20Uttar%20Pradesh%20225120&key=${process.env.GOOGLE_MAP_API_KEY}`}
                            className="w-full h-full border-0"
                            allowFullScreen={true}
                            loading="lazy"
                            title="Location Map"
                        ></iframe>
                    </div>
                </div>

                {/* Contact Form */}
                {/* <h2 className="text-2xl font-semibold mt-8">Get In Touch</h2>
                <p className="mt-4 text-muted-foreground">
                    You can also reach out to me by filling out the contact form below. I'll respond as soon as possible.
                </p>

                <form className="mt-8 space-y-4">
                    <div className="flex flex-col">
                        <label htmlFor="name" className="text-sm font-medium text-muted-foreground">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Your Name"
                            className="mt-2 p-4 border border-muted-foreground rounded-lg text-base"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-sm font-medium text-muted-foreground">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Your Email"
                            className="mt-2 p-4 border border-muted-foreground rounded-lg text-base"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="message" className="text-sm font-medium text-muted-foreground">
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            placeholder="Your Message"
                            className="mt-2 p-4 border border-muted-foreground rounded-lg text-base"
                            rows={6}
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-4 py-3 px-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
                    >
                        Send Message
                    </button>
                </form> */}

                {/* Developer Info */}
                <h2 className="text-2xl font-semibold mt-8">Developer Info</h2>
                <p className="mt-8 text-lg text-muted-foreground">
                    Hi, I am Aditya Kumar, a passionate Software Developer based in India. I specialize in creating dynamic, user-friendly web applications. With a strong focus on JavaScript, React, Node.js, and other modern technologies, I strive to build innovative solutions.
                </p>

                <h2 className="text-2xl font-semibold mt-8">My Expertise</h2>
                <p className="mt-4 text-muted-foreground">
                    I have expertise in both front-end and back-end development. I aim to provide seamless user experiences with responsive, well-structured web applications. My goal is to help businesses build scalable and user-friendly solutions that make an impact.
                </p>
            </AnimationContainer>
            <AnimationContainer delay={0.1}>
                
                    <div className="absolute inset-0  opacity-40"></div> {/* Background overlay */}
                    
                        <Image
                            src="/assets/developer.jpg"
                            alt="About & Contact Social Media"
                            width={280}
                            height={280}
                            className="object-contain rounded-lg mx-auto mb-4"
                        />
                        <h2 className="text-xl font-semibold text-center">Aditya Kumar</h2>
                        <p className="text-center text-gray-600">
                            I'm a passionate developer building amazing web experiences.
                        </p>
                   
                
            </AnimationContainer>
        </MaxWidthWrapper>
    );
};

export default ContactPage;
