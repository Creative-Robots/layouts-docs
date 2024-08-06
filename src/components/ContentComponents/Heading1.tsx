import { cn } from "@/lib/cn";
import { useRepContext } from "@/lib/RepContext";
import { Heading1, Heading1Box, Heading1Description } from "@/lib/Style";
import { useEffect } from "react";

export const _Heading1 = ({title, description}:{title:string, description?:string}) => {
    const {setRep} = useRepContext();
    const id = title.normalize();
    useEffect(() => {
        setRep((l) => {
          if (l.filter(e => e.id == id).length > 0) return [...l];
          return [...l, {name: title, id: id}];
        })
      }, [setRep])
    return (
        <h1 className={cn(Heading1Box)} id={id}>
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