import { ProfileForm } from "@/components/settings/profile-form"
import { DeleteAccountCard } from "@/components/settings/delete-account-card"
import SettingsLayout from "@/components/settings/settings-layout"

export default function SettingsProfilePage() {
  return (
    <SettingsLayout>
      <div className="space-y-8">
        <ProfileForm />
        <DeleteAccountCard />
      </div>
    </SettingsLayout>
  )
} 