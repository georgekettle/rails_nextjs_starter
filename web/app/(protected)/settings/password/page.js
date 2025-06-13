import { PasswordForm } from "@/components/settings/password-form"
import SettingsLayout from "@/components/settings/settings-layout"

export default function SettingsPasswordPage() {
  return (
    <SettingsLayout>
      <div className="space-y-8">
        <PasswordForm />
      </div>
    </SettingsLayout>
  )
} 