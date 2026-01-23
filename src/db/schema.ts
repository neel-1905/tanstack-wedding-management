import { relations } from 'drizzle-orm'
import {
  pgTable,
  text,
  timestamp,
  boolean,
  index,
  date,
  integer,
} from 'drizzle-orm/pg-core'

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').default(false).notNull(),
  image: text('image'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  role: text('role'),
  banned: boolean('banned').default(false),
  banReason: text('ban_reason'),
  banExpires: timestamp('ban_expires'),
})

export const session = pgTable(
  'session',
  {
    id: text('id').primaryKey(),
    expiresAt: timestamp('expires_at').notNull(),
    token: text('token').notNull().unique(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at')
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text('ip_address'),
    userAgent: text('user_agent'),
    userId: text('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    impersonatedBy: text('impersonated_by'),
  },
  (table) => [index('session_userId_idx').on(table.userId)],
)

export const account = pgTable(
  'account',
  {
    id: text('id').primaryKey(),
    accountId: text('account_id').notNull(),
    providerId: text('provider_id').notNull(),
    userId: text('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    accessToken: text('access_token'),
    refreshToken: text('refresh_token'),
    idToken: text('id_token'),
    accessTokenExpiresAt: timestamp('access_token_expires_at'),
    refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
    scope: text('scope'),
    password: text('password'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at')
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index('account_userId_idx').on(table.userId)],
)

export const verification = pgTable(
  'verification',
  {
    id: text('id').primaryKey(),
    identifier: text('identifier').notNull(),
    value: text('value').notNull(),
    expiresAt: timestamp('expires_at').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at')
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index('verification_identifier_idx').on(table.identifier)],
)

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
}))

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}))

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}))

export const groups = pgTable(
  'groups',
  {
    id: text('id').primaryKey(),
    name: text('name').notNull(),

    createdBy: text('created_by')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),

    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at')
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (t) => [index('groups_created_by_idx').on(t.createdBy)],
)

export const groupMembers = pgTable(
  'group_members',
  {
    id: text('id').primaryKey(),

    groupId: text('group_id')
      .notNull()
      .references(() => groups.id, { onDelete: 'cascade' }),

    userId: text('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),

    isAdmin: boolean('is_admin').default(false).notNull(),

    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (t) => [
    index('group_members_group_idx').on(t.groupId),
    index('group_members_user_idx').on(t.userId),
  ],
)

export const weddings = pgTable(
  'weddings',
  {
    id: text('id').primaryKey(),

    groupId: text('group_id')
      .notNull()
      .references(() => groups.id, { onDelete: 'cascade' }),

    title: text('title').notNull(),

    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at')
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (t) => [index('weddings_group_idx').on(t.groupId)],
)

export const events = pgTable(
  'events',
  {
    id: text('id').primaryKey(),

    weddingId: text('wedding_id')
      .notNull()
      .references(() => weddings.id, { onDelete: 'cascade' }),

    name: text('name').notNull(),
    eventDate: date('event_date'),
    order: integer('order').default(0),

    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at')
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (t) => [index('events_wedding_idx').on(t.weddingId)],
)

export const goods = pgTable(
  'goods',
  {
    id: text('id').primaryKey(),

    eventId: text('event_id')
      .notNull()
      .references(() => events.id, { onDelete: 'cascade' }),

    name: text('name').notNull(),
    quantity: integer('quantity').default(1).notNull(),

    status: text('status').default('pending').notNull(),
    // pending | bought | delivered

    assignedTo: text('assigned_to').references(() => user.id),

    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at')
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (t) => [index('goods_event_idx').on(t.eventId)],
)

export const tasks = pgTable(
  'tasks',
  {
    id: text('id').primaryKey(),

    eventId: text('event_id')
      .notNull()
      .references(() => events.id, { onDelete: 'cascade' }),

    title: text('title').notNull(),
    description: text('description'),

    assignedTo: text('assigned_to').references(() => user.id),

    status: text('status').default('pending').notNull(),
    // pending | in_progress | done

    dueDate: date('due_date'),

    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at')
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (t) => [index('tasks_event_idx').on(t.eventId)],
)

export const groupRelations = relations(groups, ({ many }) => ({
  members: many(groupMembers),
  weddings: many(weddings),
}))

export const weddingRelations = relations(weddings, ({ many, one }) => ({
  group: one(groups, {
    fields: [weddings.groupId],
    references: [groups.id],
  }),
  events: many(events),
}))

export const eventRelations = relations(events, ({ many, one }) => ({
  wedding: one(weddings, {
    fields: [events.weddingId],
    references: [weddings.id],
  }),

  eventGoods: many(goods),
  eventTasks: many(tasks),
}))
