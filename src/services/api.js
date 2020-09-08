import axios from 'axios'

const api = axios.create({
    baseURL: 'https://backend-ss-heroku.herokuapp.com/', // URL de PRODUÇÃO
    // baseURL: 'http://localhost:8080', // URL de DESENVOLVIMENTO
    // headers: {
    //     'Access-Control-Allow-Origin': 'http://localhost:3000',
    //     'Access-Control-Allow-Methods': 'POST',
    //     'Access-Control-Allow-Headers': 'Content-Type, Accept, Origin, Authorization',
    // },
    //  
    // headers: {   
    //     'Access-Control-Allow-Origin': 'http://localhost:3000',
    // }
})

const success = res => res
const error = err => {

    if (401 === err.response.status) {
        window.location = '/Signin'
        // location.assign('/')
    } else {

        return Promise.reject(err)
    }
}

axios.interceptors.response.use(success, error)

export default api