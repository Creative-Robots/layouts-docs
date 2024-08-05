'use client';
import { CodeBlock } from 'react-code-block';
import CopyClipboard from '../ClipBoard';
import { useCopyToClipboard } from 'react-use';
import { cn } from '@/lib/cn';
import { CodeBlockBox, CodeBlockCopyButton, CodeBlockCopyButtonWithHeader, CodeBlockHeaderTitle, CodeBlockLine, CodeBlockLineB, CodeBlockLineContent, CodeBlockLineNumber, CodeBlockLineToken } from '@/lib/Style';

interface MyCodeBlockProps {
    code: string;
    language: string;
    withTitleBar: boolean;
    title?:string;
}

function MyCodeBlock({ code, language, withTitleBar=false, title }:MyCodeBlockProps) {
    const [state, copyToClipboard] = useCopyToClipboard();
    const copyCode = () => {
        copyToClipboard(code);
    };
  return (
    <div className={CodeBlockBox}>
      <div className={cn(CodeBlockHeaderTitle, withTitleBar ? "" : "hidden")}>{title}</div>
      <button
          className={cn(CodeBlockCopyButton, withTitleBar ? CodeBlockCopyButtonWithHeader : "")}
          onClick={copyCode}
          >
          {state.value 
          ? 'copied !' 
          : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#808080" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>}
      </button>
      <CodeBlock code={code} language={language}>
        <CodeBlock.Code className={CodeBlockLine}>
          <div className={CodeBlockLineB}>
              <CodeBlock.LineNumber className={CodeBlockLineNumber} />
              <CodeBlock.LineContent className={CodeBlockLineContent}>
                <CodeBlock.Token className={CodeBlockLineToken} />
              </CodeBlock.LineContent>
          </div>
        </CodeBlock.Code>
      </CodeBlock>
    </div>
  );
}

export default MyCodeBlock;
