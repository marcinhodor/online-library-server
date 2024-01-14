import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { LoginDto, RegisterDto } from "./dto/auth.dto"
import { matchedData, validationResult } from "express-validator"
import { signJWT } from "../utils/signJWT"

const prisma = new PrismaClient()

export const register = async (req: Request, res: Response) => {
  const result = validationResult(req)

  if (!result.isEmpty()) res.status(400).json({ errors: result.array() })

  const data = matchedData(req)

  const { first_name, last_name, email, password } = data as RegisterDto

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

export const login = async (req: Request, res: Response) => {
  const result = validationResult(req)

  if (!result.isEmpty()) return res.status(400).send(result.array())

  const data = matchedData(req)

  const { email, password } = data as LoginDto
  // check if user exists
  const foundUser = await prisma.user.findUnique({
    where: {
      email,
    },
  })
  // if user does not exist, return error
  if (!foundUser) return res.sendStatus(401) // unauthorized
  // check if password is correct
  const isPasswordCorrect = await bcrypt.compare(
    password,
    foundUser.hashed_password
  )
  // if password is incorrect, return error
  if (!isPasswordCorrect) return res.sendStatus(401) // unauthorized

  // if user exists and password is correct, create jwt token
  const token = signJWT(foundUser.id, foundUser.email)

  // return token in a cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 3 * 60 * 60 * 1000,
  })
  res.status(200).json({ success: `User logged in successfully` })
}

export const logout = (req: Request, res: Response) => {
  res.clearCookie("token")
  res.status(200).json({ success: `User logged out successfully` })
}
