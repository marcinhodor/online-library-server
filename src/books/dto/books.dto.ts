import { Book as PrismaBook } from "@prisma/client"

export type BookDto = Omit<PrismaBook, "id" | "created_at" | "updated_at">
