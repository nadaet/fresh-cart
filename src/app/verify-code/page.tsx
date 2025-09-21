"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const codeSchema = z.object({
  resetCode: z.string().min(6, "Code must be 6 digits"),
})

type CodeFormData = z.infer<typeof codeSchema>

const VerifyCodePage = () => {
  const router = useRouter()

  const form = useForm<CodeFormData>({
    resolver: zodResolver(codeSchema),
    defaultValues: { resetCode: "" },
  })

  const onSubmit = async (values: CodeFormData) => {
    try {
      const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resetCode: values.resetCode }),
      })

      const data = await res.json()

      if (res.ok) {
        toast.success("Code verified successfully ✅", { position: "top-center" })
        router.push("/reset-password") // يوديه لصفحة تغيير الباسورد
      } else {
        toast.error(data.message || "Invalid code ❌", { position: "top-center" })
      }
    } catch (error) {
      toast.error("Server error", { position: "top-center" })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md p-8 shadow-lg rounded-lg bg-white">
        <h2 className="text-2xl font-bold mb-6">Verify Reset Code</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="resetCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reset Code</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Enter the code from email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
              Verify Code
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default VerifyCodePage
