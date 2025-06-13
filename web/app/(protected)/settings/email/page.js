import { EmailForm } from "@/components/settings/email-form"
import SettingsLayout from "@/components/settings/settings-layout"

export default function SettingsEmailPage() {
  return (
    <SettingsLayout>
      <div className="space-y-8">
        <EmailForm />
      </div>
    </SettingsLayout>
  )
} 