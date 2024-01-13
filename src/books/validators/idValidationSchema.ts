import { Location } from "express-validator"

export const idValidationSchema = {
  id: {
    in: ["params" as Location],
    errorMessage: "ID should be a number",
    isInt: true,
    toInt: true,
  },
}
