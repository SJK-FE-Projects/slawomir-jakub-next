import Image from "next/image";
import React from "react";
import styles from "./MediaElement.module.css";

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

  const wrapperStyle: React.CSSProperties = {
    width: "100%",
    aspectRatio: `${width} / ${height}`,
    ...style,
  };

  return (
    <div
      className={`${styles.wrapper} ${className}`.trim()}
      style={wrapperStyle}
    >
      {mediaType === "video" ? (
        <video
          className={styles.media}
          muted
          playsInline
          autoPlay
          loop
          preload="metadata"
          controls={false}
          disablePictureInPicture
          disableRemotePlayback
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="100vw"
          priority={priority}
          className={styles.media}
        />
      )}
    </div>
  );
}
