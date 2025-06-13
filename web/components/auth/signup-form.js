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
import { signupSchema } from "@/lib/validations/auth"
import { useAuth } from "@/components/providers/auth"
import { AuthHeader } from "@/components/auth/auth-header"

export function SignupForm() {
  const router = useRouter()
  const { signUp } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  })

  async function onSubmit(data) {
    setIsLoading(true)
    setError("")

    const { success, error: signUpError, details } = await signUp(
      data.email,
      data.password,
      data.name
    )

    if (success) {
      router.replace("/")
    } else {
      setError(signUpError)
      
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
          title="Create an account"
          description="Enter your details below to create your account"
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password_confirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Creating account..." : "Create account"}
        </Button>
        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/auth/login" className="underline underline-offset-4">
            Login
          </Link>
        </div>
      </form>
    </Form>
  )
} 