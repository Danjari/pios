"use client"

// video player that renders well
import React from "react"

interface VideoPlayerProps {
  src: string
  title?: string
}

export const VideoPlayer = ({ src, title }: VideoPlayerProps) => {
  return (
    <div className="my-12 flex justify-center">
      <div className="w-full md:w-3/4 xl:w-2/3 aspect-video rounded-xl overflow-hidden shadow-lg border border-gray-200">
        <iframe
          className="w-full h-full"
          src={src}
          title={title || "University Video"}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  )
}
