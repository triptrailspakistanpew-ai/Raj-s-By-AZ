"use client"

import React, { useEffect, useRef, useState } from "react"
import { Play, ExternalLink } from "lucide-react"

interface TikTokEmbedProps {
  videoId: string
  citeUrl: string
  className?: string
}

export function TikTokEmbed({ videoId, citeUrl, className }: TikTokEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Function to load and execute TikTok embed script
    const loadTikTokScript = () => {
      // Remove any existing script tag to force re-evaluation of newly mounted blockquotes
      const existingScript = document.getElementById("tiktok-embed-script")
      if (existingScript) {
        existingScript.remove()
      }

      const script = document.createElement("script")
      script.id = "tiktok-embed-script"
      script.src = "https://www.tiktok.com/embed.js"
      script.async = true
      script.onload = () => {
        setIsLoaded(true)
      }
      document.body.appendChild(script)
    }

    loadTikTokScript()

    // Safety timeout in case the script finishes or is cached
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 1200)

    return () => {
      clearTimeout(timer)
    }
  }, [videoId])

  return (
    <div
      ref={containerRef}
      className={`relative w-full flex flex-col items-center justify-center ${className || ""}`}
    >
      <blockquote
        className="tiktok-embed"
        cite={citeUrl}
        data-video-id={videoId}
        style={{
          maxWidth: "605px",
          minWidth: "320px",
          width: "100%",
          margin: "0 auto",
        }}
      >
        <section>
          <a
            target="_blank"
            rel="noreferrer"
            title="@vallies.pk"
            href="https://www.tiktok.com/@vallies.pk?refer=embed"
            className="text-xs text-primary font-medium hover:underline"
          >
            @vallies.pk
          </a>{" "}
          <p className="text-xs text-muted-foreground mt-1">
            Girls Deal in Just 1250.❤️🤌🏻 . Hurry up‼️ DM us for orders on WhatsApp 0328 15 17 399
          </p>{" "}
          <a
            target="_blank"
            rel="noreferrer"
            title="♬ Ghibli-style nostalgic waltz - MaSssuguMusic"
            href="https://www.tiktok.com/music/Ghibli-style-nostalgic-waltz-6817306569852585985?refer=embed"
            className="text-[10px] text-muted-foreground block mt-1"
          >
            ♬ Ghibli-style nostalgic waltz - MaSssuguMusic
          </a>
        </section>
      </blockquote>
    </div>
  )
}

export default TikTokEmbed
