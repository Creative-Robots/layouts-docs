import { componentsProps } from '@/lib/componentTypes';
import React from 'react'

interface IconProps extends componentsProps {
    src: string; 
}

const Icon = ({src, ...props}:IconProps) => {
    return (
        <img src={src} {...props}></img>
    )
}

export default Icon;