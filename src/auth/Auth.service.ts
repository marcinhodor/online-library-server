import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

export const create = async (req: Request, res: Response) => {
  // get data from request body
  const { first_name, last_name, email, password } = req.body
  // validate if body data is complete
  if (!email || !password || !first_name || !last_name) {
    return res.status(400).json({
      error: "Body must contain email, password, first_name and last_name",
    })
  }
  // check if user already exists
  const duplicateUser = await prisma.user.findUnique({
    where: {
      email,
    },
  })
  if (duplicateUser) {
    return res.status(400).json({
      error: "User already exists",
    })
  }

  try {
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10)
    // store new user in database
    await prisma.user.create({
      data: {
        first_name,
        last_name,
        email,
        hashed_password: hashedPassword,
      },
    })
    res.status(201).json({ success: `New user created with email ${email}` })
  } catch (error) {
    return res.status(500).json({
      error: "error.message",
    })
  }
}
