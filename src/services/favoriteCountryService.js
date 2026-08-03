import { searchCountryByName } from "./countryService.js"
import { createCountry, getAllCountries, getCountryById ,getCountryByName,updateCountry} from "../repositories/FavoriteCountryRepository.js"


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

const updateFavoriteCountry = async (id, countryName) => {
    const existingRecord = await new Promise((resolve, reject) => {
        getCountryById(id, (error, record) => {
            if (error) reject(error)
            else resolve(record)
        })
    })

    if (!existingRecord) {
        return "NOT_FOUND"
    }

    const result = await searchCountryByName(countryName)
    const countries = result.data.objects

    if (countries.length === 0) {
        return "COUNTRY_NOT_FOUND"
    }

    const country = countries[0]

    const countryData = {
        name: country.names.common,
        capital: country.capitals?.[0]?.name || null,
        region: country.region,
        population: country.population
    }

    return new Promise((resolve, reject) => {
        updateCountry(id, countryData, (error, updatedRecord) => {
            if (error) reject(error)
            else resolve(updatedRecord)
        })
    })
}


export { saveFavoriteCountry, listFavoriteCountries, getFavoriteById,updateFavoriteCountry}