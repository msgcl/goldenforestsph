"use client";

import * as React from "react";

type OptimizedImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  priority?: boolean;
};

function OptimizedImage({ priority = false, loading, decoding, fetchPriority, draggable = false, className, ...props }: OptimizedImageProps) {
  return (
    <img
      loading={loading ?? (priority ? "eager" : "lazy")}
      decoding={decoding ?? "async"}
      fetchPriority={fetchPriority ?? (priority ? "high" : "auto")}
      draggable={draggable}
      className={className ? `block ${className}` : "block"}
      {...props}
    />
  );
}

type OptimizedVideoProps = React.VideoHTMLAttributes<HTMLVideoElement> & {
  priority?: boolean;
};

function OptimizedVideo({ priority = false, preload, playsInline = true, className, ...props }: OptimizedVideoProps) {
  return (
    <video
      preload={preload ?? (priority ? "metadata" : "none")}
      playsInline={playsInline}
      className={className ? `block ${className}` : "block"}
      {...props}
    />
  );
}

export { OptimizedImage, OptimizedVideo };
