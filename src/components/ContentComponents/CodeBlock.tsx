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
    const code = text.replace(new RegExp(spaces, 'g'), '\t\t');
    return code;
}

const REGEXP = [
    {
        "type": "hash",
        "reg": "#[a-zA-Z0-9-_]+"
    },
    {
        "type": "blockhead",
        "reg": "^\\s*\\/[a-zA-Z][a-zA-Z0-9-.]*",
        "flag": "gm",
    },
    {
        "type": "variant",
        "reg": "%[0-9a-zA-Z_/-]+"
    },
    {
        "type": "openai",
        "reg": "\\(.*\\.{3,}.*\\)"
    },
    {
        "type": "comment",
        "reg": "[\\s\n]{1,}\\/\\/.*"
    },
    {
        "type": "comment",
        "reg": "^\\/\\/.*"
    },
    {
        "type": "prop-name",
        "reg": "\\s@[a-zA-Z0-9_-]+={0,1}"
    },
    {
        "reg": "(?<=^|\\s)([A-Za-z0-9.;_\\*\\[\\]/'\"\\(\\)%-]*:){0,1}-{0,1}(accent|align|animate|appearance|aspect|auto|backdrop|basis|bg|blur|border|bottom|box|break|brightness|caption|caret|clear|col|columns|content|contrast|cursor|decoration|delay|diagonal|divide|drop|duration|ease|end|fill|flex|float|flow|font|forced|from|gap|grayscale|grid|grow|h|hue|hyphens|indent|inline|inset|invert|isolation|items|justify|leading|left|line|lining|list|m|max|mb|me|min|mix|ml|mr|ms|mt|mx|my|no|normal|not|object|oldstyle|opacity|order|origin|outline|overflow|overscroll|p|pb|pe|pl|place|pointer|pr|proportional|ps|pt|px|py|resize|right|ring|rotate|rounded|row|saturate|scale|scroll|select|self|sepia|shadow|shrink|size|skew|slashed|snap|space|sr|stacked|start|stroke|subpixel|table|tabular|text|to|top|touch|tracking|transition|translate|underline|via|w|whitespace|will|z)-[A-Za-z0-9.;_\\*\\[\\]/'\"\\(\\)%-]{1,}",
        "type": "tailwind-class",
        "flags": "g"
    },    
    {
        "reg": "(?<=^|\\s)([A-Za-z0-9.;_\\*\\[\\]/'\"\\)-]*:)?-{0,1}(absolute|antialiased|block|blur|border|capitalize|collapse|container|contents|fixed|flex|font-body|font-display|grayscale|grid|grow|hidden|inline|invert|invisible|isolate|italic|lowercase|ordinal|outline|overline|peer|relative|reset|resize|ring|rounded|sepia|shadow|shrink|static|sticky|table|text-textcolor-primary|text-textcolor-secondary|text-textcolor-tertiary|transition|truncate|typeface-body-2xl|typeface-body-3xl|typeface-body-4xl|typeface-body-5xl|typeface-body-6xl|typeface-body-7xl|typeface-body-8xl|typeface-body-9xl|typeface-body-lg|typeface-body-md|typeface-body-sm|typeface-body-xl|typeface-body-xs|typeface-display-2xl|typeface-display-3xl|typeface-display-4xl|typeface-display-5xl|typeface-display-6xl|typeface-display-7xl|typeface-display-8xl|typeface-display-9xl|typeface-display-lg|typeface-display-md|typeface-display-sm|typeface-display-xl|typeface-display-xs|underline|uppercase|visible)(?=\\s|$)",
        "type": "tailwind-class",
        "flags": "g"
    },    
];

const RegColors: Record<string, string> = {
    "background": "#FBFBFB",
    "blockhead": '#33AAEE',
    "hash": "#27E8A7",
    "variant": "#FFAA00",
    "multi.line.comment": "#BBBBBB",
    "comment": "#BBBBBB",
    "keywords": "#4b0082",
    "openai": "#32AE86",
    "tailwind-class": "#8855FF",
    "prop-name": "#5D770D"
};

const customRules = [
    { regex: /accordion/, color: '#FF0000' }, // Red in hex
];

const applyCustomRules = (code:string) => {
    let highlightedCode = code;
  
    REGEXP.forEach((rule) => {
      const regex = new RegExp(rule.reg, rule.flag || 'g');
      highlightedCode = highlightedCode.replace(regex, (match) => {
        return `<span style="color: ${RegColors[rule.type]} ">${match}</span>`;
      });
    });
  
    return highlightedCode;
  };

export const CodeBlock = ({code, label, title, dark=false, className}:CodeBlockProps) => {
    const [state, copyToClipboard] = useCopyToClipboard();
    const copyCode = () => {
        copyToClipboard(convertTabsToSpaces(code));
    };

    if (dark) return (
        <div className={cn("justify-start items-start flex-col flex bg-[#1e1f22] h-fit rounded-lg border border-gray-400 w-full min-w-[100px]", className)} >
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
            <div className="justify-start items-start flex-col flex w-full p-6 overflow-x-scroll" >
                <pre className="font-robotomono text-sm font-normal leading-[24px] text-nowrap min-w-fit" >
                    <code dangerouslySetInnerHTML={{__html: applyCustomRules(convertTabsToSpaces(code))}} />
                </pre>
            </div>
        </div>
    )

    const blockPadding = 'p-3 sm:p-4 py-3 sm:py-4'

    return (
        <div className={cn("justify-start items-start flex-col flex bg-[#fbfbfb] h-fit rounded-lg border border-gray-400/20 w-full min-w-[100px]", className)} >
            <div className={cn(blockPadding, `flex w-full justify-between border-b border-black/5 items-center py-1.5 sm:py-1.5 md:py-1.5`)} >
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
            <div className={cn(blockPadding, `justify-start items-start flex-col flex w-full overflow-x-scroll`)} >
                <pre className="font-robotomono text-xs sm:text-[0.8rem] font-normal leading-tight text-nowrap min-w-fit">
                    {code.includes("</") || code.includes("/>")
                    ? code
                    : <div dangerouslySetInnerHTML={{__html: applyCustomRules(convertTabsToSpaces(code))}} />}
                </pre>
            </div>
        </div>
    )
}