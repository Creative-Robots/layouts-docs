import { cn } from "@/lib/cn";
import { _H3, H3Box, H3Description } from "@/lib/Style";
import { getTextFromChildren } from "@/lib/utils";

export const H3 = ({title, description}:{title:string, description?:string}) => {
    const id = (title.normalize ? title.normalize() : getTextFromChildren(title)).replace(/\'/g, "");
    return (
        <h3 className={cn(H3Box)} id={id}>
            <p className={cn(_H3)}>{title}</p>
            {
                description && description.length > 0 && 
                <span className={cn(H3Description)} >
                    {description}
                </span>
            }
        </h3>
    )
}