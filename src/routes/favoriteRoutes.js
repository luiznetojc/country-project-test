import { Router } from "express"
import { createFavorite } from "../controllers/favoriteCountryController.js"

const router = Router()

router.post("/favorites", createFavorite)

export default router