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

import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { FileElementType, getMdxFiles } from "@/lib/fileUtils";

const Essentials = getMdxFiles();

export function SearchCommand() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
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
        <CommandItem key={h.name} value={h.name} onMouseDown={() => {router.push('/components/' + h.parsedName); setOpen((open) => !open);}} className="hover:bg-gray-100 cursor-pointer rounded-md">
            {/* <Calendar className="mr-2 h-4 w-4" /> */}
            <span>{h.name}</span>
        </CommandItem>
      )
    }
  })
}

  return (
    <>
      <div className="justify-start items-start flex-col flex gap-2 relative max-w-[250px] ml-auto mr-4 self-center" onClick={simulateCtrlK}>
            <Input className="reset py-2 px-4 items-center rounded-lg w-full bg-gray-100 placeholder:text-gray-500 text-[13px] outline-white focus:outline-gray-200 text-[#1e1f22] focus:shadow-sm cursor-pointer" placeHolder="Search..." placeholder="Search..." />
            <div className="items-center justify-start flex gap-1 absolute right-2 top-2.5" >
                <kbd className="w-fit pointer-events-none inline-flex select-none items-center font-mono text-muted-foreground opacity-100 h-5 gap-1 px-1.5 text-xs font-medium rounded bg-white border border-gray-400/20" >
                    ⌘
                </kbd>
                <kbd className="w-fit pointer-events-none inline-flex select-none items-center font-mono text-muted-foreground opacity-100 h-5 gap-1 px-1.5 text-xs font-medium rounded bg-white border border-gray-400/20" >
                    K
                </kbd>
            </div>
        </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Layouts components" className="gap-0">
              {LayoutsComponents.map((e) => {
                  return (
                      <CommandItem key={e.tag} value={e.name} onMouseDown={() => {router.push('/components/' + e.tag); setOpen((open) => !open);}} className="hover:bg-gray-100 cursor-pointer rounded-md">
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
