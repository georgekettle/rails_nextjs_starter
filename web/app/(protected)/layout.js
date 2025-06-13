import { ProtectedRoute } from '@/components/auth/protected-route'

export default function ProtectedLayout({ children }) {
  return <ProtectedRoute>{children}</ProtectedRoute>
} 