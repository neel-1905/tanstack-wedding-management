import { createMiddleware } from '@tanstack/react-start'
import { redirect } from '@tanstack/react-router'
import { auth } from './auth'

export const authedMiddleware = createMiddleware().server(
  async ({ next, request }) => {
    const session = await auth.api.getSession({ headers: request.headers })

    if (!session) {
      throw redirect({ to: '/auth/login' })
    }
    if (request.url.includes('/auth') && session) {
      throw redirect({ to: '/' })
    }

    return await next({
      context: {
        user: session.user,
      },
    })
  },
)

export const authMiddleware = createMiddleware().server(
  async ({ next, request }) => {
    const session = await auth.api.getSession({ headers: request.headers })

    if (request.url.includes('/auth') && session) {
      throw redirect({ to: '/' })
    }

    return await next()
  },
)
