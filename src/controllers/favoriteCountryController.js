import { saveFavoriteCountry } from "../services/favoriteCountryService.js"

const createFavorite = async (req, res) => {
    const { countryName } = req.body

    if (!countryName) {
        return res.status(400).json({ message: "O campo countryName é obrigatório" })
    }

    try {
        const savedRecord = await saveFavoriteCountry(countryName)

        if (!savedRecord) {
            return res.status(404).json({ message: "O País nao foi encontrado!" })
        }

        res.status(201).json(savedRecord)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Erro ao Salvar o País favorito" })
    }
}

export { createFavorite }