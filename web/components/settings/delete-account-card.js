"use client"

import { useRef, useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/providers/auth"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import HeadingSmall from "../heading-small"

export function DeleteAccountCard() {
  const [isOpen, setIsOpen] = useState(false)
  const [isPending, setIsPending] = useState(false)
  const [passwordChallenge, setPasswordChallenge] = useState("")
  const [error, setError] = useState("")
  const passwordInput = useRef(null)
  const { deleteUser } = useAuth()
  const router = useRouter()

  const closeModal = () => {
    setIsOpen(false)
    setPasswordChallenge("")
    setError("")
  }

  async function onDelete(e) {
    e.preventDefault()
    
    if (!passwordChallenge) {
      setError("Password is required")
      passwordInput.current?.focus()
      return
    }

    setIsPending(true)
    setError("")

    try {
      const result = await deleteUser({ password_challenge: passwordChallenge })
      if (result.success) {
        toast.success("Account deleted successfully")
        closeModal()
        // Redirect to home page
        router.push('/')
      } else {
        setError(result.error || "Failed to delete account")
        passwordInput.current?.focus()
      }
    } catch (error) {
      setError("An unexpected error occurred")
      passwordInput.current?.focus()
    } finally {
      setIsPending(false)
    }
  }

  return (
    <div className="space-y-6">
      <HeadingSmall 
        title="Delete account"
        description="Delete your account and all of its resources"
      />

      <div className="space-y-4 rounded-lg border border-red-100 bg-red-50 p-4 dark:border-red-200/10 dark:bg-red-700/10">
        <div className="relative space-y-0.5 text-red-600 dark:text-red-100">
          <p className="font-medium">Warning</p>
          <p className="text-sm">
            Please proceed with caution, this cannot be undone.
          </p>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="destructive">Delete account</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>
              Are you sure you want to delete your account?
            </DialogTitle>
            <DialogDescription>
              Once your account is deleted, all of its resources and data will
              also be permanently deleted. Please enter your password to confirm
              you would like to permanently delete your account.
            </DialogDescription>
            <form className="space-y-6" onSubmit={onDelete}>
              <div className="grid gap-2">
                <Label htmlFor="password_challenge" className="sr-only">
                  Password
                </Label>

                <Input
                  id="password_challenge"
                  type="password"
                  name="password_challenge"
                  ref={passwordInput}
                  value={passwordChallenge}
                  onChange={(e) => setPasswordChallenge(e.target.value)}
                  placeholder="Password"
                  autoComplete="current-password"
                />

                {error && (
                  <p className="text-sm text-destructive">{error}</p>
                )}
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="secondary" onClick={closeModal}>
                    Cancel
                  </Button>
                </DialogClose>

                <Button variant="destructive" disabled={isPending} type="submit">
                  {isPending ? "Deleting..." : "Delete Account"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
} 