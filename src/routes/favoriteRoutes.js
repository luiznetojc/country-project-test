import { Router } from "express"
import { createFavorite, getFavorites,getFavoriteByIdController,updateFavorite } from "../controllers/favoriteCountryController.js"

const router = Router()

router.post("/favorites", createFavorite)
router.get("/favorites", getFavorites)
router.get("/favorites/:id", getFavoriteByIdController)
router.put("/favorites/:id", updateFavorite)

export default router