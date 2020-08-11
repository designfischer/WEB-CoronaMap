import axios from 'axios'

const apiComercio = axios.create({
    baseURL: 'http://localhost:3333'
})

export default apiComercio