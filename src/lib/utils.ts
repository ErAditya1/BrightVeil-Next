import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"


const isClient: boolean = typeof window !== 'undefined' && typeof document !== 'undefined';
export function openSidebar() {
    if (isClient) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.setProperty('--SideNavigation-slideIn', '1');
    }
  }
  
  export function closeSidebar() {
    if (isClient) {
      document.documentElement.style.removeProperty('--SideNavigation-slideIn');
      document.body.style.removeProperty('overflow');
    }
  }
  
  export function toggleSidebar() {
    if (isClient && typeof document !== 'undefined') {
      const slideIn = window
        .getComputedStyle(document.documentElement)
        .getPropertyValue('--SideNavigation-slideIn');
      if (slideIn) {
        
        closeSidebar();
      } else {
        openSidebar();
      }
    }
  }
  

  export function openMessagesPane() {
    if (isClient) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.setProperty('--MessagesPane-slideIn', '1');
    }
  }
  
  export function closeMessagesPane() {
    if (isClient) {
      document.documentElement.style.setProperty('--MessagesPane-slideIn', '0');
      document.body.style.removeProperty('overflow');
    }
  }
  
  export function toggleMessagesPane() {
    if (isClient && typeof document !== 'undefined') {
      const slideIn = window
        .getComputedStyle(document.documentElement)
        .getPropertyValue('--MessagesPane-slideIn');
        
        if (slideIn) {
          closeMessagesPane();
        } else {
          openMessagesPane();
          
      }
    }
  }

  export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
  }

  