import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import { BookDto } from "./dto/books.dto"
import { matchedData, validationResult } from "express-validator"

const prisma = new PrismaClient()

export const findAll = async (req: Request, res: Response) => {
  try {
    const books = await prisma.book.findMany()
    return res.json(books)
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while trying to fetch books",
    })
  }
}

export const findOne = async (req: Request, res: Response) => {
  const result = validationResult(req)

  if (!result.isEmpty()) return res.status(400).send(result.array())

  const data = matchedData(req)

  try {
    const foundBook = await prisma.book.findUnique({
      where: {
        id: data.id,
      },
    })
    if (!foundBook) {
      return res.status(404).json({
        error: "Book not found",
      })
    }
    return res.json(foundBook)
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while trying to fetch a book",
    })
  }
}

export const findByParams = async (req: Request, res: Response) => {
  const result = validationResult(req)

  if (!result.isEmpty()) return res.status(400).send(result.array())

  const data = matchedData(req)
  const searchParams = {}
  for (const key in data) {
    ;(searchParams as any)[key] = {
      contains: data[key],
      mode: "insensitive",
    }
  }
  try {
    const books = await prisma.book.findMany({
      where: searchParams,
    })
    return res.json(books)
  } catch (error) {
    return res.status(500).json({
      msg: "An error occurred while trying to fetch books",
      error,
    })
  }
}

export const create = async (req: Request, res: Response) => {
  const result = validationResult(req)

  if (!result.isEmpty()) return res.status(400).send(result.array())

  const data = matchedData(req) as BookDto
  console.log(data)

  try {
    const bookCreated = await prisma.book.create({
      data,
    })
    return res.json({ message: `Book ${bookCreated.id} created` })
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while trying to create a book",
    })
  }
}

export const update = async (req: Request, res: Response) => {
  const result = validationResult(req)

  if (!result.isEmpty()) return res.status(400).send(result.array())

  const data = matchedData(req)

  try {
    const updatedBook = await prisma.book.update({
      where: {
        id: data.id,
      },
      data,
    })

    return res.json({ message: `Book ${updatedBook.id} updated` })
  } catch (error) {
    return res
      .status(500)
      .json({ error: "An error occurred while trying to update a book" })
  }
}
