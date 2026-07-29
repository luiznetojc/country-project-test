import { searchCountryByName } from "../services/countryService.js";

const getCountry = async (req,res) =>{
    
    const  { name } = req.params


    try {
        const dataCountry = await searchCountryByName(name)
        const country = dataCountry.data.objects
        
        if (country.length === 0 ){
            return res.status(404).json({mensagem: "Pais nao encontrado"})
        }

        res.status(200).json(dataCountry)

    } catch(error){
        if(error.response && error.response.status === 404){
            return res.status(404).json({ mensagem: "País não foi encontrado!"})
        }else{
            res.status(500).json({mensagem: "Erro ao consultar a API dos Países"})
        }
    }

}

export {  getCountry  }