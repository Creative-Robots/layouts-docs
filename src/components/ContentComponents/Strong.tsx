import { cn } from "@/lib/cn"
import { strongClassName } from "@/lib/Style"

export const Strong = ({ className, children } : { className: string, children: any }) => {
    return (
        <strong className={cn(strongClassName, className)}>{children}</strong>
    );
};