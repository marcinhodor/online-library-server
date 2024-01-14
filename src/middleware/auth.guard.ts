import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"

declare global {
  namespace Express {
    interface Request {
      user?: jwt.JwtPayload | string
    }
  }
}

export const authGuard = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

  if (authHeader) {
    const token = authHeader.split(" ")[1]

    jwt.verify(token!, process.env.JWT_SECRET!, (err, user) => {
      if (err) {
        return res.sendStatus(403)
      }

      req.user = user

      next()
    })
  } else {
    return res.sendStatus(401)
  }
}
