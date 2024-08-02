import { ComponentDoc } from "@/app/components/[name]/page";
import DocBreadcrums from "../Breadcrums";
import { PropsTab, Section, SubComponent, SubSection, Title } from "./DocComponents";
import MyCodeBlock from "../CodeBlock";

interface DocProps {
    data: ComponentDoc;
}

export default function LayoutComponentsDoc({data}:DocProps) {
    const {name, description, refImplementation, props, subComponents, examples} = data;
    return (
        <div className='flex flex-col gap-3 pb-20 lg:px-12 md:px-10 sm:px-8 px-5 min-h-screen max-w-[1200px] flex-1 pt-[122px] lg:mx-auto'>
            <DocBreadcrums items={[name]} />
            <div className='flex flex-col gap-4'>
                <Title text={name}></Title>
                <p className='text-lg text-[#5B5E66] font-normal'>{description}</p>
                {name && <div className='flex flex-row gap-2 items-center  '>
                    <p className='text-[#1E1F22] text-sm font-normal '>Source : </p>
                    <img alt="authorImg" src="https://ui.shadcn.com/apple-touch-icon.png"  className='w-[18px]'/>
                    <p className=' text-xs font-bold text-[#1E1F22]'>inspired by ShadCn</p>
                </div>} 
            </div>
            {refImplementation
            ? <Section name="Ref Implementation">
                <MyCodeBlock code={refImplementation} withTitleBar={false} language="jsx"></MyCodeBlock>
            </Section>
            : <></>}
            {props && props.length > 0 ? (
                <Section name="Props">
                    <PropsTab props={props} />
                </Section>
            ) : null}
            {examples && examples.length > 0 ? (
                <Section name="Exemples">
                    {examples.map((e, idx) => {
                        if (!e.code) return null;
                        return (
                            <SubSection name={e.title} level={2}>
                                <p className='text-base text-[#5B5E66] font-normal'>{description}</p>
                                <MyCodeBlock code={e.code} language="jsx" withTitleBar title={e.title}></MyCodeBlock>
                            </SubSection>
                        )
                    })}
                </Section>
            ) : null}
            {subComponents && subComponents.length > 0 ? (
                <Section name="Api Reference">
                    {subComponents.map((c, idx) => {

                        return (
                            <SubComponent level={2} data={c}></SubComponent>
                        )
                    })}
                </Section>
            ) : null}
            <div className="w-full h-10"></div>
        </div>
    )
}