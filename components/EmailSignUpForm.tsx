'use client'
import {useState} from 'react'

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
      body: JSON.stringify({ firstName: name, number,email }),
    });

    if (res.ok) {
      setStatus("success");
      setName("");
      setEmail("");
      setNumber("");
    } else {
      setStatus("error");
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-xl font-semibold mb-2">Vous voulez savoir des qu&apos;une bourse est disponible?</h2>
      <p className="mb-6 text-gray-600">Ajoute ton nom et ton numero Whatsapp.</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
        <input
          type="text"
          placeholder="First Name"
          className="border px-4 py-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="border px-4 py-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Numero WhatsApp"
          className="border px-4 py-2 rounded"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-slate-700 text-white py-2 rounded hover:bg-slate-800 transition"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Submitting..." : "Sign me up"}
        </button>
        {status === "success" && <p className="text-purple-900">You&apos;re in! </p>}
        {status === "error" && <p className="text-red-900">Oops, something went wrong.</p>}
      </form>
    </div>
  );
}

