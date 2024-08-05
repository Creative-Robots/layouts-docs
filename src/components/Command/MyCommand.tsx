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
import LayoutsComponents from './../../docs/Layouts/Components.json';
import HtmlComponents from './../../docs/html.json'
import { useRouter } from "next/navigation";

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

  return (
    <>
      <p className="text-sm text-muted-foreground w-fit ml-auto px-2">
        Press{" "}
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </p>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {/* <CommandGroup heading="Layouts components">
            <CommandItem>
              <Calendar className="mr-2 h-4 w-4" />
              <span>Calendar</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator /> */}
            <CommandGroup heading="HTML components">
                {HtmlComponents.map((e, idx) => {
                    return (
                        <CommandItem key={'hComponent ' + idx} onClick={() => router.push('/' + e.parsedName)}>
                            {/* <Calendar className="mr-2 h-4 w-4" /> */}
                            <span>{e.name}</span>
                        </CommandItem>
                    )
                })}
            </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Layouts components">
                {LayoutsComponents.map((e, idx) => {
                    return (
                        <CommandItem key={'lComponent ' + idx} onClick={() => router.push('/' + e.tag)}>
                            {/* <Calendar className="mr-2 h-4 w-4" /> */}
                            <span>{e.name}</span>
                        </CommandItem>
                    )
                })}
            </CommandGroup>
          <CommandSeparator />
        </CommandList>
      </CommandDialog>
    </>
  )
}
