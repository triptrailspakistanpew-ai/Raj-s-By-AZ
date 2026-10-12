import React from "react"

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  fill?: boolean
  priority?: boolean
  sizes?: string
}

export default function Image({
  src,
  alt,
  fill,
  priority = false,
  sizes,
  className = "",
  style,
  ...props
}: ImageProps) {
  const fillStyles: React.CSSProperties = fill
    ? {
        position: "absolute",
        height: "100%",
        width: "100%",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        objectFit: "cover",
      }
    : {}

  return (
    <img
      src={src}
      alt={alt || "Gift Box Collection by Raj's By AZ"}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      sizes={sizes}
      className={className}
      style={{
        ...fillStyles,
        ...style,
      }}
      {...props}
    />
  )
}
