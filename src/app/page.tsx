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
  const searchParams = useSearchParams();
  const name = searchParams.get('component');
  const dValue = name ? emptyDocData : null;
  const [data, setData] = useState<DocType | null>(dValue);

  const loadData = async () => {
    await fetch('http://localhost:3000/docs?id=' + name)
    .then(async (value) => {
      const data = await value.json();
      if (data.error) {
        return setData(null);
      }
      setData(data);
    })
    .catch(() => setData(null))
  }

  useEffect(() => {
    if (data !== null) {loadData();}
  }, [])

  if (data !== null) {
    if (data.tag === "") {
      return (
        <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-100">
          <Loader/>
        </div>
      )
    }
    return (
    <main className="bg-gray-50 w-full min-h-screen">
      <Doc data={data}/>
    </main>
    );
  }
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