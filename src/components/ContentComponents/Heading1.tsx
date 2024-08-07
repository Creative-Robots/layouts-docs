import { cn } from "@/lib/cn";
import { Heading1, Heading1Box, Heading1Description } from "@/lib/Style";
import { getTextFromChildren } from "@/lib/utils";

export const _Heading1 = ({title, description, className}:{title:string, description?:string, className?:string}) => {
    const id = title.normalize ? title.normalize() : getTextFromChildren(title);
    return (
        <h1 className={cn(Heading1Box, className)} id={id}>
            <p className={cn(Heading1)}>{title}</p>
            {
                description && description.length > 0 && 
                <span className={cn(Heading1Description)} >
                    {description}
                </span>
            }
        </h1>
    )
}