


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


// Export 

export {folder_1, folder_2, folder_3, element, other, title, titleBox, description, descriptionBox, h1, h1Box, h2, h2Box, h3, h3Box, p, ul, li, note, info, code}