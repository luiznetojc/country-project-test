import { saveFavoriteCountry, listFavoriteCountries, getFavoriteById,updateFavoriteCountry ,deleteFavoriteCountry} from "../services/favoriteCountryService.js"

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

        if (savedRecord === "DUPLICATE") {
            return res.status(409).json({ message: "Este país já está na lista de favoritos" })
        }

        res.status(201).json(savedRecord)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Erro ao Salvar o País favorito" })
    }
}

const getFavorites = async (req, res) => {
    try {
        const savedRecords = await listFavoriteCountries()
        res.status(200).json(savedRecords)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Erro ao listar países favoritos" })
    }
}

const getFavoriteByIdController = async (req, res) => {
    const { id } = req.params

    try {
        const registerID = await getFavoriteById(id)

        if (!registerID) {
            return res.status(404).json({ message: "Favorito não encontrado" })
        }

        res.status(200).json(registerID)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Erro ao buscar favorito" })
    }
}

const updateFavorite = async (req, res) => {
    const { id } = req.params
    const { countryName } = req.body

    if (!countryName) {
        return res.status(400).json({ message: "O campo countryName é obrigatório" })
    }

    try {
        const result = await updateFavoriteCountry(id, countryName)

        if (result === "NOT_FOUND") {
            return res.status(404).json({ message: "Favorito não encontrado" })
        }

        if (result === "COUNTRY_NOT_FOUND") {
            return res.status(404).json({ message: "País não encontrado" })
        }

        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Erro ao atualizar favorito" })
    }
}


const deleteFavorite = async (req, res) => {
    const { id } = req.params

    try {
        const wasDeleted = await deleteFavoriteCountry(id)

        if (!wasDeleted) {
            return res.status(404).json({ message: "Favorito não encontrado" })
        }

        res.status(204).send()
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Erro ao excluir favorito" })
    }
}

export { createFavorite, getFavorites, getFavoriteByIdController, updateFavorite ,deleteFavorite}