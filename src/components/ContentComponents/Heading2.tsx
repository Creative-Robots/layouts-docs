import { cn } from "@/lib/cn";
import { useRepContext } from "@/lib/RepContext";
import { Heading2, Heading2Box, Heading2Description } from "@/lib/Style";
import { useEffect } from "react";

export const _Heading2 = ({title, description}:{title:string, description?:string}) => {
    const {setRep} = useRepContext();
    const id = title.normalize();
    useEffect(() => {
        setRep((l) => {
          if (l.filter(e => e.id == id).length > 0) return [...l];
          return [...l, {name: title, id: id, level: 2}];
        })
      }, [setRep])
    return (
        <h2 className={cn(Heading2Box)} id={id}>
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