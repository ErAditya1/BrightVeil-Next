
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CssVarsProvider } from "@mui/joy/styles";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/context/AuthProider";
import { SocketProvider } from "@/context/SocketContext";

import { Providers } from "./Providers";



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "innovadi",
  description: "Learning menagement system in nextjs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (

      <html lang="en" className="">
       <AuthProvider>
        <Providers>   
          <body className={inter.className}>
            {/* <script src="https://youtube.com/iframe_embedded"></script> */}
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <CssVarsProvider disableTransitionOnChange>
                <CssBaseline />
                
                  <SocketProvider>
                    {children}
                  </SocketProvider>
                
                
              </CssVarsProvider>
            </ThemeProvider>
            <Toaster />

          </body>
          </Providers>
        </AuthProvider>
        
      </html>


  );
}
