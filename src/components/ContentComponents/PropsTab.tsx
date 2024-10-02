import { cn } from "@/lib/cn";
import { DivWithDescription, DivWithToolTip, isRequiredTitle, PropsCol, PropsColTitle, PropsColTitleText, PropsHeader, PropsHeaderBox, PropsHeaderTitle, PropsLine, PropsLine1_2, PropsLine2_2, PropsLineBox, PropsName, PropsNameWithDesc, requiredCol } from "@/lib/Style";
import Separator from "../Separator";
import { RadixPropDocumentation } from "@/app/(app)/components/[name]/page";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ShadCn/Hover-Card";


interface ProspTabProps {
    props: Partial<RadixPropDocumentation>[] | null[];
  }
  
  const withToolTip = (tip:string, name:string, outline:boolean = false, required:boolean|undefined=false, tooDown:boolean=false) => {
    return (
      <span className={cn(DivWithToolTip)}>
        <span className={cn("truncate" , outline ? "bg-gray-100 p-2 rounded-lg text-[#5b5e66]" : "")}>{name}<span className={cn(required === false ? "sm:hidden opacity-65" : "hidden")}>?</span></span>
        <HoverCard closeDelay={10} openDelay={5} >
	          <div className="hover-card" >
	                <HoverCardTrigger asChild className="relative" >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                  </HoverCardTrigger>
	                <HoverCardContent avoidCollisions className=" px-0 py-0 p-2.5 w-fit" collisionPadding={20} side="bottom" >
	                    <span className="text-sm" >
                          {addNewlineAfterPeriod(tip)}
	                    </span>
	                </HoverCardContent>
	          </div>
	      </HoverCard>
      </span>
    )
  }
  
  function addNewlineAfterPeriod(input:string) {
    const newDesc = input.replace(".", '.\n');
    return newDesc;
  }
  
  export const withDescription = (desc:string, name:string|undefined, required:boolean|undefined=false, tooDown:boolean) => {
    if (desc.length < 50) {
        return (
            <div className={cn(PropsCol)}>
                <div className={PropsColTitle}>
                    <div className={PropsColTitleText}>{withToolTip(desc, name ? name : "", true, required, tooDown)}</div>
                </div>
            </div>
        )
    }
    return (
        <div className={cn(DivWithDescription, "justify-start flex flex-row gap-1 items-center max-w-full")} >
            <div className="flex p-2 rounded-lg bg-gray-100 truncate flex-1 max-w-fit" >
                <p className="text-[#5b5e66] text-xs truncate" >
                    {name}<span className={cn(required === false ? "sm:hidden opacity-65" : "hidden")}>?</span>
                </p>
            </div>
            <HoverCard closeDelay={10} openDelay={5} >
	            <div className="hover-card" >
	                <HoverCardTrigger asChild className="relative" >
                    <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg></span>
	                </HoverCardTrigger>
	                <HoverCardContent avoidCollisions className=" px-0 py-0 p-2.5" collisionPadding={20} side="bottom" >
	                    <span className="text-sm" >
                          {addNewlineAfterPeriod(desc)}
	                    </span>
	                </HoverCardContent>
	            </div>
	        </HoverCard>
        </div>
    //   <div className={cn(DivWithDescription)}><span className={cn(PropsNameWithDesc)}>{name}</span></div>
    )
  }
  
  function trueType(aType:string) {
    if (aType.includes('=>')) {
      return withToolTip(aType, "function", false , true, false);
    } else if (aType.includes('|')) {
      return withToolTip(aType, "enum", false, true, false);
    } else return aType;
  }
  
  
  export const PropsTab = ({props}:ProspTabProps) => {
  
    return( 
    <div className="max-w-full overflow-x-scroll overflow-y-visible">
      <div className={cn(PropsHeaderBox)}>
        <div className={cn(PropsHeader)}>
          <p className={cn(PropsHeaderTitle)}>Prop</p>
          <p className={cn(PropsHeaderTitle)}>Type</p>
          <p className={cn(PropsHeaderTitle, "hidden sm:block")}>Default</p>
          <p className={cn(PropsHeaderTitle, isRequiredTitle, "hidden sm:block")}>isRequired</p>
        </div>
      </div> 
      <div className='w-full h-fit min-w-[300px] overflow-y-visible'>
        <Separator/>
        {props.map((attribute, idx) => {
            const tooDown = props.length - idx <= 2;
            if (attribute === null) return null;
            const bg = idx % 2 === props.length % 2 ? PropsLine1_2 : PropsLine2_2;
            return (
              <div className={cn(PropsLineBox, bg)} key={attribute.name + 'attribute' + idx}>
                <div className={cn(PropsLine)}>
                    {attribute.description
                    ? withDescription(attribute.description, attribute.name, attribute.required, tooDown)
                    : <div className={cn(PropsName)}>{attribute.name}<span className={cn(attribute.required === false ? "sm:hidden opacity-65" : "hidden")}>?</span></div>}
                    {attribute.type ? (
                        <>
                        <div className={cn(PropsCol, "")}>
                            <div className={PropsColTitle}>
                              <div className={PropsColTitleText}>{trueType(attribute.type)}</div>
                            </div>
                        </div>
                        <div className={cn(PropsCol, "hidden sm:block")}>
                          <div className={PropsColTitle}>
                            <p className={cn(PropsColTitleText, "truncate")}>{attribute.default}</p>
                          </div>
                        </div>
                    </>
                    ) : (
                      <>
                        <span key="span1"></span>
                        <span key="span2" className="hidden sm:block"></span>
                    </>
                    )}
                    <p className={cn(requiredCol, "hidden sm:block")}>{attribute.required === true ? "✅" : "❌"}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    )
  }