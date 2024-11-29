'use client';

import * as React from 'react';
import { useColorScheme } from '@mui/joy/styles';
import IconButton, { IconButtonProps } from '@mui/joy/IconButton';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useTheme } from "next-themes";

export default function ColorSchemeToggle(props: IconButtonProps) {
  const { onClick, sx, ...other } = props;
  const { setTheme, resolvedTheme } = useTheme();
  const { mode, setMode } = useColorScheme();

  const [isClient, setIsClient] = React.useState(false);
  // Sync Joy UI mode with `next-themes` resolvedTheme
  React.useEffect(() => {
    setIsClient(true)
    
  }, []);
  React.useEffect(() => {
    setIsClient(true)
    if (resolvedTheme !== mode && isClient) {
      setMode(resolvedTheme as 'light' | 'dark');
    }
  }, [resolvedTheme, setMode, mode, isClient]);

  // Handle the theme toggling logic
  const handleToggleTheme = (event: React.MouseEvent<HTMLButtonElement>) => {
    const newTheme = resolvedTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    setMode(newTheme);
    onClick?.(event);
  };

  return (
    <IconButton
      id="toggle-mode"
      size="sm"
      variant="soft"
      color="primary"
      {...other}
      onClick={handleToggleTheme}
    >
      {resolvedTheme === 'light' ? <DarkModeRoundedIcon /> : <LightModeIcon />}
    </IconButton>
  );
}
