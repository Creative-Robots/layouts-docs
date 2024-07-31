'use server'

import Doc, { DocType } from "@/components/Doc";
import { redirect } from "next/navigation";
import path from "path";
import * as fs from 'fs';

async function getJsonData(filename:string) {
  if (filename === null) return null;
  const filePath = path.join(process.cwd(), 'src/docs/html/', `${filename}.json`);
  if (!fs.existsSync(filePath)) return null;
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const jsonData = JSON.parse(fileContent);
  return jsonData;
}

export default async function Home({ params }: { params: { name: string } }) {
  const { name } = params;
  let data = await getJsonData(name);
  if (!data) redirect('/');

  return (
    <Doc data={data}/>
  );
}