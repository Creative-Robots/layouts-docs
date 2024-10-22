// styles for left Sheet

import { cn } from "./cn";

const innerTextColor: string = "text-textcolor-secondary";
export const selectedElementStyle: string = "text-textcolor-primary";

const folder_1 = cn(
    " text-[13px] 3xs:text-[5vw] 2xs:text-sm text-textcolor-primary font-medium truncate"
);

const folder_2 = cn(
    "truncate hover:text-black text-[13px] 3xs:text-[5vw] 2xs:text-sm",
    innerTextColor
);

const folder_3 = cn(
    "text-[13px] 3xs:text-[5vw] 2xs:text-sm truncate",
    innerTextColor
);

const element = cn(
    "hover:text-textcolor-primary w-fit text-[13px] 3xs:text-[5vw] 2xs:text-sm font-body text-start truncate py-1 text-wrap",
    innerTextColor
);

const other = cn("", innerTextColor);

// relatif to MDX

export const paragraphClassName = "block my-4 mx-0 break-normal";
export const strongClassName = "font-medium";

const ul = cn("flex flex-col my-4");
const li = cn("flex flex-row justify-start");

const note =
    "w-full max-w-full h-fit flex flex-row bg-blue-50 border border-blue-200 rounded-lg p-3 items-start mt-4 text-sm gap-2";
const info =
    "w-full max-w-full h-fit flex flex-row bg-background-2 border border-hover rounded-lg p-3 items-start mt-4 text-sm gap-2 text-wrap";
const code = "w-full max-w-full overflow-x-scroll h-fit";
const responseField = "";
const latex = "";
const snippetIntro = "";
const Card =
    "flex flex-col h-fit p-6 mt-5 border w-full p-3 rounded-xl hover:border-absolute-negative cursor-pointer bg-relief";

// similarity

const GlobalDescription = "text-sm text-textcolor-primary mb-2";

// styles for Components Pages

const TitleBox = "justify-start items-start gap-1 flex-col flex w-full";
const TitleBox_Mdx = "mb-[32px]";
const Title =
    "text-textcolor-primary text-2xl md:text-[30px] md:mb-3 md:mt-2 font-medium tracking-tight";
const TitleDescription = cn(GlobalDescription, "text-sm md:text-base");
const SubTitleDescription = cn(GlobalDescription, "text-xs md:text-sm");

const Heading1Box =
    "justify-start gap-2 items-start flex-col flex w-full my-[0.67em]";
const Heading1 = "text-textcolor-primary text-lg md:text-xl tracking-tight font-medium";
const Heading1Description = cn(GlobalDescription, "");

const Heading2Box = "justify-start items-start flex-col flex w-full mb-2";
const Heading2Box_Mdx = "mt-[48px] mb-[16px]";
const Heading2 = "text-textcolor-primary text-sm md:text-base font-medium mb-1";
const Heading2Description = cn(GlobalDescription, "");

const SubHeadingBox = "justify-start items-start flex-col flex w-full my-2";
const SubHeading = "text-textcolor-primary text-sm";
const SubHeadingDescription = cn(GlobalDescription, "");

const H3Box = "justify-start items-start flex-col flex w-full gap-2";
const H3Box_Mdx = " mt-[48px] mb-[12px]";
const H3 = "text-textcolor-primary text-[16px] font-medium";
const H3Description = cn(GlobalDescription, "");

const H4 = "text-slate-900/80 text-[14px] font-medium";

const Section = "flex flex-col my-8";
const SubSection = "flex flex-col gap-1 my-6";

const DivWithToolTip = "relative flex flex-row items-center gap-2 text-xs";
const DivWithDescription =
    "relative flex flex-row items-center gap-2 col-span-3";
const PropsNameWithDesc =
    "text-sm text-textcolor-secondary bg-hover px-2 py-1 rounded-lg w-fit truncate";

const PropsHeaderBox =
    "flex flex-col gap-2 px-4 w-full mt-4 mb-2 min-w-[300px]";
const PropsHeader = "grid grid-cols-6 sm:grid-cols-11 gap-2";
const PropsHeaderTitle = "text-sm text-textcolor-primary font-medium col-span-3";
const isRequiredTitle = "col-span-2 text-center";

const PropsLine1_2 = "bg-background";
const PropsLine2_2 = "bg-relief";

