'use client'

import { AuthLayout } from '@/components/auth/auth-layout'
import { ResetPasswordForm } from '@/components/auth/reset-password-form'

export default function ResetPasswordPage() {
  return (
    <AuthLayout imagePath="/images/clouds.jpg">
      <ResetPasswordForm />
    </AuthLayout>
  )
}
