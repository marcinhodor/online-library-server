import { Location } from "express-validator"

export const findBookValidationSchema = {
  isbn: {
    in: "query" as Location,
    optional: true,
    notEmpty: { errorMessage: "isbn cannot be empty" },
    trim: true,
  },
  authors: {
    in: "query" as Location,
    optional: true,
    notEmpty: { errorMessage: "authors cannot be empty" },
    trim: true,
    custom: {
      options: (value: string) => {
        if (!isNaN(Number(value))) {
          throw new Error("authors must be a string")
        }
        return true
      },
    },
  },
  title: {
    in: "query" as Location,
    optional: true,
    notEmpty: { errorMessage: "title cannot be empty" },
    trim: true,
  },
}
