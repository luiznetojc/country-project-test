import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()


const searchCountryByName = async (name) => {
    const resp = await axios.get(`https://api.restcountries.com/countries/v5/names.common/${name}`,{
        headers: {
            Authorization: `Bearer ${process.env.RESTCOUNTRIES_API_KEY}`
        }
    })
    return resp.data
}

export { searchCountryByName }