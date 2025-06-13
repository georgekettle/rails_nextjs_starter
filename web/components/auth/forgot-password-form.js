"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { toast } from "sonner"
import { authApi } from "@/lib/api/auth"
import { AuthHeader } from "@/components/auth/auth-header"

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
})

export function ForgotPasswordForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  async function onSubmit(values) {
    setIsLoading(true)
    try {
      await authApi.requestPasswordReset(values)
      toast('Check your email for the password reset link.')
    } catch (error) {
      // Error is already handled by the API client's handleResponse function
      // which shows the toast with proper error details
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid gap-6">
      <AuthHeader
        title="Forgot your password?"
        description="Enter your email below to receive a password reset link"
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="name@example.com"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Sending..." : "Send reset link"}
          </Button>
          <div className="text-center text-sm">
            Back to{" "}
            <Link href="/auth/login" className="underline underline-offset-4">
              Login
            </Link>
          </div>
        </form>
      </Form>
    </div>
  )
} 