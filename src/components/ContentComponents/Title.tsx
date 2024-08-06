import { cn } from "@/lib/cn";
import { useRepContext } from "@/lib/RepContext";
import { _Title, TitleBox, TitleDescription } from "@/lib/Style";
import { useEffect } from "react";


export const Title = ({title, description}:{title:string, description?:string}) => {
    const {setRep} = useRepContext();
    const id = title.normalize();
    useEffect(() => {
        setRep((l) => {
          if (l.filter(e => e.id == id).length > 0) return [...l];
          return [...l, {name: title, id: id}];
        })
      }, [setRep])
    return (
        <div className={TitleBox}>
            <h1 className={cn(_Title)} id={id}>{title}</h1>
            {
                description && description.length > 0 && 
                <span className={cn(TitleDescription)} >
                    {description}
                </span>
            }
        </div>
    )
}