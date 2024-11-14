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

  // Sync Joy UI mode with `next-themes` resolvedTheme
  const isClient: boolean = typeof window !== 'undefined' && typeof document !== 'undefined';
  React.useEffect(() => {
    if (resolvedTheme !== mode && isClient) {
      setMode(resolvedTheme as 'light' | 'dark');
    }
  }, [resolvedTheme, setMode, mode]);

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
      variant="outlined"
      color="neutral"
      {...other}
      onClick={handleToggleTheme}
    >
      {resolvedTheme === 'light' ? <DarkModeRoundedIcon /> : <LightModeIcon />}
    </IconButton>
  );
}
