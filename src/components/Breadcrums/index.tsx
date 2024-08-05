import { cn } from "@/lib/cn";
import { componentsProps } from "@/lib/componentTypes";
import { BreadCrums, BreadCrumsBase, BreadCrumsItem } from "@/lib/Style";
import React from "react";
import { FaChevronRight } from "react-icons/fa6";

interface DocBreadcrumsProps extends componentsProps {
    items: string[];
    homeName?: string;
}

export default function DocBreadcrums({className, homeName="Components", items}:DocBreadcrumsProps) {
    return (
        <div className={cn(BreadCrums, className)}>
            {/** Home */}
            <h1 className={BreadCrumsBase}>{homeName}</h1>
            {items.map((i, idx) => (<React.Fragment key={idx}>
                <FaChevronRight color="lightgray" strokeWidth={3} size={10} key={idx + 'fa'}/>
                <span className={BreadCrumsItem} key={idx + 'sp'}>{i}</span>
            </React.Fragment>))}
        </div>
    )
}