const PropsLineBox =
    "flex flex-col gap-4 min-h-8 justify-center px-4 border-b py-3";
const PropsLine = "grid grid-cols-6 sm:grid-cols-11 gap-2 items-center text-xs";

const PropsName =
    "text-xs text-textcolor-secondary bg-hover px-2 py-1 rounded-lg w-fit col-span-3 truncate";

const PropsCol = "flex flex-col justify-normal items-start col-span-3";
const PropsColTitle = "flex flex-col justify-normal items-start";
const PropsColTitleText = "text-xs font-medium text-textcolor-primary";

const requiredCol = "text-sm text-textcolor-primary text-center col-span-2";

const Description = "text-base text-textcolor-primary font-normal";

const VariantsHeaderBox =
    "flex flex-col gap-2 px-4 w-full mt-4 mb-2 min-w-[300px]";
const VariantsHeader = "grid grid-cols-5 gap-2";
const VariantsHeaderTitle = "text-sm text-textcolor-primary font-medium col-span-2";
const VariantsSecondHeaderTitle = "text-sm text-textcolor-primary font-medium col-span-3";

const VariantsLine1_2 = "bg-background";
const VariantsLine2_2 = "bg-relief";

const VariantsLineBox =
    "flex flex-col gap-4 min-h-8 justify-center px-4 border-b py-3";
const VariantsLine = "grid grid-cols-5 gap-2 items-center text-xs";

const VariantsName =
    "text-xs text-textcolor-secondary bg-hover px-2 py-1 rounded-lg w-fit col-span-2 break-all";

const VariantsCol = "flex flex-col justify-normal items-start col-span-3";
const VariantsColTitle = "flex flex-col justify-normal items-start";
const VariantsColTitleText = "text-xs font-medium text-textcolor-primary";


//CodeBlock
const CodeBlockBox =
    "h-fit w-full max-w-full bg-gray-900 rounded-lg my-4 shadow-lg py-2 relative flex flex-col overflow-hidden";
const CodeBlockHeaderTitle =
    "h-8 max-w-full w-full text-base border-b border-gray-600 mb-2 ml-2 text-white";
const CodeBlockCopyButton =
    "hover:bg-gray-700 text-white rounded-md p-2 absolute z-20 right-2 text-sm font-semibold top-0.5";
const CodeBlockCopyButtonWithHeader = "top-1";

const CodeBlockLine = "flex-1 mx-2 overflow-x-scroll relative max-w-ful";
const CodeBlockLineB = "table-row relative max-w-full overflow-x-scroll";
const CodeBlockLineNumber =
    "table-cell pr-4 text-sm text-gray-500 text-right select-none";
const CodeBlockLineContent =
    "table-cell text-wrap text-sm max-w-full overflow-x-scroll";
const CodeBlockLineToken = "max-w-full";

// BreadCrums
const BreadCrums = "h-fit w-fit flex flex-row gap-1 justify-start items-center";
const BreadCrumsBase = "text-xs h-fit text-black/30 bg-background-2";
const BreadCrumsItem = "text-xs text-textcolor-primary";

// Other
const AcceptChildrenBox = "flex-row items-center";
const AcceptChildrenTitle = ""; // by default its H2
const AcceptChildrenIcon = "text-sm text-textcolor-primary font-normal ml-10";

// Export
export {
    // Mdx Page
    folder_1,
    folder_2,
    folder_3,
    element,
    other,
    ul,
    li,
    note,
    info,
    code,
    responseField,
    latex,
    snippetIntro,
    Card,

    // Components
    TitleBox,
    TitleBox_Mdx,
    Title as _Title,
    TitleDescription,
    SubTitleDescription,
    Heading1Box,
    Heading1,
    Heading1Description,
    Heading2Box,
    Heading2Box_Mdx,
    Heading2,
    Heading2Description,
    SubHeadingBox,
    SubHeading,
    SubHeadingDescription,
    H3Box,
    H3Box_Mdx,
    H3 as _H3,
    H3Description,
    H4 as _H4,
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
    VariantsCol,
    VariantsColTitle,
    VariantsColTitleText,
    VariantsHeaderBox,
    VariantsHeader,
    VariantsHeaderTitle,
    VariantsSecondHeaderTitle,
    VariantsLineBox,
    VariantsLine,
    VariantsName,
    VariantsLine1_2,
    VariantsLine2_2,

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
};
