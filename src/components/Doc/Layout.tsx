import { ComponentDoc } from "@/app/(app)/components/[name]/page";
import DocBreadcrums from "../Breadcrums";
import { PropsTab, Section, SubComponent, SubSection, Title } from "../ContentComponents";
import { CodeBlock } from "../ContentComponents/CodeBlock";
import { fixIndent } from "@/lib/indents";
import check from "check-types";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/cn";
import { VariantsTab } from "../ContentComponents/VariantsTab";

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
                <img alt="Shadcn Website Logo" src="https://ui.shadcn.com/apple-touch-icon.png"  className='w-[12px]'/>
            )
        } else if (source == "Radix") {
            sourcesList.push(
                <img alt="Radix Website Logo" src="https://www.radix-ui.com/favicon.png"  className='w-[12px]'/>
            )
        } else if (source == "Cmdk") {
            sourcesList.push(
                <img alt="Cmdk Website Logo" src="https://cmdk.paco.me/favicon.svg"  className='w-[12px]'/>
            )
        } else if (source == "EmblaCarousel") {
            sourcesList.push(
                <img alt="EmblaCarousel Website Logo" src="https://www.embla-carousel.com/favicon.svg?v=438bb8af91f59256d3cb36c30e91b51e"  className='w-[12px]'/>
            )
        } else if (source == "ReactDayPicker") {
            sourcesList.push(
                <img alt="ReactDayPicker Website Logo" src="https://daypicker.dev/img/favicon.ico"  className='w-[12px]'/>
            )
        } else if (source == "Vaul") {
            sourcesList.push(
                <img alt="Vaul Website Logo" src="https://vaul.emilkowal.ski/favicon.ico"  className='w-[12px]'/>
            )
        } else if (source == "ReactResizablePanels") {
            sourcesList.push(
                <img alt="ReactResizablePanels Website Logo" src="https://user-images.githubusercontent.com/29597/210075327-faeb4ca8-31df-4dc8-a649-01d0ee3cd315.png"  className='w-[24px] clip-path-[inset(0_50%_0_0)]'/>
            )
        }
        sourcesList.push(
            <p className='text-xs font-body text-[#1E1F22]'>{source}</p>
        )
    })

    return (
        <>
            <p className='text-xs font-body text-[#1E1F22] '>Uses  : </p>
            {sourcesList}
        </>
    )
}

export default function LayoutComponentsDoc({data}:DocProps) {
    const {name, description, refImplementation, props, subComponents, examples, sources, variants} = data;

    const searchParams = useSearchParams();
    const type = searchParams.get("type");
    
    return (
        <div className={cn('flex flex-col gap-3 pb-20 xl:px-44 lg:px-12 md:px-8 px-4 min-h-screen w-middle-box-0/2 md:w-middle-box-1/2 lg:w-middle-box-2/2', type === "editor" ? "pt-[77px]" : "pt-[122px]")}>
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
            {variants && variants.length > 0 ? (
                <Section name="Variants">
                    <VariantsTab props={variants} />
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
            </div>1
        </div>
    )
}