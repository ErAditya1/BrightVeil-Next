
import { Inter } from "next/font/google";
import "./globals.css";
import { CssVarsProvider } from "@mui/joy/styles";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster";
import { SocketProvider } from "@/context/SocketContext";

import UserContext from "@/context/UserContext";
import { Providers } from "./providers";




const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Bright Veil ",
  description: "Bright Veil learning plateform developed by Aditya Kumar",

  icons: {
    icon: "/brightveilLight.jpg",
    apple: "/brightveilLight.jpg",
    shortcut: "/brightveilLight.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (

    <html lang="en" className="">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Join Bright Veil, the leading online learning platform offering diverse courses in technology, business, and personal development. Enhance your skills, advance your career, and learn at your own pace."
        />
        <meta
          name="keywords"
          content="online learning, Bright Veil, online courses, skill development, career growth, professional development, learn online, education platform, tech courses, business courses, personal development"
        />
        <meta name="author" content="Bright Veil" />
        <meta
          property="og:title"
          content="Bright Veil: Online Learning Platform for Skill Development & Career Growth"
        />
        <meta
          property="og:description"
          content="Join Bright Veil, the leading online learning platform offering diverse courses in technology, business, and personal development. Enhance your skills, advance your career, and learn at your own pace."
        />
        <meta property="og:image" content="/brightveilLight.jpg" /> {/* Optional image for social sharing */}
        <meta property="og:url" content="https://brightveil.vercel.app" />
        <meta name="twitter:card" content="/brightveilLight.jpg" />
        <meta
          name="twitter:title"
          content="Bright Veil: Online Learning Platform for Skill Development & Career Growth"
        />
        <meta
          name="twitter:description"
          content="Join Bright Veil, the leading online learning platform offering diverse courses in technology, business, and personal development. Enhance your skills, advance your career, and learn at your own pace."
        />
        <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-KFBC9X698J"
          ></script>
          <meta name="google-site-verification" content="Bvx3h17BfA-g1xTam6S2n0v6-sc1GTKNDoA6Uo2EyTU" />

          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-KFBC9X698J');
              `,
            }}
          />
          
        <meta name="twitter:image" content="/brightveilLight.jpg" /> {/* Optional image for Twitter */}
      </head>
      <Providers>
        <body className={inter.className}>

          <CssVarsProvider disableTransitionOnChange>
            <CssBaseline />
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <UserContext>
                <SocketProvider>
                  {children}
                </SocketProvider>
              </UserContext>

            </ThemeProvider>
          </CssVarsProvider>

          <Toaster />

        </body>
      </Providers>



    </html >


  );
}
