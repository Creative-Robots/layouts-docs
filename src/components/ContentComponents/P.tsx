import { cn } from "@/lib/cn"
import { paragraphClassName } from "@/lib/Style"

export const P = ({ className, children } : { className: string, children: any }) => {
    return (
        <p className={cn(paragraphClassName, className)}>{children}</p>
    );
};