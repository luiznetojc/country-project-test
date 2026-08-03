import { Router } from "express"
import { createFavorite, getFavorites,getFavoriteByIdController } from "../controllers/favoriteCountryController.js"

const router = Router()

router.post("/favorites", createFavorite)
router.get("/favorites", getFavorites)
router.get("/favorites/:id", getFavoriteByIdController)

export default router