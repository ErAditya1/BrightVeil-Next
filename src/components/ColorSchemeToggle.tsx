'use client'

 import * as React from 'react';
import { useColorScheme } from '@mui/joy/styles';
import IconButton, { IconButtonProps } from '@mui/joy/IconButton';

import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useTheme } from "next-themes"
export default function ColorSchemeToggle(props: IconButtonProps) {
  const { onClick, sx, ...other } = props;
  const { mode, setMode } = useColorScheme();
  const { setTheme } = useTheme();

  // useEffect to update theme based on user's color scheme preference
  
  React.useEffect(() => {
      const theme = localStorage.getItem('theme');
      console.log(theme);
      
      if(theme){
        if(theme=='dark'){
          setMode('dark');
          setTheme("dark")
        }else{
          setMode('light');
          setTheme("light")
        }
      }else{
        if(window.matchMedia('(prefers-color-scheme: dark)').matches){
          setMode('dark');
          setTheme("dark")
        }else{
          setMode('light');
          setTheme("light")
        }
      }
      
    },[typeof window !== 'undefined'])
 

  return (
    <IconButton
      id="toggle-mode"
      size="sm"
      variant="outlined"
      color="neutral"
      {...props}
      onClick={(event) => {
        if (mode === 'light') {
          localStorage.setItem('theme', 'dark')
          setMode('dark');
          setTheme("dark")
        } else {
          localStorage.setItem('theme', 'light')
          setMode('light');
          setTheme("light")
        }
        onClick?.(event);
      }}
      
    >
      {
        mode === 'light'? <DarkModeRoundedIcon /> : <LightModeIcon />
      }
      
    </IconButton>
  );
}