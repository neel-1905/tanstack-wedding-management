import { authClient } from '@/lib/auth-client'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/(authed)/(dashboard)/')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          navigate({ to: '/auth/login' })
        },
      },
    })
  }

  return (
    <div>
      Hello "/(dashboard)/"!
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}
