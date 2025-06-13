'use client'

import { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { useAuth } from "@/components/providers/auth"
import { resetPasswordSchema } from '@/lib/validations/auth'
import { AuthHeader } from '@/components/auth/auth-header'

export function ResetPasswordForm() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { resetPassword } = useAuth()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const form = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      passwordConfirmation: '',
    },
  })

  async function onSubmit(values) {
    try {
      setIsLoading(true)
      await resetPassword({
        token,
        password: values.password,
      })
      
      toast.success('Password reset successful. You can now login with your new password.')
      router.push('/auth/login')
    } catch (error) {
      toast.error(error.message || 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  if (!token) {
    return (
      <AuthHeader
        title="Invalid Reset Link"
        description="This password reset link is invalid or has expired. Please request a new password reset link."
      />
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <AuthHeader
          title="Reset Password"
          description="Enter your new password below"
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
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="passwordConfirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirm your new password"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? 'Resetting...' : 'Reset Password'}
        </Button>
      </form>
    </Form>
  )
}
