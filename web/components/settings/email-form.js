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
import { updateEmailSchema } from "@/lib/validations/auth"

export function EmailForm() {
  const [isPending, setIsPending] = useState(false)
  const { user, updateEmail } = useAuth()
  
  const form = useForm({
    resolver: zodResolver(updateEmailSchema),
    values: {
      email: user?.email || "",
      password: "",
    },
  })

  async function onSubmit(data) {
    setIsPending(true)
    try {
      const { success, error, details } = await updateEmail(data)
      
      if (success) {
        toast.success("Email updated successfully")
        form.reset({ email: data.email, password: "" })
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
          title="Update email" 
          description="Update your email address and verify it"
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input 
                  type="email"
                  placeholder="Enter your new email"
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
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Save changes"}
        </Button>
      </form>
    </Form>
  )
} 