import jwt from "jsonwebtoken"

export const signJWT = (id: string, email: string) => {
  return jwt.sign(
    {
      id,
      email,
    },
    process.env.JWT_SECRET as string,
    { expiresIn: "3h" }
  )
}
