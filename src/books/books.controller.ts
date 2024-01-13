import express from "express"
import { checkSchema } from "express-validator"
import { idValidationSchema } from "./validators/idValidationSchema"
import { createBookValidationSchema } from "./validators/createValidationSchema"
import { create, findAll, findByParams, findOne, update } from "./books.service"
import { findBookValidationSchema } from "./validators/findValidationSchema"
import { updateBookValidationSchema } from "./validators/updateValidationSchema"

const router = express.Router()

router
  .get("/", findAll)
  .post("/", checkSchema(createBookValidationSchema), create)

router.get("/search", checkSchema(findBookValidationSchema), findByParams)

router
  .get("/:id", checkSchema(idValidationSchema), findOne)
  .patch(
    "/:id",
    checkSchema(idValidationSchema),
    checkSchema(updateBookValidationSchema),
    update
  )

export default router
