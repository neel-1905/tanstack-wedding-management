import { SignUpForm } from '@/features/auth/ui/sign-up-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/sign-up/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex-center-col min-h-screen py-10">
      <SignUpForm />
    </div>
  )
}
