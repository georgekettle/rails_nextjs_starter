"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
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

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
})

export function ProfileForm() {
  const [isPending, setIsPending] = useState(false)
  const { user, updateUser } = useAuth()
  
  const form = useForm({
    resolver: zodResolver(profileFormSchema),
    values: {
      name: user?.name || "",
    },
  })

  async function onSubmit(data) {
    setIsPending(true)
    try {
      const { success, error, details } = await updateUser(data)
      
      if (success) {
        toast.success("Profile updated successfully")
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
    <div className="space-y-6">
      <HeadingSmall title="Profile" description="Update your profile information."/>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
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
    </div>
  )
} 