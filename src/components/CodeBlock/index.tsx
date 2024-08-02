'use client';
import { CodeBlock } from 'react-code-block';
import CopyClipboard from '../ClipBoard';
import { useCopyToClipboard } from 'react-use';
import { cn } from '@/lib/cn';

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
    <div className='h-fit w-full max-w-full bg-gray-900 rounded-lg my-4 shadow-lg py-2 relative flex flex-col overflow-hidden'>
      <div className={cn("h-8 max-w-full w-full text-base border-b border-gray-600 mb-2 ml-2 text-white", withTitleBar ? "" : "hidden")}>{title}</div>
      <button
          className={cn("hover:bg-gray-700 text-white rounded-md p-2 absolute  right-2 text-sm font-semibold", withTitleBar ? "top-1" : "top-0.5")}
          onClick={copyCode}
          >
          {state.value 
          ? 'copied !' 
          : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#808080" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>}
      </button>
      <CodeBlock code={code} language={language}>
        <CodeBlock.Code className="flex-1 mx-2 overflow-x-scroll relative max-w-ful">
          <div className="table-row relative max-w-full overflow-x-scroll">
              <CodeBlock.LineNumber className="table-cell pr-4 text-sm text-gray-500 text-right select-none" />
              <CodeBlock.LineContent className="table-cell text-wrap text-sm max-w-full overflow-x-scroll">
                  <CodeBlock.Token className='max-w-full' />
              </CodeBlock.LineContent>
          </div>
        </CodeBlock.Code>
      </CodeBlock>
    </div>
  );
}

export default MyCodeBlock;
