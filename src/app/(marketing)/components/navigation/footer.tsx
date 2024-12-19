import Link from 'next/link';
import AnimationContainer from '../global/animation-container';
import { Icons } from '../../../../components/icons';
import { TextHoverEffect } from '@/components/ui/text-hover-effect';

const Footer = () => {
    return (
        <footer className="flex flex-col relative items-center justify-center border-t border-border pt-16 pb-8 md:pb-0 px-6 lg:px-8 w-full max-w-6xl mx-auto lg:pt-32 bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/8%),transparent)]">

            <div className="absolute top-0 left-1/2 right-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-1.5 bg-foreground rounded-full"></div>

            <div className="grid gap-8 xl:grid-cols-3 xl:gap-8 w-full">

                <AnimationContainer delay={0.1}>
                    <div className="flex flex-col items-start justify-start md:max-w-[200px]">
                        <div className="flex items-start">
                            <div className="w-16 h-16">

                                <Icons.logo />
                            </div>
                        </div>
                        <p className="text-muted-foreground mt-4 text-sm text-start">
                            Manage your links with ease.
                        </p>
                        <span className="mt-4 text-neutral-200 text-sm flex items-center">
                            Made by <Link href="https://eraditya.great-site.net/" className="font-semibold ml-1">Aditya</Link>
                        </span>
                    </div>
                </AnimationContainer>

                <div className="grid-cols-2 gap-8 grid mt-16 xl:col-span-2 xl:mt-0">
                    <div className="md:grid md:grid-cols-2 md:gap-8">
                        <AnimationContainer delay={0.2}>
                            <div className="">
                                <h3 className="text-base font-medium ">
                                    Product
                                </h3>
                                {/* <ul className="mt-4 text-sm text-muted-foreground">
                                    <li className="mt-2">
                                        <Link href="" className="hover:text-foreground transition-all duration-300">
                                            Features
                                        </Link>
                                    </li>
                                    <li className="mt-2">
                                        <Link href="" className="hover:text-foreground transition-all duration-300">
                                            Pricing
                                        </Link>
                                    </li>
                                    <li className="mt-2">
                                        <Link href="" className="hover:text-foreground transition-all duration-300">
                                            Testimonials
                                        </Link>
                                    </li>
                                    <li className="mt-2">
                                        <Link href="" className="hover:text-foreground transition-all duration-300">
                                            Integration
                                        </Link>
                                    </li>
                                </ul> */}
                            </div>
                        </AnimationContainer>
                        <AnimationContainer delay={0.3}>
                            <div className="mt-10 md:mt-0 flex flex-col">
                                <h3 className="text-base font-medium ">
                                    Integrations
                                </h3>
                                <ul className="mt-4 text-sm text-muted-foreground">
                                    <li className="">
                                        <Link
                                            href="https://www.facebook.com/adityakumar411/"
                                            className="hover:text-foreground transition-all duration-300"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Facebook
                                        </Link>
                                    </li>
                                    <li className="mt-2">
                                        <Link
                                            href="https://www.instagram.com/excited_adi/"
                                            className="hover:text-foreground transition-all duration-300"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Instagram
                                        </Link>
                                    </li>
                                    <li className="mt-2">
                                        <Link
                                            href="https://twitter.com/excited_adi"
                                            className="hover:text-foreground transition-all duration-300"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Twitter
                                        </Link>
                                    </li>
                                    <li className="mt-2">
                                        <Link
                                            href="https://www.linkedin.com/in/adityaji1/"
                                            className="hover:text-foreground transition-all duration-300"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            LinkedIn
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </AnimationContainer>

                    </div>
                    <div className="md:grid md:grid-cols-2 md:gap-8">
                        <AnimationContainer delay={0.4}>
                            <div className="">
                                <h3 className="text-base font-medium ">
                                    Resources
                                </h3>
                                <ul className="mt-4 text-sm text-muted-foreground">
                                    <li className="mt-2">
                                        <Link href="/auth/resources/blog" className="hover:text-foreground transition-all duration-300">
                                            Blog
                                        </Link>
                                    </li>
                                    <li className="mt-2">
                                        <Link href="/auth/resources/help" className="hover:text-foreground transition-all duration-300">
                                            Support
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </AnimationContainer>
                        <AnimationContainer delay={0.5}>
                            <div className="mt-10 md:mt-0 flex flex-col">
                                <h3 className="text-base font-medium ">
                                    Company
                                </h3>
                                <ul className="mt-4 text-sm text-muted-foreground">
                                    <li className="">
                                        <Link href="/auth/about" className="hover:text-foreground transition-all duration-300">
                                            About Us
                                        </Link>
                                    </li>
                                    <li className="mt-2">
                                        <Link href="/auth/privacy-policy" className="hover:text-foreground transition-all duration-300">
                                            Privacy Policy
                                        </Link>
                                    </li>
                                    <li className="mt-2">
                                        <Link href="/auth/terms-services" className="hover:text-foreground transition-all duration-300">
                                            Terms & Conditions
                                        </Link>
                                    </li>
                                    <li className="mt-2">
                                        <Link href="/auth/refund" className="hover:text-foreground transition-all duration-300">
                                            Refund Policy
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </AnimationContainer>
                    </div>
                </div>

            </div>

            <div className="mt-8 border-t border-border/40 pt-4 md:pt-8 md:flex md:items-center md:justify-between w-full">
                <AnimationContainer delay={0.6}>
                    <p className="text-sm text-muted-foreground mt-8 md:mt-0">
                        &copy; {new Date().getFullYear()} Bright Veil INC. All rights reserved.
                    </p>
                </AnimationContainer>
            </div>

            <div className="h-[20rem] lg:h-[20rem] hidden md:flex items-center justify-center">
                <TextHoverEffect text="BRIGHT VEIL" />
            </div>
        </footer>
    )
}

export default Footer
