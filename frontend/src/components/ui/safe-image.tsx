"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const PLACEHOLDER = "/placeholder-product.svg";

interface SafeImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

export function SafeImage({
  src,
  alt,
  fill,
  width,
  height,
  className,
  sizes,
  priority,
}: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [failed, setFailed] = useState(false);

  const handleError = () => {
    if (!failed) {
      setFailed(true);
      setImgSrc(PLACEHOLDER);
    }
  };

  if (fill) {
    return (
      <Image
        src={imgSrc}
        alt={alt}
        fill
        className={cn(className, failed && "object-contain p-8 opacity-60")}
        sizes={sizes}
        priority={priority}
        onError={handleError}
      />
    );
  }

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={cn(className, failed && "object-contain p-4 opacity-60")}
      priority={priority}
      onError={handleError}
    />
  );
}
