import {
  integer,
  pgTable,
  varchar,
  text,
  timestamp,
  decimal,
  boolean,
} from "drizzle-orm/pg-core";

const usersTable = pgTable("users", {
  userId: integer("user_id").primaryKey().generatedAlwaysAsIdentity(),
  username: varchar("username", { length: 255 }).notNull().unique(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  avatarUrl: text("avatar_url"),

  isVerified: boolean("is_verified").default(false).notNull(),

  latitude: decimal("latitude", { precision: 10, scale: 8 }),
  longitude: decimal("longitude", { precision: 11, scale: 8 }),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export { usersTable };
