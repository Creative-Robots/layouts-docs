import { cn } from "@/lib/cn";
import { componentsProps } from "@/lib/componentTypes";
import { _Section } from "@/lib/Style";
import { Heading1 } from ".";



export interface SectionProps extends componentsProps {
    name: string;
    description?:string;
}
  
export const Section = ({children, className, name, description}: SectionProps) => {
    return (
      <section className={cn(_Section, className)}>
        <Heading1 title={name} description={description}></Heading1>
        {children}
      </section>
    )
}