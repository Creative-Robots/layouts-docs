import { cn } from "@/lib/cn";
import { componentsProps } from "@/lib/componentTypes";
import { useRepContext } from "@/lib/RepContext";
import { ReactNode, useEffect } from "react";
import Separator from "../Separator";
import { ComponentDoc, RadixPropDocumentation } from "@/app/components/[name]/page";
import MyCodeBlock from "../CodeBlock";

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

export const H2 = ({text}:{text:string}) => {
  const {setRep} = useRepContext();
  const id = text.normalize();
  useEffect(() => {
      setRep((l) => {
        if (l.filter(e => e.id == id).length > 0) return [...l];
        return [...l, {name: text, id: id, level: 2}];
      })
    }, [setRep])
  return (
      <div className='flex flex-col mt-4' id={id}>
          <h2 className='text-lg font-medium'>{text}</h2>
      </div>
  )
}

export const H3 = ({text}:{text:string}) => {
  const {setRep} = useRepContext();
  const id = text.normalize();
  useEffect(() => {
      setRep((l) => {
        if (l.filter(e => e.id == id).length > 0) return [...l];
        return [...l, {name: text, id: id, level: 3}];
      })
    }, [setRep])
  return (
      <div className='flex flex-col gap-2 mt-8 pl-3' id={id}>
          <h3 className='text-base text-gray-800 font-medium mb-4'>{text}</h3>
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

interface SectionProps extends componentsProps {
  name: string;
}

export const Section = ({children, className, name}: SectionProps) => {
  return (
    <section className={cn("flex flex-col gap-4", className)}>
      <H1 text={name}></H1>
      {children}
    </section>
  )
}

interface subSectionProps extends SectionProps {
  level: number;
  tag?: string;
}

export const SubSection = ({children, className, name, level}: subSectionProps) => {
  return (
    <section className={cn("flex flex-col", className)}>
      {level === 2 
      ? 
      <H2 text={name}></H2>
      : level === 3
      ?
      <H3 text={name}></H3>
      :
      <h4 className={cn("pl-" + (level - 3) * 2)}>{name}</h4>
    }
      {children}
    </section>
  )
}

interface ProspTabProps {
  props: Partial<RadixPropDocumentation>[] | null[];
}

const withToolTip = (tip:string, name:string) => {
  return (
    <span className="group relative flex flex-row items-center gap-2 cursor-help"><span className="truncate">{name}</span><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg></span><div className="hidden group-hover:block absolute bottom-full mb-2 p-2 text-nowrap text-center left-1/2 transform -translate-x-1/2 shadow-lg drop-shadow-sm shadow-gray-200 w-fit max-w-80 h-fit bg-white border border-gray-200 text-black rounded-md">{tip}</div></span>
  )
}

function addNewlineAfterPeriod(input:string) {
  const newDesc =  input.replace(".", '.\n');
  return newDesc;
}

const withDescription = (desc:string, name:string|undefined) => {
  return (
    <div className="group relative flex flex-row items-center gap-2 cursor-help col-span-3"><span className="text-sm text-[#373114] bg-gray-200 px-2 py-1 rounded-lg w-fit truncate">{name}</span><div className="hidden group-hover:block absolute bottom-full col-span-6 mb-2 p-2 text-sm transform md:-translate-x-1/2 md:left-1/2 shadow-lg drop-shadow-sm shadow-gray-200 w-80 text-left h-fit bg-white border border-gray-200 text-black rounded-md">{addNewlineAfterPeriod(desc)}</div></div>
  )
}

function trueType(aType:string) {
  if (aType.includes('|')) {
    return withToolTip(aType, "enum");
  } else if (aType.includes('=>')) {
    return withToolTip(aType, "function");
  } else return aType;
}


export const PropsTab = ({props}:ProspTabProps) => {

  return( <>
    <div className='flex flex-col gap-2 px-4 w-full'>
      <div className='grid grid-cols-11 gap-2'>
        <p className='text-base text-[#5B5E66] font-semibold col-span-3'>Prop</p>
        <p className='text-base text-[#5B5E66] font-semibold col-span-3'>Type</p>
        <p className='text-base text-[#5B5E66] font-semibold w-fit col-span-3'>Default</p>
        <p className='text-base text-[#5B5E66] font-semibold text-center col-span-2'>isRequired</p>
      </div>
    </div> 
    <div className='w-full h-fit'>
      <Separator/>
      {props.map((attribute, idx) => {
          if (attribute === null) return null;
          const bg = idx % 2 === props.length % 2 ? "bg-[#fcfcfc]" : "bg-[#fafafa]";
          return (
              <div className={cn('flex flex-col gap-4 min-h-8 justify-center px-4 border-b py-3', bg)} key={attribute.name + 'attribute' + idx}>
              <div className='grid grid-cols-11 gap-2 items-center'>
                  {attribute.description
                  ? withDescription(attribute.description, attribute.name)
                  : <div className="text-sm text-[#373114] bg-gray-200 px-2 py-1 rounded-lg w-fit col-span-3 truncate">{attribute.name}</div>}
                  {attribute.type ? (
                      <>
                      <div className='flex flex-col items-start col-span-3'>
                        <>
                          <div className='flex flex-col justify-normal items-start'>
                            <div className="text-sm text-[#5B5E66]">{trueType(attribute.type)}</div>
                          </div>
                        </>
                      </div>
                      <div className='flex flex-col justify-normal items-start col-span-3'>
                        <div className='flex flex-col justify-normal items-start'>
                          <p className="text-sm text-[#5B5E66] truncate">{attribute.default}</p>
                        </div>
                      </div>
                  </>
                  ) : (
                    <>
                      <span key="span1"></span>
                      <span key="span2"></span>
                  </>
                  )}
                  <p className="text-sm text-[#1E1F22] text-center col-span-2">{attribute.required === true ? "✅" : "❌"}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  )
}

export const SubComponent = ({data, level}:{data:ComponentDoc, level:number}) => {
  const { name, tag, props, description, refImplementation, examples } = data;
  return (
    <SubSection name={name} level={level}>
      {description ? <p className='text-base text-[#5B5E66] font-normal'>{description}</p> : null}
      {refImplementation
      ? <SubSection name="Ref Implementation" level={level + 1}>
          <MyCodeBlock code={refImplementation} withTitleBar={false} language="jsx"></MyCodeBlock>
        </SubSection>
      : <></>}
      {props && props.length > 0 ? (
        <SubSection name={name + " Props"} level={level + 1}>
          <PropsTab props={props} />
        </SubSection>
      ) : null}
      {examples && examples.length > 0 ? (
        <SubSection name={name + " Exemples"} level={level + 1}>
            {examples.map((e, idx) => {
                if (!e.code) return null;
                return (
                    <SubSection key={idx} name={e.title} level={level + 2}>
                        <p className='text-base text-[#5B5E66] font-normal'>{description}</p>
                        <MyCodeBlock code={e.code} language="jsx" withTitleBar={false} title={e.title}></MyCodeBlock>
                    </SubSection>
                )
            })}
        </SubSection>
    ) : null}
    </SubSection>
  )
}