import { cn } from "@/lib/cn";
import { Heading2, Heading2Box, Heading2Description } from "@/lib/Style";
import { getTextFromChildren } from "@/lib/utils";

export const _Heading2 = ({title, description, className}:{title:string, description?:string, className?:string}) => {
    const id = title.normalize ? title.normalize() : getTextFromChildren(title);
    return (
        <h2 className={cn(Heading2Box, className)} id={id}>
            <p className={cn(Heading2)}>{title}</p>
            {
                description && description.length > 0 && 
                <span className={cn(Heading2Description)} >
                    {description}
                </span>
            }
        </h2>
    )
}