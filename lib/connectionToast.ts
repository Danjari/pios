// lib/showConnectionToast.ts
"use client"

import { toast } from "sonner"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"

const funnyMessages = [
  "Labou sanni no, attend seulement...",
  "La connexion cherche son chemin 🐢",
  "Wai, tu veux aller trop vite aussi 😭",
  "C’est pas nous, c’est Niger Telecom",
  "L’Internet a pris un petit thé, reviens bientôt ☕",
  "On souffle un peu, et ça va partir",
  "T’inquiète, ça va arriver juste un peu lentement"
]

export function showConnectionToastAndNavigate(router: AppRouterInstance, href: string) {
  const toastIdRef: { current: string | number | null } = { current: null }

  // After 2s, show first message
  setTimeout(() => {
    const random = Math.floor(Math.random() * funnyMessages.length)
    toastIdRef.current = toast.loading(funnyMessages[random])

    // After 4 more seconds, show updated message
    setTimeout(() => {
      if (toastIdRef.current) {
        toast.message("Ça arrive, je te jure… on a juste un petit problème de connexion 🙈", {
          id: toastIdRef.current,
          duration: 4000,
        })
      }
    }, 4000)
  }, 2000)

  // Navigate
  router.push(href)
}
