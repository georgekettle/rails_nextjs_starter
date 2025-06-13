import { ForgotPasswordForm } from '@/components/auth/forgot-password-form'
import { AuthLayout } from '@/components/auth/auth-layout'

export default function ForgotPasswordPage() {
  return (
    <AuthLayout imagePath="/images/clouds.jpg">
      <ForgotPasswordForm />
    </AuthLayout>
  )
} 