import { useCopyToClipboard } from "react-use";
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Separator } from "../ui/separator"
import { cn } from "@/lib/cn";

interface CodeBlockProps {
    code:string,
    label?:string,
    title?:string,
    dark?:boolean,
    className?:string,
}

function convertTabsToSpaces(text:string) {
    const spaces = ' '.repeat(2);
    return text.replace(new RegExp(spaces, 'g'), '\t\t');
}

export const CodeBlock = ({code, label, title, dark=false, className}:CodeBlockProps) => {
    const [state, copyToClipboard] = useCopyToClipboard();
    const copyCode = () => {
        copyToClipboard(convertTabsToSpaces(code));
    };

    if (dark) return (
        <div className={cn("justify-start items-start flex-col flex bg-[#1e1f22] h-fit rounded-lg border border-gray-400/10 w-full", className)} >
            <div className="flex w-full p-3 justify-between border-b border-white/5 items-center py-1.5" >
                <span className="text-xs text-white font-normal" >
                    { title ? title : "Short syntax"}
                </span>
                <Button onClick={copyCode} className="reset size-fit flex p-1.5 border rounded-lg bg-transparent hover:bg-white/10 text-white border-transparent transition delay-0 duration-75 hover:shadow-sm" variant="default" >
                    {state.value 
                        ? <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg>
                        : <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                    }  
                </Button>
            </div>
            <div className="justify-start items-start flex-col flex w-full p-6" >
                <pre className="font-robotomono text-sm font-normal leading-[24px] text-blue-400 text-wrap" >
                    {convertTabsToSpaces(code)}
                </pre>
            </div>
        </div>
    )
    return (
        <div className={cn("justify-start items-start flex-col flex bg-[#fbfbfb] h-fit rounded-lg border border-gray-400/10 w-full", className)} >
            <div className="flex w-full p-3 justify-between border-b border-black/5 items-center py-1.5" >
                <span className="text-xs text-[#5b5e66] font-normal" >
                    { title ? title : "Short syntax"}
                </span>
                <Button onClick={copyCode} className="reset size-fit flex p-1.5 border rounded-lg bg-transparent hover:bg-white text-[#5b5e66] hover:text-[#1e1f22] transition delay-0 duration-75 hover:shadow-sm" variant="default" >
                    {state.value 
                        ? <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg>
                        : <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                    } 
                </Button>
            </div>
            <div className="justify-start items-start flex-col flex w-full p-6" >
                <pre className="font-robotomono text-sm font-normal leading-[24px] text-blue-400 text-wrap">
                    {convertTabsToSpaces(code)}
                </pre>
            </div>
        </div>
    )
}