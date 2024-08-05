'use server'

import { redirect } from "next/navigation";

const DEFAULT_PAGE = '/what-is-layouts';

export default async function Home() {
  redirect(DEFAULT_PAGE);
}