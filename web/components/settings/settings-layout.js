"use client"

import Link from "next/link"
import { usePathname } from 'next/navigation'

import Heading from "@/components/heading"
import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { Container } from "../ui/container"

const sidebarNavItems = [
  {
    title: "Profile",
    href: '/settings/profile',
  },
  {
    title: "Email",
    href: '/settings/email',
  },
  {
    title: "Password",
    href: '/settings/password',
  },
  {
    title: "Appearance",
    href: '/settings/appearance',
  },
]

export default function SettingsLayout({ children }) {
  const pathname = usePathname()

  return (
    <main>
      <Navbar position="sticky" />
      <Container>
        <div className="py-6">
          <Heading
            title="Settings"
            description="Manage your profile and account settings"
          />

          <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12">
            <aside className="w-full max-w-xl lg:w-48">
              <nav className="flex flex-col space-y-1 space-x-0">
                {sidebarNavItems.map((item) => (
                  <Button
                    key={item.href}
                    size="sm"
                    variant="ghost"
                    asChild
                    className={cn("w-full justify-start", {
                      "bg-muted": pathname === item.href,
                    })}
                  >
                    <Link href={item.href}>
                      {item.title}
                    </Link>
                  </Button>
                ))}
              </nav>
            </aside>

            <Separator className="my-6 md:hidden" />

            <div className="flex-1 md:max-w-2xl">
              <section className="max-w-xl space-y-12">{children}</section>
            </div>
          </div>
        </div>
      </Container>
    </main>
  )
}