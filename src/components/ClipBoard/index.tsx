'use client'

import { cn } from "@/lib/cn";
import { useRef, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { IoCopySharp } from "react-icons/io5";


const handleCopy = (id:string) => {
    // Get the text field
    var copyText = document.getElementById(id) as HTMLTextAreaElement;
    if (!copyText) return ;

    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.value);
};

export default function CopyClipboard({id}:{id:string}) {
    const [activated, setActivated] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handle = () => {
      setActivated(true);
      handleCopy(id);
  
      // Clear the previous timeout if it exists
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
  
      // Set a new timeout
      timeoutRef.current = setTimeout(() => {
        setActivated(false);
      }, 3000);
    };

    return (
        <button title='Copy to clipboard' onClick={handle} className={cn('absolute size-fit rounded-sm bg-[#ffffff] p-1 top-2 right-2 z-30', (activated ? "border-green-200 border" : ""))}>
            { !activated
            ? <IoCopySharp color='#333333' size={12}/>
            : <span className='text-[#339933] text-xs flex flex-row items-center'>copied <FaCheck color='#339933' size={12}/></span>}
        </button>         
    )
}