'use client'

import { cn } from '@/lib/cn';
import { componentsProps } from '@/lib/componentTypes';
import React, { useEffect, useRef, useState } from 'react';
import HtmlComponentDoc from './Html';
import { ComponentDoc } from '@/app/(app)/components/[name]/page';
import LayoutComponentsDoc from './Layout';
import Entries from '../ContentComponents/Entry';

export type DocType = {
    tag:string;
    title: string;
    shortDescriptionOfTheTag: string;
    allowedAttributes: attributeType[];
    canHaveChildren: boolean;
    usageExamples: {
        title: string;
        description: string;
        code: string;
        layoutsCode: string;
    }[];
}

export type LayoutDocType = {
    data: ComponentDoc;
}

type attributeType = {
    name: string;
    isRequired: boolean;
    acceptedValueTypes:
    {
        type: string;
        options?: string[];
    }[];
};

// -------------------------------------

interface DocProps {
    entries: {
        entry: string;
        level: number;
    }[];
    htmldata: DocType|null;
    layoutData: ComponentDoc|null;
    isLayouts: boolean;
}

const Doc = ({htmldata, isLayouts, layoutData, entries}:DocProps) => {

    useEffect(() => {
        function sendClickEventToParent() {
          window.parent.postMessage(
            { type: 'CLICK_EVENT', message: 'A click has been detected inside Doc Iframe' },
            '*'
          );
        }
    
        window.addEventListener('click', sendClickEventToParent);
    
        return () => {
          window.removeEventListener('click', sendClickEventToParent);
        }
      }, []);    

    return (
        <> 

        {isLayouts
        ? layoutData ? <LayoutComponentsDoc data={layoutData}></LayoutComponentsDoc> : null
        : htmldata ? <HtmlComponentDoc data={htmldata}></HtmlComponentDoc> : null}
        
        <Entries entries={entries} />
    </>)
}

export default Doc;