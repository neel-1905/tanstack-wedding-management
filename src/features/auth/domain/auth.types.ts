export type TUser =
  typeof import('@/lib/auth-client').authClient.$Infer.Session.user
