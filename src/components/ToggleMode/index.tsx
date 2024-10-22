"use client";

import React, { use } from 'react'
import Image from "next/image";
import { useSearchParams } from 'next/navigation';

const ToggleMode = () => {
    const searchParams = useSearchParams();
    const type = searchParams.get("dark");
    
    const isDark = localStorage.getItem("darkMode") === "true";

    const darkmode = type === "true";

    if (isDark || darkmode) {
      document.documentElement.classList.add('dark');
      console.log('dark mode is activated');
    } else {
      document.documentElement.classList.remove('dark');
      console.log('dark mode is disable');
    }
    return null;
}

export default ToggleMode;