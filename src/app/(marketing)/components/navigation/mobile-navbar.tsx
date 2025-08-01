"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/store/hooks";
import { LucideIcon, Menu, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from 'react';
import { NAV_LINKS } from "./navbar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import ColorSchemeToggle from "@/components/ColorSchemeToggle";

const MobileNavbar = () => {

    const { isLoggedIn } = useAppSelector((state) => state.auth)

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <div className="flex lg:hidden items-center justify-end">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <ColorSchemeToggle />
                <SheetTrigger asChild>
                    <Button size="icon" variant="ghost">
                        <Menu className="w-5 h-5" />
                    </Button>
                </SheetTrigger>

                <SheetContent className="w-screen">
                    <SheetClose asChild className="absolute top-3 right-5 bg-background z-20 flex items-center justify-center">
                        <Button size="icon" variant="ghost" className="text-neutral-600">
                            <X className="w-5 h-5" />
                        </Button>
                    </SheetClose>
                    <div className="flex flex-col items-start w-full py-2 mt-10">
                        <div className="flex items-center justify-evenly w-full space-x-2">
                            {isLoggedIn ? (
                                <Link href="/dashboard" className={buttonVariants({ variant: "outline", className: "w-full" })}>
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link href="/auth/sign-in" className={buttonVariants({ variant: "outline", className: "w-full" })}>
                                        <SheetClose>
                                            Sign In
                                        </SheetClose>
                                    </Link>
                                    <Link href="/auth/sign-up" className={buttonVariants({ className: "w-full" })}>
                                        <SheetClose>
                                            Sign Up
                                        </SheetClose>
                                    </Link>
                                </>
                            )}
                        </div>
                        <ul className="flex flex-col items-start w-full mt-6">
                            <Accordion type="single" collapsible className="!w-full">
                                {NAV_LINKS.map((link) => (
                                    <AccordionItem key={link.title} value={link.title} className="last:border-none">
                                        {link.menu ? (
                                            <>
                                                <AccordionTrigger>
                                                    {link.title}
                                                </AccordionTrigger>
                                                <AccordionContent>
                                                    <ul
                                                        onClick={handleClose}
                                                        className={cn(
                                                            "w-full",
                                                        )}
                                                    >
                                                        {link.menu.map((menuItem) => (
                                                            <ListItem key={menuItem.title} title={menuItem.title} href={menuItem.href} icon={menuItem.icon}>
                                                                {menuItem.tagline}
                                                            </ListItem>
                                                        ))}
                                                    </ul>
                                                </AccordionContent>
                                            </>
                                        ) : (
                                            <Link
                                                href={link.href}
                                                onClick={handleClose}
                                                className="flex items-center w-full py-4 font-medium text-muted-foreground hover:text-foreground"
                                            >
                                                <span>{link.title}</span>
                                            </Link>
                                        )}
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </ul>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
};

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a"> & { title: string; icon: LucideIcon }
>(({ className, title, href, icon: Icon, children, ...props }, ref) => {
    return (
        <li>
            <Link
                href={href!}
                ref={ref}
                className={cn(
                    "block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                    className
                )}
                {...props}
            >
                <div className="flex items-center space-x-2 text-foreground">
                    <Icon className="h-4 w-4" />
                    <h6 className="text-sm !leading-none">
                        {title}
                    </h6>
                </div>
                <p title={children! as string} className="line-clamp-1 text-sm leading-snug text-muted-foreground">
                    {children}
                </p>
            </Link>
        </li>
    )
})
ListItem.displayName = "ListItem"

export default MobileNavbar
