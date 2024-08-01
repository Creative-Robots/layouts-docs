import { useRepContext } from "@/lib/RepContext";
import { useEffect } from "react";

export const H1 = ({text}:{text:string}) => {
    const {setRep} = useRepContext();
    const id = text.normalize();
    useEffect(() => {
        setRep((l) => {
          if (l.filter(e => e.id == id).length > 0) return [...l];
          return [...l, {name: text, id: id}];
        })
      }, [setRep])
    return (
        <div className='flex flex-col gap-2 mt-8' id={id}>
            <h1 className='text-xl font-medium'>{text}</h1>
        </div>
    )
}

export const Title = ({text}:{text:string}) => {
    const {setRep} = useRepContext();
    const id = text.normalize();
    useEffect(() => {
        setRep((l) => {
          if (l.filter(e => e.id == id).length > 0) return [...l];
          return [...l, {name: text, id: id}];
        })
      }, [setRep])
    return (
        <h1 className="text-5xl font-semibold" id={id}>{text}</h1>
    )
}