import { cn } from "@/lib/cn";
import { PropsLine1_2, PropsLine2_2, VariantsCol, VariantsColTitle, VariantsColTitleText, VariantsHeader, VariantsHeaderBox, VariantsHeaderTitle, VariantsLine, VariantsLineBox, VariantsName, VariantsSecondHeaderTitle,  } from "@/lib/Style";
import Separator from "../Separator";
import { RadixPropDocumentation } from "@/app/(app)/components/[name]/page";

interface ProspTabProps {
  props: Partial<RadixPropDocumentation>[] | null[];
}

export const VariantsTab = ({props}:ProspTabProps) => {

  return( 
  <div className="max-w-full overflow-x-scroll overflow-y-visible">
    <div className={VariantsHeaderBox}>
      <div className={VariantsHeader}>
        <p className={VariantsHeaderTitle}>Variant</p>
        <p className={VariantsSecondHeaderTitle}>Description</p>
      </div>
    </div> 
    <div className='w-full h-fit min-w-[300px] overflow-y-visible'>
      <Separator/>
      {props.map((attribute, idx) => {
          const tooDown = props.length - idx <= 2;
          if (attribute === null) return null;
          const bg = idx % 2 === props.length % 2 ? PropsLine1_2 : PropsLine2_2;
          return (
            <div className={cn(VariantsLineBox, bg)} key={attribute.name + 'attribute' + idx}>
              <div className={VariantsLine}>
                  <div className={cn(VariantsName)}>{attribute.name}</div>
                  <div className={cn(VariantsCol, "")}>
                    <div className={VariantsColTitle}>
                      <div className={VariantsColTitleText}>{attribute.description}</div>
                    </div>
                  </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}