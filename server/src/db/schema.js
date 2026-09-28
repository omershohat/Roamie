import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  date,
  integer,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  firstName: varchar("first_name", { length: 40 }).notNull(),
  lastName: varchar("last_name", { length: 40 }).notNull(),
  email: varchar("email", { length: 100 }).notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const trips = pgTable("trips", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  destination: varchar("destination", { length: 255 }).notNull(),
  startDate: date("start_date").notNull(),
  endDate: date("end_date"),
  createdAt: timestamp("created_at").defaultNow(),
});
