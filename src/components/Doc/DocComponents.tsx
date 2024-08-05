import { cn } from "@/lib/cn";
import { componentsProps } from "@/lib/componentTypes";
import { useRepContext } from "@/lib/RepContext";
import { ReactNode, useEffect } from "react";
import Separator from "../Separator";
import { ComponentDoc, RadixPropDocumentation } from "@/app/components/[name]/page";
import MyCodeBlock from "../CodeBlock";
import { capitalizeFirstLetter } from "@/lib/utils";
import { _H1, _H2, _H3, _Section, _SubSection, _Title, Description, DivWithDescription, DivWithToolTip, H1Box, H2Box, H3Box, isRequiredTitle, PropsCol, PropsColTitle, PropsColTitleText, PropsHeader, PropsHeaderBox, PropsHeaderTitle, PropsLine, PropsLine1_2, PropsLine2_2, PropsLineBox, PropsName, PropsNameWithDesc, requiredCol } from "@/lib/Style";

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
        <div className={cn(H1Box)} id={id}>
            <h1 className={cn(_H1)}>{text}</h1>
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
      <div className={cn(H2Box)} id={id}>
          <h2 className={cn(_H2)}>{text}</h2>
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
      <div className={cn(H3Box)} id={id}>
          <h3 className={cn(_H3)}>{text}</h3>
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
        <h1 className={cn(_Title)} id={id}>{text}</h1>
    )
}

interface SectionProps extends componentsProps {
  name: string;
}

export const Section = ({children, className, name}: SectionProps) => {
  return (
    <section className={cn(_Section, className)}>
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
    <section className={cn(_SubSection, className)}>
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
    <span className={cn(DivWithToolTip)}><span className="truncate">{name}</span><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg></span><div className="hidden group-hover:block absolute bottom-full mb-2 p-2 text-nowrap text-center left-1/2 transform -translate-x-1/2 shadow-lg drop-shadow-sm shadow-gray-200 w-fit max-w-80 h-fit bg-white border border-gray-200 text-black rounded-md">{tip}</div></span>
  )
}

function addNewlineAfterPeriod(input:string) {
  const newDesc = input.replace(".", '.\n');
  return newDesc;
}

const withDescription = (desc:string, name:string|undefined) => {
  return (
    <div className={cn(DivWithDescription)}><span className={cn(PropsNameWithDesc)}>{name}</span><div className="hidden group-hover:block absolute bottom-full col-span-6 mb-2 p-2 text-sm transform md:-translate-x-1/2 md:left-1/2 shadow-lg drop-shadow-sm shadow-gray-200 w-80 text-left h-fit bg-white border border-gray-200 text-black rounded-md">{addNewlineAfterPeriod(desc)}</div></div>
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
    <div className={cn(PropsHeaderBox)}>
      <div className={cn(PropsHeader)}>
        <p className={cn(PropsHeaderTitle)}>Prop</p>
        <p className={cn(PropsHeaderTitle)}>Type</p>
        <p className={cn(PropsHeaderTitle)}>Default</p>
        <p className={cn(PropsHeaderTitle, isRequiredTitle)}>isRequired</p>
      </div>
    </div> 
    <div className='w-full h-fit'>
      <Separator/>
      {props.map((attribute, idx) => {
          if (attribute === null) return null;
          const bg = idx % 2 === props.length % 2 ? PropsLine1_2 : PropsLine2_2;
          return (
            <div className={cn(PropsLineBox, bg)} key={attribute.name + 'attribute' + idx}>
              <div className={cn(PropsLine)}>
                  {attribute.description
                  ? withDescription(attribute.description, attribute.name)
                  : <div className={cn(PropsName)}>{attribute.name}</div>}
                  {attribute.type ? (
                      <>
                      <div className={cn(PropsCol)}>
                          <div className={PropsColTitle}>
                            <div className={PropsColTitleText}>{trueType(attribute.type)}</div>
                          </div>
                      </div>
                      <div className={cn(PropsCol)}>
                        <div className={PropsColTitle}>
                          <p className={cn(PropsColTitleText, "truncate")}>{attribute.default}</p>
                        </div>
                      </div>
                  </>
                  ) : (
                    <>
                      <span key="span1"></span>
                      <span key="span2"></span>
                  </>
                  )}
                  <p className={cn(requiredCol)}>{attribute.required === true ? "✅" : "❌"}</p>
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
    <SubSection name={'/' + tag} level={level}>
      {description ? <p className={Description}>{description}</p> : null}
      {refImplementation
      ? <SubSection name="Ref Implementation" level={level + 1}>
          <MyCodeBlock code={refImplementation} withTitleBar={false} language="jsx"></MyCodeBlock>
        </SubSection>
      : <></>}
      {props && props.length > 0 ? (
        <section className={cn(_SubSection)}>
          <div className={H3Box}>
            <h3 className={_H3}>/{tag} Props</h3>
          </div>
          <PropsTab props={props} />
        </section>
      ) : null}
      {examples && examples.length > 0 ? (
        <SubSection name={name + " Exemples"} level={level + 1}>
            {examples.map((e, idx) => {
                if (!e.code) return null;
                return (
                    <SubSection key={idx} name={e.title} level={level + 2}>
                        <p className={Description}>{description}</p>
                        <MyCodeBlock code={e.code} language="jsx" withTitleBar={false} title={e.title}></MyCodeBlock>
                    </SubSection>
                )
            })}
        </SubSection>
    ) : null}
    </SubSection>
  )
}