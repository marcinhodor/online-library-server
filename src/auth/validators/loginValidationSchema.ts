import { registerValidationSchema } from "./registerValidationSchema"

export const loginValidationSchema = {
  email: { ...registerValidationSchema.email },
  password: { ...registerValidationSchema.password },
}
