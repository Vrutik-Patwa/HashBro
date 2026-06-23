"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const PLACEHOLDER = "/placeholder-product.svg";

function resolveSrc(src: string | undefined): string {
  if (!src) return PLACEHOLDER;
  if (src.startsWith("http://") || src.startsWith("https://")) return PLACEHOLDER;
  return src.startsWith("/") ? src : `/${src}`;
}

interface SafeImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

export function SafeImage({
  src,
  alt,
  fill,
  width,
  height,
  className,
  priority,
}: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState(() => resolveSrc(src));

  useEffect(() => {
    setImgSrc(resolveSrc(src));
  }, [src]);

  const handleError = () => {
    if (imgSrc !== PLACEHOLDER) setImgSrc(PLACEHOLDER);
  };

  if (fill) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={imgSrc}
        alt={alt}
        onError={handleError}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={cn("absolute inset-0 h-full w-full", className)}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      onError={handleError}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={className}
    />
  );
}
