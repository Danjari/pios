"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"

const funnyMessages = [
  "Labou sanni no...",
  "Connexion en balade 🐢",
  "Wai, doucement 😭",
  "Blame Niger Telecom 😒",
  "Internet boit son thé ☕",
  "On souffle... ça arrive",
  "Ça vient, mollo mollo"
]

interface FunnyLoadingButtonProps {
  href: string
  className?: string
}

export function FunnyLoadingButton({ href, className }: FunnyLoadingButtonProps) {
  const router = useRouter()
  const [loadingText, setLoadingText] = useState<string | null>(null)
  const [hasNavigated, setHasNavigated] = useState(false)

  const handleClick = () => {
    setTimeout(() => {
      if (!hasNavigated) {
        const msg = funnyMessages[Math.floor(Math.random() * funnyMessages.length)]
        setLoadingText(msg)

        // upgrade message after 5s
        setTimeout(() => {
          if (!hasNavigated) {
            setLoadingText("Ça arrive, je te jure… il y'a juste un petit problème de connexion 🙈")
          }
        }, 5000)
      }
    }, 400) // If page still not changed after 400ms, show funny stuff

    router.push(href)
    setHasNavigated(true) // this unmounts the component before any text is shown (in fast networks)
  }

  return (
    <Button onClick={handleClick} className={className} disabled={!!loadingText}>
      {loadingText || "Voir plus"}
    </Button>
  )
}
