import { cn } from '@/lib/cn';
import { componentsProps } from '@/lib/componentTypes';
import React from 'react';

interface badgeProps extends componentsProps {
}

const Badge = ({children, className}:badgeProps) => {
    return (
        <div className={cn("bg-background-2 px-3 py-1 rounded-full text-sm", className)}>
            {children}
        </div>
    )
}

export default Badge;