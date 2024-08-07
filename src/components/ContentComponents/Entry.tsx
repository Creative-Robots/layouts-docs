'use client';

import { cn } from "@/lib/cn";
import { scrollToElement } from "@/lib/utils";
import { useEffect, useState } from "react";

interface EntryProps {
    i: number;
    entry: string;
}

export default function Entry({ i, entry }: EntryProps) {
    const [inView, setInView] = useState(false);

    const elementId = entry.normalize().replace(/\`/g, "");

    useEffect(() => {
        const element = document.getElementById(elementId);

        if (!element) {
            console.error(`Element with id ${elementId} not found`);
            return;
        }

        const checkInView = () => {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            const windowWidth = window.innerWidth || document.documentElement.clientWidth;

            setInView(
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= windowHeight &&
                rect.right <= windowWidth
            );
        };

        checkInView();

        window.addEventListener('scroll', checkInView);
        window.addEventListener('resize', checkInView);

        return () => {
            window.removeEventListener('scroll', checkInView);
            window.removeEventListener('resize', checkInView);
        };
    }, [elementId]);

    return (
        <a
            key={'ine' + i}
            className={cn("text-xs font-normal text-gray-400 hover:text-[#1e1f22] cursor-pointer", inView ? "text-black" : "")}
            href={`#${elementId}`}
            onClick={scrollToElement}
        >
            {entry}
        </a>
    );
}
