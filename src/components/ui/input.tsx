import { cn } from "@/lib/cn";
import React, { ChangeEvent, useCallback } from "react";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  onChange?: (value: string, event: ChangeEvent<HTMLInputElement>) => void;
  placeHolder: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ value, className, type, onChange, placeHolder, ...props }, ref) => {
    const onChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e.target.value, e);
      }
    }, [onChange]);

    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-4 py-2 text-[13px] ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-textcolor-secondary outline-absolute-positive focus:outline-hover disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        onChange={onChangeHandler}
        value={value === null ? undefined : value}
        {...props}
      />
    )
  }
);
Input.displayName = "Input";

export { Input };
