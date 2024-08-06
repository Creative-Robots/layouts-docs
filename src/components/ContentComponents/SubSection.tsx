import { _SubSection } from "@/lib/Style";
import { SectionProps } from "./Section";
import { cn } from "@/lib/cn";
import { H3, Heading2, SubHeading } from '.';


interface subSectionProps extends SectionProps {
    level: number;
    tag?: string;
}
  
  export const SubSection = ({children, className, name, level, description}: subSectionProps) => {
    return (
      <section className={cn(_SubSection, className)}>
        {level === 2 
            ? 
            <Heading2 title={name} description={description}></Heading2>
            : level === 3
            ?
            <SubHeading title={name} description={description}></SubHeading>
            :
            <H3 title={name} description={description}></H3>
        }
        {children}
      </section>
    )
  }