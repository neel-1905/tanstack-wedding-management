import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(authed)/onboarding')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(authed)/onboarding"!</div>
}
