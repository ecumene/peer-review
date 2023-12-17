import * as schema from "./schema";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

export const client = createClient({ url: "file:db/sqlite.db" });
export const db = drizzle(client, { schema });
