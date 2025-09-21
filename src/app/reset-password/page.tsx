"use client"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("")
  const [message, setMessage] = useState("")
  const router = useRouter()
  const search = useSearchParams()
  const email = search.get("email") || ""

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword })
      })
      const data = await res.json()
      console.log(data)

      if (res.ok) {
        setMessage("✅ Password reset successfully")
        router.push("/login")
      } else {
        setMessage(data.message || "❌ Error resetting password")
      }
    } catch {
      setMessage("Server error")
    }
  }

  return (
    <div className="w-[400px] mx-auto py-10">
      <h1 className="text-2xl mb-4 font-bold text-center">Reset Password</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          placeholder="New password"
          className="w-full border rounded p-2"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">
          Reset
        </button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  )
}
