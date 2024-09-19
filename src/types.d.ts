import { items } from "~/server/db/schema";
type Item = typeof items.$inferSelect;
