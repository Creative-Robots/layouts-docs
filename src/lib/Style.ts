


// styles for left Sheet 

import { cn } from "./cn";

const innerTextColor:string = "text-[#555555]";
export const selectedElementStyle:string = "bg-gray-100 px-4 rounded-md w-fit";

const folder_1 = cn("text-sm font-semibold truncate");

const folder_2 = cn("truncate hover:text-black text-sm", innerTextColor);

const folder_3 = cn("text-sm truncate", innerTextColor);

const element = cn("hover:text-black text-sm self-start truncate text-start py-2", innerTextColor);

const other = cn("", innerTextColor);


// styles for Mdx Pages Content

const titleBox = cn("flex whitespace-pre-wrap group mb-4");
const title = cn("text-4xl text-black");

const descriptionBox = cn("flex whitespace-pre-wrap group mb-4 max-w-full ");
const description = cn("text-base");

const h1Box = cn("flex whitespace-pre-wrap group");
const h1 = cn("cursor-pointer text-3xl text-black flex flex-row");

const h2Box = cn("flex whitespace-pre-wrap group mt-12 mb-4");
const h2 = cn("cursor-pointer text-2xl text-black flex flex-row");

const h3Box = cn("flex whitespace-pre-wrap group mt-6 mb-4 ");
const h3 = cn("cursor-pointer text-xl text-black flex flex-row");

const p:string = "max-w-full w-full overflow-hidden";

const ul = cn("flex flex-col my-4");
const li = cn("flex flex-row justify-start");

const note = "w-full max-w-full h-fit flex flex-row bg-blue-50 border border-blue-200 rounded-lg p-3 items-center mt-4 text-sm gap-2";
const info = "w-full max-w-full h-fit flex flex-row bg-gray-100 border border-gray-200 rounded-lg p-3 items-center mt-4 text-sm gap-2 text-wrap";
const code = "w-full max-w-full overflow-x-scroll h-fit";
const responseField = "";
const latex = "";
const snippetIntro = "";


// styles for Components Pages

const H1Box = "flex flex-col gap-2 mt-8";
const H1 = "text-xl font-medium";

const H2Box = "flex flex-col mt-4";
const H2 = "text-lg font-medium";

const H3Box = "flex flex-col gap-2 mt-8 pl-3";
const H3 = "text-base text-gray-800 font-medium mb-4";

const Title = "text-5xl font-semibold";

const Section = "flex flex-col gap-4";
const SubSection = "flex flex-col";

const DivWithToolTip = "group relative flex flex-row items-center gap-2 cursor-help";
const DivWithDescription = "group relative flex flex-row items-center gap-2 cursor-help col-span-3";
const PropsNameWithDesc = "text-sm text-[#373114] bg-gray-200 px-2 py-1 rounded-lg w-fit truncate";


const PropsHeaderBox = "flex flex-col gap-2 px-4 w-full";
const PropsHeader = "grid grid-cols-11 gap-2";
const PropsHeaderTitle = "text-base text-[#5B5E66] font-semibold col-span-3";
const isRequiredTitle = "col-span-2 text-center";

const PropsLine1_2 = "bg-[#fcfcfc]";
const PropsLine2_2 = "bg-[#fafafa]";

const PropsLineBox = "flex flex-col gap-4 min-h-8 justify-center px-4 border-b py-3";
const PropsLine = "grid grid-cols-11 gap-2 items-center";

const PropsName = "text-sm text-[#373114] bg-gray-200 px-2 py-1 rounded-lg w-fit col-span-3 truncate";

const PropsCol = "flex flex-col justify-normal items-start col-span-3";
const PropsColTitle = "flex flex-col justify-normal items-start";
const PropsColTitleText = "text-sm text-[#5B5E66]";

const requiredCol = "text-sm text-[#1E1F22] text-center col-span-2";

const Description = "text-base text-[#5B5E66] font-normal";


//CodeBlock 
const CodeBlockBox = "h-fit w-full max-w-full bg-gray-900 rounded-lg my-4 shadow-lg py-2 relative flex flex-col overflow-hidden";
const CodeBlockHeaderTitle = "h-8 max-w-full w-full text-base border-b border-gray-600 mb-2 ml-2 text-white";
const CodeBlockCopyButton = "hover:bg-gray-700 text-white rounded-md p-2 absolute z-20 right-2 text-sm font-semibold top-0.5";
const CodeBlockCopyButtonWithHeader = "top-1";

const CodeBlockLine = "flex-1 mx-2 overflow-x-scroll relative max-w-ful";
const CodeBlockLineB = 'table-row relative max-w-full overflow-x-scroll';
const CodeBlockLineNumber = "table-cell pr-4 text-sm text-gray-500 text-right select-none";
const CodeBlockLineContent = "table-cell text-wrap text-sm max-w-full overflow-x-scroll";
const CodeBlockLineToken = "max-w-full";

// BreadCrums
const BreadCrums = "h-fit w-fit flex flex-row gap-1 justify-start items-center";
const BreadCrumsBase = "text-xs h-fit text-black/30";
const BreadCrumsItem = "text-xs text-[#1E1F22]";

// Other
const AcceptChildrenBox = "flex-row items-center";
const AcceptChildrenTitle = "";    // by default its H2
const AcceptChildrenIcon = "text-sm text-[#5B5E66] font-normal ml-10";


// Export 
export {
    // Mdx Page
    folder_1,
    folder_2,
    folder_3,
    element,
    other,
    title,
    titleBox,
    description,
    descriptionBox,
    h1, h1Box,
    h2, h2Box,
    h3, h3Box,
    p,
    ul,
    li,
    note,
    info,
    code,
    responseField,
    latex,
    snippetIntro,

    // Components Page
    H1 as _H1, H1Box,
    H2 as _H2, H2Box,
    H3 as _H3, H3Box,
    Title as _Title,
    Section as _Section,
    SubSection as _SubSection,
    DivWithToolTip,
    DivWithDescription,
    PropsNameWithDesc,
    PropsHeaderBox,
    PropsHeader,
    PropsHeaderTitle,
    isRequiredTitle,
    PropsLine1_2,
    PropsLine2_2,
    PropsLineBox,
    PropsLine,
    PropsName,
    PropsCol,
    PropsColTitle,
    PropsColTitleText,
    Description,
    requiredCol,
    AcceptChildrenBox,
    AcceptChildrenIcon,
    AcceptChildrenTitle,

    //CodeBlock
    CodeBlockBox,
    CodeBlockHeaderTitle,
    CodeBlockCopyButton,
    CodeBlockCopyButtonWithHeader,
    CodeBlockLine,
    CodeBlockLineB,
    CodeBlockLineNumber,
    CodeBlockLineContent,
    CodeBlockLineToken,

    // Breadcrums
    BreadCrums,
    BreadCrumsBase,
    BreadCrumsItem,
}