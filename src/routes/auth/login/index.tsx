import { LoginForm } from '@/features/auth/ui/login-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/login/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex-center-col min-h-screen py-10">
      <LoginForm />
    </div>
  )
}
