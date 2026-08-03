import { Router } from "express"
import { createFavorite, getFavorites } from "../controllers/favoriteCountryController.js"

const router = Router()

router.post("/favorites", createFavorite)
router.get("/favorites", getFavorites)

export default router