'use client'
import React from 'react'

import Box from '@mui/joy/Box';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';



function DashboardLayout({ children }: { children: React.ReactNode }) {

  
  return (



    <Box sx={{ display: 'flex', minHeight: '100dvh' }} >
      <Sidebar />
      <Header />
      
      <Box
        component="main"
        sx={{

          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          height: '100dvh',
          gap: 1,
          overflow: 'auto',
        }}
        className="mt-[60px]  br:m-0 MainContent " 
      >
        <Navbar />
        {children}
        
        <Footer/>
      </Box>
      
      
    </Box>




  )
}

export default DashboardLayout