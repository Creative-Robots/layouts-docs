import { cn } from "@/lib/cn";
import { _H3, H3Box, SubHeadingDescription } from "@/lib/Style";
import { getTextFromChildren } from "@/lib/utils";

export const SubHeading = ({title, description, className}:{title:string, description?:string, className?:string}) => {
    const id = (title.normalize ? title.normalize() : getTextFromChildren(title)).replace(/\'/g, "");
    return (
        <div className={cn(H3Box, className)} id={id}>
            <p className={cn(_H3)}>{title}</p>
            {
                description && description.length > 0 && 
                <span className={cn(SubHeadingDescription)} >
                    {description}
                </span>
            }
        </div>
    )
}