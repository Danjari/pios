'use client'
import {useState} from 'react'
import { Button } from "@/components/ui/button"

export function EmailSignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const res = await fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ firstName: name, number, email }),
    });

    if (res.ok) {
      setStatus("success");
      setName("");
      setEmail("");
      setNumber("");
      window.close();
    } else {
      setStatus("error");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-2 text-center">Ne manquez plus aucune opportunité de bourse !</h2>
        <p className="mb-6 text-gray-600 text-center">Chaque semaine, nous mettons à jour les nouvelles bourses disponibles. Soyez parmi les premiers informés directement sur WhatsApp.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Prénom"
            className="border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="tel"
            placeholder="Numéro WhatsApp"
            className="border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
          />
          <Button
            type="submit"
            className="w-full"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Envoi en cours..." : "S'inscrire"}
          </Button>
          {status === "success" && <p className="text-green-600 text-center">Inscription réussie!</p>}
          {status === "error" && <p className="text-red-600 text-center">Une erreur est survenue.</p>}
        </form>
      </div>
    </div>
  );
}

