import { SignupForm } from '@/components/auth/signup-form'
import { AuthLayout } from '@/components/auth/auth-layout'

export default function SignupPage() {
  return (
    <AuthLayout imagePath="/images/clouds.jpg">
      <SignupForm />
    </AuthLayout>
  )
} 