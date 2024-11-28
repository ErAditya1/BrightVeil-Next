// src/types/window.d.ts or types/window.d.ts
declare global {
    interface Window {
      gtag: (...args: any[]) => void;
      Razorpay: any;  // Declare Razorpay as 'any', or you can define its type more strictly if needed
    }
  }
  
  export {}; // To ensure this file is treated as a module
  