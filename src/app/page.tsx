'use client'

import Doc, { DocType } from "@/components/Doc";
import Loader from "@/components/Loader";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const emptyDocData:DocType = {
  tag: "",
  title: "",
  shortDescriptionOfTheTag: "",
  allowedAttributes: [],
  canHaveChildren: false,
  usageExamples: [],
}

export default function Home() {

  return (
      <main className='w-[100%] min-h-screen p-[122px]'>
        <span>noComponent choosen</span>
      </main>
  );
}



{/*     Image useCase : 

    <Image
      className="relative"
      src=" relativePath from public ex :  /next.svg"
      alt="Next.js Logo"
      width={180}
      height={37}
      priority
    />

*/}