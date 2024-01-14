import express from "express"
import { checkSchema } from "express-validator"
import { idValidationSchema } from "./validators/idValidationSchema"
import { createBookValidationSchema } from "./validators/createValidationSchema"
import { create, findAll, findByParams, findOne, update } from "./books.service"
import { findBookValidationSchema } from "./validators/findValidationSchema"
import { updateBookValidationSchema } from "./validators/updateValidationSchema"
import { authGuard } from "../middleware/auth.guard"

const router = express.Router()

router
  .get("/", findAll)
  .get("/search", checkSchema(findBookValidationSchema), findByParams)
  .get("/:id", authGuard, checkSchema(idValidationSchema), findOne)
  .post("/", authGuard, checkSchema(createBookValidationSchema), create)
  .patch(
    "/:id",
    authGuard,
    checkSchema(idValidationSchema),
    checkSchema(updateBookValidationSchema),
    update
  )

export default router
