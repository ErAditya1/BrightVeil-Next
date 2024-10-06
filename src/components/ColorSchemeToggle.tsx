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
  const [mounted, setMounted] = React.useState(false);
  const { setTheme } = useTheme();

  // useEffect to update theme based on user's color scheme preference
  
  React.useEffect(() => {
      const theme = localStorage.getItem('theme');
      if(theme=='dark' || window.matchMedia('(prefers-color-scheme: dark)').matches){
        setMode('dark');
        setTheme("dark")
        console.log(theme)
      }else{
        setMode('light');
        setTheme("light")
        console.log("light theme")
      }
    },[])
 

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
      sx={[
        {
          '& > *:first-of-type': {
            display: mode === 'dark' ? 'none' : 'initial',
          },
          '& > *:last-of-type': {
            display: mode === 'light' ? 'none' : 'initial',
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <DarkModeRoundedIcon />
      <LightModeIcon />
    </IconButton>
  );
}