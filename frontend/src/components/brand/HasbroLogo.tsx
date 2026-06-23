import { cn } from "@/lib/utils";

interface HasbroLogoProps {
  className?: string;
  showIndia?: boolean;
  variant?: "default" | "white";
  size?: "sm" | "md" | "lg";
}

const sizes = { sm: "h-6", md: "h-8", lg: "h-10" };

export function HasbroLogo({ className, showIndia = true, variant = "default", size = "md" }: HasbroLogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <svg
        viewBox="0 0 200 40"
        className={cn(sizes[size], "w-auto", variant === "default" ? "text-[#005EB8]" : "text-white")}
        aria-label="Hasbro"
        role="img"
      >
        <text x="0" y="32" fontFamily="Arial Black, Arial, sans-serif" fontSize="34" fontWeight="900" fill="currentColor" letterSpacing="-0.5">
          HASBRO
        </text>
      </svg>
      {showIndia && (
        <span
          className={cn(
            "text-sm font-bold tracking-wide uppercase",
            variant === "white" ? "text-white/90" : "text-[#0098DB]"
          )}
        >
          India
        </span>
      )}
    </div>
  );
}
