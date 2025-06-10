"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

const funnyMessages = [
  "Labou sanni no, attend seulement...",
  "La connexion cherche son chemin 🐢",
  "Wai, tu veux aller trop vite aussi 😭",
  "C’est pas nous, c’est Niger Telecom",
  "L’Internet a pris un petit thé, reviens bientôt ☕",
  "On souffle un peu, et ça va partir",
  "T’inquiète, ça va arriver juste un peu lentement"
]

interface FunnyLoadingButtonProps {
  href: string
  className?: string
}

export function FunnyLoadingButton({ href, className }: FunnyLoadingButtonProps) {
  const [loadingText, setLoadingText] = useState<string | null>(null)
  const router = useRouter()

  const handleClick = () => {
    const msg = funnyMessages[Math.floor(Math.random() * funnyMessages.length)]
    setLoadingText(msg)

    setTimeout(() => {
      setLoadingText("Ça arrive, je te jure… il y'a juste un petit problème de connexion 🙈")
    }, 5000)

    router.push(href)
  }

  return (
    <Button onClick={handleClick} className={className} disabled={!!loadingText}>
      {loadingText || "Voir plus"}
    </Button>
  )
}
