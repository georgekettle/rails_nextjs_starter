"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

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
import { AlertCircleIcon } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { loginSchema } from "@/lib/validations/auth"
import { useAuth } from "@/components/providers/auth"
import { AuthHeader } from "@/components/auth/auth-header"

export function LoginForm() {
  const router = useRouter()
  const { login } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(data) {
    setIsLoading(true)
    setError("")

    const { success, error: loginError, details } = await login(
      data.email,
      data.password
    )

    if (success) {
      router.replace("/")
    } else {
      setError(loginError)
      
      // If we have validation errors, set them in the form
      if (details) {
        Object.entries(details).forEach(([field, messages]) => {
          form.setError(field, {
            type: 'manual',
            message: Array.isArray(messages) ? messages[0] : messages,
          })
        })
      }
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <AuthHeader
          title="Welcome back"
          description="Enter your email to sign in to your account"
        />
        {error && (
          <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>Something went wrong</AlertTitle>
            <AlertDescription>
              <p>{error}</p>
            </AlertDescription>
          </Alert>
        )}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="john@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>Password</FormLabel>
                <Link
                  href="/auth/forgot-password"
                  className="text-sm hover:underline underline-offset-4"
                >
                  Forgot your password?
                </Link>
              </div>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "loging in..." : "Sign in"}
        </Button>
        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="underline underline-offset-4">
            Sign up
          </Link>
        </div>
      </form>
    </Form>
  )
} 