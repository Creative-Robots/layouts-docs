'use client';

import { cn } from "@/lib/cn";
import { scrollToElement } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { Label } from "../ui/label";

interface EntryProps {
    i: number;
    entry: string;
    isActive: boolean;
    level: number;
}

interface EntriesProps {
    entries: { entry: string; level: number; }[] | undefined;
}

export default function Entries({ entries }: EntriesProps) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [activeEntries, setActiveEntries] = useState<number[]>([]);
    const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const TOPBAR_HEIGHT = 105; // Adjust this constant to match your topbar height

    useEffect(() => {
        const updateHash = (newIndex: number | null) => {
            if (newIndex !== null && entries) {
                if (debounceTimeout.current) {
                    clearTimeout(debounceTimeout.current);
                    debounceTimeout.current = null;
                }
                const newHash = entries[newIndex].entry.normalize().replace(/`/g, "");
                if (window.location.hash !== `#${newHash}`) {
                    history.replaceState(null, '', `#${newHash}`);
                }
            }
        };

        const checkVisibility = () => {
            if (!entries) return;

            let newIndex: number | null = null;
            let closestAboveTop: number | null = null;
            let closestAboveIndex: number | null = null;

            entries.forEach((e, i) => {
                const elementId = e.entry.normalize().replace(/`/g, "");
                const element = document.getElementById(elementId);

                if (!element) {
                    console.error(`Element with id ${elementId} not found`);
                    return;
                }

                const rect = element.getBoundingClientRect();
                const windowHeight = window.innerHeight || document.documentElement.clientHeight;

                if (rect.top >= TOPBAR_HEIGHT && rect.bottom <= windowHeight) {
                    // Element is fully within the viewport and below the topbar
                    if (newIndex === null || rect.top < element.getBoundingClientRect().top) {
                        newIndex = i;
                    }
                } else if (rect.top < windowHeight && rect.bottom > TOPBAR_HEIGHT) {
                    // Element is partially within the viewport and below the topbar
                    if (newIndex === null || rect.top < element.getBoundingClientRect().top) {
                        newIndex = i;
                    }
                } else if (rect.top < TOPBAR_HEIGHT) {
                    // Element is above the topbar
                    const distanceAboveTop = Math.abs(rect.top - TOPBAR_HEIGHT);
                    if (closestAboveTop === null || distanceAboveTop < closestAboveTop) {
                        closestAboveTop = distanceAboveTop;
                        closestAboveIndex = i;
                    }
                }
            });

            if (newIndex === null && closestAboveIndex !== null) {
                newIndex = closestAboveIndex;
            }

            if (newIndex !== null && newIndex !== activeIndex) {
                if (!debounceTimeout.current) {
                    debounceTimeout.current = setTimeout(() => {
                        updateHash(newIndex);
                    }, 1500);
                } else {
                    clearTimeout(debounceTimeout.current);
                    debounceTimeout.current = null;
                    debounceTimeout.current = setTimeout(() => {
                        updateHash(newIndex);
                    }, 1000);
                }

                setActiveIndex(newIndex);

                // Update active entries including parents
                const activeEntriesSet = new Set<number>();
                activeEntriesSet.add(newIndex);

                // Add parent entries
                let level = entries[newIndex].level;
                if (level > 1) {
                    for (let i = newIndex - 1; i >= 0; i--) {
                        if (entries[i].level < level) {
                            activeEntriesSet.add(i);
                            level = entries[i].level;
                        }
                    }
                }

                setActiveEntries(Array.from(activeEntriesSet));
            }
        };

        checkVisibility();

        window.addEventListener('scroll', checkVisibility);
        window.addEventListener('resize', checkVisibility);

        return () => {
            window.removeEventListener('scroll', checkVisibility);
            window.removeEventListener('resize', checkVisibility);
            // if (debounceTimeout.current) {
            //     clearTimeout(debounceTimeout.current);
            // }
        };
    }, [entries, activeIndex]);

    const adjustScrollForTopBar = () => {
        const hash = window.location.hash.substring(1); 

        if (hash) {
        const targetElement = document.getElementById(hash);
        if (targetElement) {
            const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;

            const topBarHeight = 120;

            window.scrollTo({
            top: elementPosition - topBarHeight,
            behavior: 'smooth'
            });
        }
        }
    };

    window.addEventListener('load', () => {
        adjustScrollForTopBar();
    });
    window.addEventListener('hashchange', () => {
        adjustScrollForTopBar();
    });

    return (
        <div className='w-60 min-w-60 max-w-60 hidden lg:flex sticky top-0 h-screen pl-2 pr-4 pt-[122px] overflow-y-scroll flex-col gap-4'>
            <Label className="text-sm font-medium">
                On this page
            </Label>
            {entries ? entries.map((e, i) => (
                <Entry key={i} entry={e.entry} i={i} isActive={activeEntries.includes(i)} level={e.level} />
            )) : null}
        </div>
    );
}

export function Entry({ i, entry, isActive, level }: EntryProps) {
    const elementId = entry.normalize().replace(/`/g, "");

    return (
        <a
            className={cn("text-xs font-normal text-gray-400 hover:text-[#1e1f22] cursor-pointer flex flex-row items-center", isActive ? "text-black" : "")}
            href={`#${elementId}`}
            onClick={scrollToElement}
        >
            {level === 2 ? <div className='text-xs h-0.5 w-1 rounded-full bg-gray-300 group-hover:bg-[#1e1f22] mr-2'></div> : null}
            {level === 3 ? <div className='text-xs size-0.5 rounded-none bg-gray-200 group-hover:bg-[#1e1f22] mr-2'></div> : null}
            {entry}
        </a>
    );
}
