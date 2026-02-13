/** @format */

import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../../generated/prisma/client";
import getEnv from "../lib/env";

const adapter = new PrismaMariaDb({
  host: getEnv(process.env.DATABASE_HOST),
  user: getEnv(process.env.DATABASE_USER),
  password: getEnv(process.env.DATABASE_PASSWORD),
  database: getEnv(process.env.DATABASE_NAME),
  connectionLimit: 5,
});
const prisma = new PrismaClient({ adapter });

export { prisma };
