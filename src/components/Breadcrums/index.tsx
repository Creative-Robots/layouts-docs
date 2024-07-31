import { cn } from "@/lib/cn";
import { componentsProps } from "@/lib/componentTypes";
import React from "react";
import { FaChevronRight } from "react-icons/fa6";

interface DocBreadcrumsProps extends componentsProps {
    items: string[];
    homeName?: string;
}

export default function DocBreadcrums({className, homeName="Components", items}:DocBreadcrumsProps) {
    return (
        <div className={cn("h-fit w-fit flex flex-row gap-1 justify-start items-center", className)}>
            {/** Home */}
            <h1 className="text-xs h-fit text-black/30">{homeName}</h1>
            {items.map((i, idx) => (<React.Fragment key={idx}>
                <FaChevronRight color="lightgray" strokeWidth={3} size={10} key={idx + 'fa'}/>
                <span className="text-xs text-[#1E1F22]" key={idx + 'sp'}>{i}</span>
            </React.Fragment>))}
        </div>
    )
}