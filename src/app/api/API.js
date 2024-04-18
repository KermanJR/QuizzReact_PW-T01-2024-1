import axios from 'axios'
const URL_API = 'http://localhost:3001/api'

export default class APIQUIZZ{

    static async register(data){
        try {
            const response = await axios.post(`${URL_API}/register`, data, {
                headers:{
                    "Content-Type": "application/json"
                }
            })
            return response.data;
        }catch(err){
            return err;
        }
    }

    static async login(data){
        try {
            const response = await axios.post(`${URL_API}/login`, data, {
                headers:{
                    "Content-Type": "application/json"
                }
            })
            return response.data;
        }catch(err){
            return err;
        }
    }
}
