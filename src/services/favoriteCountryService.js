import { searchCountryByName } from "./countryService.js"
import { createCountry } from "../repositories/FavoriteCountryRepository.js"

const saveFavoriteCountry = async (countryName) => {
    const result = await searchCountryByName(countryName)
    const countries = result.data.objects

    if (countries.length === 0) {
        return null 
    }

    const country = countries[0]

    const countryData = {
        name: country.names.common,
        capital: country.capitals?.[0]?.name || null,
        region: country.region,
        population: country.population
    }
    console.log(countryData)

    return new Promise((resolve, reject) => {
        createCountry(countryData, (error, savedRecord) => {
            if (error) {
                reject(error)
            } else {
                resolve(savedRecord)
            }
        })
    })
}

export { saveFavoriteCountry }