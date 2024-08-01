import { ComponentDoc } from "@/app/components/[name]/page";
import DocBreadcrums from "../Breadcrums";
import { Title } from "./DocComponents";

interface DocProps {
    data: ComponentDoc;
}

export default function LayoutComponentsDoc({data}:DocProps) {
    const {name, description} = data;
    return (
        <div className='flex flex-col gap-3 pb-20 lg:px-12 md:px-10 sm:px-8 px-5 min-h-screen max-w-[1200px] flex-1 pt-[122px] lg:mx-auto'>
            <DocBreadcrums items={[name]} />
            <div className='flex flex-col gap-4'>
                <Title text={name}></Title>
                <p className='text-lg text-[#5B5E66] font-normal'>{description}</p>
                {name && <div className='flex flex-row gap-2 items-center  '>
                    <p className='text-[#1E1F22] text-sm font-normal '>Source : </p>
                    <img alt="authorImg" src="https://ui.shadcn.com/apple-touch-icon.png"  className='w-[18px]'/>
                    <p className=' text-xs font-bold text-[#1E1F22]'>inspired by ShadCn</p>
                </div>} 
            </div>
        </div>
    )
}