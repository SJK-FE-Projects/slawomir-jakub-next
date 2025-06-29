import Image from "next/image";
import React from "react";

type MediaElementProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
  priority?: boolean;
  className?: string;
};

export default function MediaElement({
  src,
  alt,
  width = 800,
  height = 600,
  style,
  priority = false,
  className = "",
}: MediaElementProps) {
  // Determine media type from file extension
  const getMediaType = (src: string): "image" | "video" => {
    const extension = src.split(".").pop()?.toLowerCase();
    return ["mp4", "webm", "ogg", "mov"].includes(extension || "")
      ? "video"
      : "image";
  };

  const mediaType = getMediaType(src);

  const defaultStyle = {
    width: "100%",
    height: "auto",
    objectFit: "cover" as const,
    borderRadius: "1rem",
    ...style,
  };

  if (mediaType === "video") {
    return (
      <video
        className={className}
        style={defaultStyle}
        muted
        playsInline
        autoPlay
        loop
        preload="metadata"
      >
        <source src={src} type="video/mp4" />
        {/* Fallback text */}
        Your browser does not support the video tag.
      </video>
    );
  }

  // For images, use Next.js Image component
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      style={defaultStyle}
      priority={priority}
      className={className}
    />
  );
}
