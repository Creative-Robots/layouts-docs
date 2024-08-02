import { redirect } from "next/navigation";

const DEFAULT_PAGE = '/what-is-layouts';

export default function Home() {
    redirect(DEFAULT_PAGE);
}