import { Router } from "express"
import { getCountry } from "../controllers/countryController.js"

const router = Router()

router.get("/countries/:name", getCountry)

export default router