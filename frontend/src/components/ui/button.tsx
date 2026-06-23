"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#005EB8] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-[#005EB8] text-white shadow-md hover:bg-[#003C69] hover:-translate-y-0.5",
        secondary: "bg-[#1A1A1A] text-white hover:bg-gray-800 hover:-translate-y-0.5",
        outline: "border-2 border-[#005EB8] text-[#005EB8] bg-white hover:bg-[#005EB8] hover:text-white",
        ghost: "text-[#1A1A1A] hover:bg-gray-100",
        accent: "bg-[#ED8B00] text-[#1A1A1A] shadow-md hover:bg-[#d47d00] hover:-translate-y-0.5",
        "on-dark": "bg-white text-[#005EB8] shadow-md hover:bg-[#ED8B00] hover:text-[#1A1A1A] hover:-translate-y-0.5",
        "on-dark-outline": "border-2 border-white text-white bg-transparent hover:bg-white hover:text-[#005EB8]",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
