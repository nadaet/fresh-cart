"use client"
import { Button } from "@/components/ui/button"
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { loginSchema, LoginFormData } from "@/schema/login.schema"
import { signIn } from "next-auth/react"

const Login = () => {
  const router = useRouter()

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (values: LoginFormData) => {
    try {
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
        callbackUrl:"/"
      })

      if (res?.ok) {
        toast.success("Logged in successfully!", {
          position: "top-center",
          duration: 3000,
        })

        window.location.href = res.url || "/"
      } else {
        toast.error(res?.error || " Invalid ", {
          position: "top-center",
          duration: 3000,
        })
      }
    } catch (err) {
      toast.error("Something wrong", {
        position: "top-center",
        duration: 3000,
      })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-4xl p-12">
        {/* Title */}
        <h2 className="text-4xl font-bold mb-10 text-left">login now</h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl">Email :</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      {...field}
                      className="w-full bg-blue-50 py-5 px-5 text-xl"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl">Password :</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                      className="w-full bg-blue-50 py-5 px-5 text-xl"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Forget password + Submit */}
            <div className="flex items-center justify-between">
              <a href="#" className="text-lg font-semibold hover:underline">
                forget your password ?
              </a>
              <Button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-xl rounded-lg"
              >
                login now
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default Login
