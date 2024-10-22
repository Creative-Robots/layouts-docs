"use client"

import * as React from "react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "./index"
import LayoutsComponents from './../../docs/RawLayouts/Components.json';

import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "../ui/input";
import { FileElementType, getMdxFiles } from "@/lib/fileUtils";
import { SearchIcon } from "lucide-react";
import { cn } from "@/lib/cn";

const Essentials = getMdxFiles();

export function SearchCommand({first} : {first: boolean}) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    if (first) {
      document.addEventListener("keydown", down)
    }
    return () => {
      if (first) {
        document.removeEventListener("keydown", down)
      }
    }
  }, [])

  const simulateCtrlK = () => {
    const event = new KeyboardEvent('keydown', {
        key: 'k',
        code: 'KeyK',
        keyCode: 75, // 'K' key
        which: 75,
        ctrlKey: true,
        bubbles: true,
    });
    document.dispatchEvent(event);
  };

  const IntoCommandInput = (H: FileElementType[]):React.ReactNode => {
    return H.map((h, i) => {
      if (h.folder) {
        return IntoCommandInput(h.folder);
      } else {
        return (
          <CommandItem key={h.name} value={h.name} onMouseDown={() => {router.push('/components/' + h.parsedName); setOpen((open) => !open);}} className="hover:bg-background-2 cursor-pointer rounded-md">
              {/* <Calendar className="mr-2 h-4 w-4" /> */}
              <span>{h.name}</span>
          </CommandItem>
        )
      }
    })
  }

  return (
    <>
      <div className={cn("justify-start items-start flex-row flex gap-2 relative max-w-fit ml-auto self-center rounded-lg", type === "editor" ? "h-7 md:max-w-[250px] md:mr-4": "h-10 xs:max-w-[250px] xs:mr-4")} onClick={simulateCtrlK}>
            <Input className={cn("reset px-4 py-2 items-center rounded-lg w-full bg-background-2 placeholder:text-gray-500 dark:placeholder:text-gray-400 border-border outline-absolute-positive focus:outline-relief text-textcolor-primary focus:shadow-sm cursor-pointer", type === "editor" ? "hidden md:block text-[10px] h-7" : "hidden xs:block text-[13px] h-10")} placeHolder="Search..." placeholder="Search..." />
            <div className={cn("items-center justify-start gap-1 absolute right-2", type === "editor" ? "hidden md:flex top-1" : "hidden xs:flex top-2.5")} >
                <kbd className="w-fit pointer-events-none inline-flex select-none items-center font-mono text-textcolor-secondary opacity-100 h-5 gap-1 px-1.5 text-xs font-medium rounded bg-absolute-positive border border-gray-400/20" >
                    ⌘
                </kbd>
                <kbd className="w-fit pointer-events-none inline-flex select-none items-center font-mono text-textcolor-secondary opacity-100 h-5 gap-1 px-1.5 text-xs font-medium rounded bg-absolute-positive border border-gray-400/20" >
                    K
                </kbd>
            </div>
            <SearchIcon height={16} width={16} className={cn("items-center justify-start gap-1 my-auto hover:text-absolute-negative cursor-pointer", type === "editor" ? "hidden 4xs:flex md:hidden" : "flex xs:hidden")}></SearchIcon>
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Layouts components" className="gap-0">
              {LayoutsComponents.map((e) => {
                  return (
                      <CommandItem key={e.tag} value={e.name} onSelect={() => {router.push('/components/' + e.tag); setOpen((open) => !open);}} className="hover:bg-hover text-textcolor-primary cursor-pointer rounded-md">
                              {/* <Calendar className="mr-2 h-4 w-4" /> */}
                              <span>{e.name}</span>
                      </CommandItem>
                  )
              })}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Pages" className="gap-0">
              {IntoCommandInput(Essentials)}
          </CommandGroup>
          <CommandSeparator />
        </CommandList>
      </CommandDialog>
    </>
  )
}
