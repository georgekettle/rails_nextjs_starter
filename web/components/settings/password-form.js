"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import HeadingSmall from "@/components/heading-small"
import { useAuth } from "@/components/providers/auth"
import { updatePasswordSchema } from "@/lib/validations/auth"

export function PasswordForm() {
  const [isPending, setIsPending] = useState(false)
  const { updatePassword } = useAuth()
  
  const form = useForm({
    resolver: zodResolver(updatePasswordSchema),
    values: {
      current_password: "",
      password: "",
      password_confirmation: "",
    },
  })

  async function onSubmit(data) {
    setIsPending(true)
    try {
      const { success, error, details } = await updatePassword(data)
      
      if (success) {
        toast.success("Password updated successfully")
        form.reset()
      } else {
        // If we have validation errors, set them in the form
        if (details) {
          Object.entries(details).forEach(([field, messages]) => {
            form.setError(field, {
              type: 'manual',
              message: Array.isArray(messages) ? messages[0] : messages,
            })
          })
        }
        toast.error(error || "Something went wrong")
      }
    } finally {
      setIsPending(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <HeadingSmall 
          title="Update password" 
          description="Ensure your account is using a long, random password to stay secure"
        />
        <FormField
          control={form.control}
          name="current_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Password</FormLabel>
              <FormControl>
                <Input 
                  type="password"
                  placeholder="Enter your current password"
                  {...field}
                />
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
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input 
                  type="password"
                  placeholder="Enter your new password"
                  {...field}
                />
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
              <FormLabel>Confirm New Password</FormLabel>
              <FormControl>
                <Input 
                  type="password"
                  placeholder="Confirm your new password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Save Password"}
        </Button>
      </form>
    </Form>
  )
} 