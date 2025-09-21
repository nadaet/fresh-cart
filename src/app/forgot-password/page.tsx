"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { toast } from "sonner"

const forgotSchema = z.object({
  email: z.string().email("Invalid email"),
})

type ForgotFormData = z.infer<typeof forgotSchema>

const ForgotPassword = () => {
  const form = useForm<ForgotFormData>({
    resolver: zodResolver(forgotSchema),
    defaultValues: { email: "" },
  })

  const onSubmit = async (values: ForgotFormData) => {
    try {
      const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: values.email }),
      })

      const data = await res.json()

      if (res.ok) {
        toast.success("Reset link sent to your email ✅", { position: "top-center" })
      } else {
        toast.error(data.message || "Something went wrong ❌", { position: "top-center" })
      }
    } catch (error) {
      toast.error("Server error", { position: "top-center" })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md p-8 shadow-lg rounded-lg bg-white">
        <h2 className="text-2xl font-bold mb-6">Forgot Password</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
              Send Reset Link
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default ForgotPassword
