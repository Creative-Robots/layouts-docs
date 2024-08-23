import { ComponentDoc } from "@/app/(app)/components/[name]/page";
import { SubSection } from "./SubSection";
import { CodeBlock } from "./CodeBlock";
import { cn } from "@/lib/cn";
import { _H3, _H4, _SubSection, H3Box } from "@/lib/Style";
import { PropsTab } from "./PropsTab";
import { H3 } from "./H3";

export const SubComponent = ({data, level}:{data:ComponentDoc, level:number}) => {
    const { name, tag, props, description, refImplementation, examples } = data;
    return (
      <SubSection name={'/' + tag} level={level}>
        {/* {description ? <p className={Description}>{description}</p> : null} */}
        {refImplementation
        ? <SubSection name="Ref Implementation" level={level + 1}>
            {/* <MyCodeBlock code={refImplementation} withTitleBar={false} language="jsx"></MyCodeBlock> */}
            <CodeBlock code={refImplementation}></CodeBlock>
          </SubSection>
        : <></>}
        {props && props.length > 0 ? (
          <section className={cn(_SubSection)}>
            <div className={H3Box}>
              <h4 className={_H4} >Component props</h4>
            </div>
            <PropsTab props={props} />
          </section>
        ) : null}
        {examples && examples.length > 0 ? (
          <SubSection name={name + " Examples"} level={level + 1}>
              {examples.map((e, idx) => {
                  if (!e.code) return null;
                  return (
                      <SubSection key={idx} name={e.title} level={level + 2}>
                          {/* <p className={Description}>{description}</p> */}
                          {/* <MyCodeBlock code={e.code} language="jsx" withTitleBar={false} title={e.title}></MyCodeBlock> */}
                          <CodeBlock code={e.code}></CodeBlock>
                      </SubSection>
                  )
              })}
          </SubSection>
      ) : null}
      </SubSection>
    )
  }