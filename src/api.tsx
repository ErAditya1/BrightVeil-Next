import axios from 'axios';

export const API_URL = process.env.NODE_ENV==="production" ? 'https://' : 'http://localhost:8000/api'


const createInstance = (baseURL:string)=>{
   
    return axios.create({
        baseURL: baseURL,
        headers: {
            'Content-Type': 'application/json',
        }
    })
}

export default createInstance(API_URL)
