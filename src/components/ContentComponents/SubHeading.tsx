import { cn } from "@/lib/cn";
import { useRepContext } from "@/lib/RepContext";
import { _H3, H3Box, SubHeadingDescription } from "@/lib/Style";
import { useEffect } from "react";

export const SubHeading = ({title, description}:{title:string, description?:string}) => {
    const {setRep} = useRepContext();
    const id = title.normalize();
    useEffect(() => {
        setRep((l) => {
          if (l.filter(e => e.id == id).length > 0) return [...l];
          return [...l, {name: title, id: id, level: 3}];
        })
      }, [setRep])
    return (
        <div className={cn(H3Box)} id={id}>
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