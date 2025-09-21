"use client"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export default function VerifyCodePage() {
  const [resetCode, setResetCode] = useState("")
  const [message, setMessage] = useState("")
  const router = useRouter()
  const search = useSearchParams()
  const email = search.get("email") || ""  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resetCode })
      })
      const data = await res.json()
      console.log(data)

      if (res.ok) {
        setMessage(" Code verified")
        router.push(`/reset-password?email=${encodeURIComponent(email)}`)
      } else {
        setMessage(data.message || " Invalid code")
      }
    } catch {
      setMessage("Server error")
    }
  }

  return (
    <div className="w-[400px] mx-auto py-10">
      <h1 className="text-2xl mb-4 font-bold text-center">Verify Code</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Enter code"
          className="w-full border rounded p-2"
          value={resetCode}
          onChange={(e) => setResetCode(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">
          Verify
        </button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  )
}
