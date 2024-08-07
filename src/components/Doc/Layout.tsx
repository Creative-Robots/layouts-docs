import { ComponentDoc } from "@/app/components/[name]/page";
import DocBreadcrums from "../Breadcrums";
import { PropsTab, Section, SubComponent, SubSection, Title } from "../ContentComponents";
import { CodeBlock } from "../ContentComponents/CodeBlock";

interface DocProps {
    data: ComponentDoc;
}

export default function LayoutComponentsDoc({data}:DocProps) {
    const {name, description, refImplementation, props, subComponents, examples} = data;
    return (
        <div className='flex flex-col gap-3 pb-20 px-10 min-h-screen flex-1 pt-[122px]'>
            <DocBreadcrums items={[name]} />
            <div className='flex flex-col gap-1'>
                <Title title={name} description={description}></Title>
                {/* <p className='text-lg text-[#5B5E66] font-normal'>{description}</p> */}
                {name && <div className='flex flex-row gap-2 items-center  '>
                    <p className='text-xs font-body text-[#1E1F22] '>Inspired by  : </p>
                    <img alt="authorImg" src="https://ui.shadcn.com/apple-touch-icon.png"  className='w-[12px]'/>
                    <p className=' text-xs font-body text-[#1E1F22]'>shadcn UI</p>
                </div>} 
            </div>
            {refImplementation
            ? <Section name="Ref Implementation">
                <CodeBlock code={refImplementation}/>
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
                            <SubSection key={idx} name={e.title} description={description} level={2}>
                                <CodeBlock code={e.code}/>
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