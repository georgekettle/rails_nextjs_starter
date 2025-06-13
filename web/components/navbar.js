'use client';

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { useAuth } from '@/components/providers/auth'
import { Logo } from '@/components/logo';
import { UserRound } from "lucide-react"
import { Container } from '@/components/ui/container'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { getInitials } from '@/lib/utils'

export default function Navbar({ position = 'fixed' }) {
  const { user, logout } = useAuth()

  return (
    <nav className={`${position} top-0 inset-x-0 bg-background/80 backdrop-blur-sm z-50`}>
      <Container>
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Logo />
          </div>
          
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="relative h-10 w-10 rounded-full"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>
                      {user ? (
                        getInitials(user.name)
                      ) : (
                        <UserRound />
                      )}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {user ? (
                  <>
                    <div className="flex items-center gap-2 p-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-sm">
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{user.name}</span>
                        <span className="text-xs text-muted-foreground">{user.email}</span>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/settings/profile">
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={() => logout()}
                      className="text-destructive focus:text-destructive focus:bg-destructive/5"
                    >
                      Logout
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/auth/login">
                        Login
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/auth/signup">
                        Sign up
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </Container>
    </nav>
  )
} 