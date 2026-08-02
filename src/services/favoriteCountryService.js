import { searchCountryByName } from "./countryService.js"
import { createCountry, getAllCountries, getCountryById ,getCountryByName} from "../repositories/FavoriteCountryRepository.js"


const saveFavoriteCountry = async (countryName) => {
    const result = await searchCountryByName(countryName)
    const countries = result.data.objects

    if (countries.length === 0) {
        return null
    }

    const country = countries[0]
    const officialName = country.names.common

    const alreadyExists = await new Promise((resolve, reject) => {
        getCountryByName(officialName, (error, record) => {
            if (error) reject(error)
            else resolve(record)
        })
    })

    if (alreadyExists) {
        return "DUPLICATE"
    }

    const countryData = {
        name: officialName,
        capital: country.capitals?.[0]?.name || null,
        region: country.region,
        population: country.population
    }

    return new Promise((resolve, reject) => {
        createCountry(countryData, (error, savedRecord) => {
            if (error) reject(error)
            else resolve(savedRecord)
        })
    })
}


const listFavoriteCountries = () => {
    return new Promise((resolve, reject) => {
        getAllCountries((error, savedRecords) => {
            if (error) {
                reject(error)
            } else {
                resolve(savedRecords)
            }
        })
    })
}

const getFavoriteById = (id) => {
    return new Promise((resolve, reject) => {
        getCountryById(id, (error, registerID) => {
            if (error) {
                reject(error)
            } else {
                resolve(registerID)
            }
        })
    })
}



export { saveFavoriteCountry, listFavoriteCountries, getFavoriteById}