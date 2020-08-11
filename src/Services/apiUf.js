import axios from 'axios'

const apiUf = axios.create({
    baseURL: 'https://servicodados.ibge.gov.br/api/v1/localidades'
})

export default apiUf