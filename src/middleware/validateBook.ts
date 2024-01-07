import { Request, Response, NextFunction } from "express"

export function validateBook(req: Request, res: Response, next: NextFunction) {
  const {
    isbn,
    authors,
    publication_year,
    original_title,
    title,
    language_code,
    average_rating,
    image_url,
  } = req.body

  if (typeof title !== "string" || typeof authors !== "string") {
    return res.status(400).json({ error: "Invalid book data" })
  }

  if (
    (isbn !== null && typeof isbn !== "string") ||
    (publication_year !== null && typeof publication_year !== "number") ||
    (original_title !== null && typeof original_title !== "string") ||
    (language_code !== null && typeof language_code !== "string") ||
    (average_rating !== null && typeof average_rating !== "number") ||
    (image_url !== null && typeof image_url !== "string")
  ) {
    return res.status(400).json({ error: "Invalid book data" })
  }

  next()
}
