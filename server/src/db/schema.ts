import { sql } from "drizzle-orm";
import {
  integer,
  pgTable,
  varchar,
  text,
  timestamp,
  decimal,
  boolean,
  pgEnum,
  check,
  uuid,
  unique,
} from "drizzle-orm/pg-core";

const usersTable = pgTable("users", {
  userId: uuid("user_id").primaryKey().defaultRandom(),
  username: varchar("username", { length: 255 }).notNull().unique(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  avatarUrl: text("avatar_url"),

  isVerified: boolean("is_verified").default(false).notNull(),

  locationName: varchar("location_name"),

  latitude: decimal("latitude", { precision: 10, scale: 8 }),
  longitude: decimal("longitude", { precision: 11, scale: 8 }),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const categoryEnum = pgEnum("category", [
  "electronics",
  "education",
  "fashion",
  "furniture",
  "vehicle",
  "others",
]);

export const conditionEnum = pgEnum("condition", [
  "new",
  "good",
  "fair",
  "old",
]);

export const statusEnum = pgEnum("status", ["available", "pending", "sold"]);

const listingsTable = pgTable(
  "listings",
  {
    listingId: uuid("listing_id").primaryKey().defaultRandom(),
    title: varchar("title", { length: 100 }).notNull(),
    description: text("description"),
    price: integer("price").notNull(),
    category: categoryEnum().notNull(),
    condition: conditionEnum().notNull(),
    locationName: varchar("location_name").notNull(),

    latitude: decimal("latitude", { precision: 10, scale: 8 }),
    longitude: decimal("longitude", { precision: 11, scale: 8 }),

    status: statusEnum().notNull().default("available"),

    imageUrls: text("image_urls")
      .array()
      .notNull()
      .default(sql`ARRAY[]::text[]`),
    authorId: uuid("author_id")
      .notNull()
      .references(() => usersTable.userId, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [check("price_check", sql`${table.price} > 0`)],
);

const conversationsTable = pgTable(
  "conversations",
  {
    conversationId: uuid("conversation_id").primaryKey().defaultRandom(),
    listingId: uuid("listing_id").references(() => listingsTable.listingId, {
      onDelete: "cascade",
    }),
    buyerId: uuid("buyer_id").references(() => usersTable.userId),
    sellerId: uuid("seller_id").references(() => usersTable.userId),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => ({
    unqConvoConstraint: unique("unique_conv_idx").on(
      table.listingId,
      table.buyerId,
      table.sellerId,
    ),
  }),
);

const messagesTable = pgTable("messages", {
  messageId: uuid("message_id").primaryKey().defaultRandom(),
  conversationId: uuid("conversation_id").references(
    () => conversationsTable.conversationId,
    { onDelete: "cascade" },
  ),
  senderId: uuid("sender_id").references(() => usersTable.userId),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export { usersTable, listingsTable, conversationsTable, messagesTable };
