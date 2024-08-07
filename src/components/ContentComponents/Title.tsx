import { cn } from "@/lib/cn";
import { _Title, TitleBox, TitleDescription } from "@/lib/Style";


export const Title = ({title, description}:{title:string, description?:string}) => {
    const id = title.normalize ? title.normalize() : title;
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