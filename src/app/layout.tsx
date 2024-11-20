
import { Inter } from "next/font/google";
import "./globals.css";
import { CssVarsProvider } from "@mui/joy/styles";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster";
import { SocketProvider } from "@/context/SocketContext";

import { Providers } from "./Providers";
import UserContext from "@/context/UserContext";




const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Bright Veil ",
  description: "A website built with Next.js, MUI, and Socket.io",

  icons: {
    icon: "/brightveil_light.jpeg",
    apple: "/brightveil_light.jpeg",
    shortcut: "/brightveil_light.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (

    <html lang="en" className="">

      <Providers>
        <body className={inter.className}>

          {/* <script src="https://youtube.com/iframe_embedded"></script> */}

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
