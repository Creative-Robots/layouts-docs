import { ComponentDoc } from "@/app/(app)/components/[name]/page";
import DocBreadcrums from "../Breadcrums";
import { PropsTab, Section, SubComponent, SubSection, Title } from "../ContentComponents";
import { CodeBlock } from "../ContentComponents/CodeBlock";
import { fixIndent } from "@/lib/indents";
import check from "check-types";

interface DocProps {
    data: ComponentDoc;
}

function cleanLayoutsCode(code: string): string {
    return fixIndent(code.split('\n').filter(l => check.nonEmptyString(l.trim())).join('\n'));
}

const SourcesUsage = ({sources}:{sources:string[]}) => {
    const sourcesList : JSX.Element[] = []
    
    sources.map((source, idx) => {
        if (sourcesList.length > 0) {
            sourcesList.push(
                <p className='text-xs font-body text-[#1E1F22]'>|</p>
            )
        }

        if (source == "Shadcn") {
            sourcesList.push(
                <img alt="authorImg" src="https://ui.shadcn.com/apple-touch-icon.png"  className='w-[12px]'/>
            )
        }
        sourcesList.push(
            <p className='text-xs font-body text-[#1E1F22]'>{source}</p>
        )
    })

    return (
        <>
            <p className='text-xs font-body text-[#1E1F22] '>Inspired by  : </p>
            {sourcesList}
        </>
    )
}

export default function LayoutComponentsDoc({data}:DocProps) {
    const {name, description, refImplementation, props, subComponents, examples, sources} = data;
    return (
        <div className='flex flex-col gap-3 pb-20 xl:px-44 lg:px-12 md:px-8 px-4 min-h-screen w-middle-box-0/2 md:w-middle-box-1/2 lg:w-middle-box-2/2 pt-[122px]'>
            <DocBreadcrums items={[name]} />
            <div className='flex flex-col gap-1'>
                <Title title={name} description={description}></Title>
                {/* <p className='text-lg text-[#5B5E66] font-normal'>{description}</p> */}
                {name && sources && sources.length !== 0 && <div className='flex flex-row gap-2 items-center  '>
                    <SourcesUsage sources={sources}/>
                </div>} 
            </div>
            {refImplementation
            ? <Section name="Ref Implementation">
                <CodeBlock code={cleanLayoutsCode(refImplementation)}/>
            </Section>
            : <></>}
            {props && props.length > 0 ? (
                <Section name="Props">
                    <PropsTab props={props} />
                </Section>
            ) : null}
            {examples && examples.length > 0 ? (
                <Section name="Examples">
                    {examples.map((e, idx) => {
                        if (!e.code) return null;
                        return (
                            <SubSection key={idx} name={e.title} /* description={description} */ level={2}>
                                <CodeBlock code={cleanLayoutsCode(e.code)}/>
                            </SubSection>
                        )
                    })}
                </Section>
            ) : null}
            {subComponents && subComponents.length > 0 ? (
                <Section name="API Reference">
                    {subComponents.map((c, idx) => {
                        return (
                            <SubComponent key={idx} level={2} data={c}></SubComponent>
                        )
                    })}
                </Section>
            ) : null}
            <div className="h-[64px] w-full flex justify-center items-center" >
                {/* <span className="text-xs" >
                    64px height
                </span> */}
            </div>
        </div>
    )
}