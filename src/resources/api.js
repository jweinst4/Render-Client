import axios from 'axios';
const url = process.env.REACT_APP_SERVER_URL

export function login(token, type) {
    return new Promise((resolve, reject) => {
        const data =
        {
            "credential": token,
            "type": type,
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Access-Control-Allow-Origin": "https://edh-league-client.onrender.com"
            }
        }
        axios({
            url: url + "api/auth/login",
            method: "POST",
            data: data,
        })
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                console.log('error');
                console.log(err.response.data)
                reject(err)
            })
    })
}

export function getUserById(id, accessToken) {
    return new Promise((resolve, reject) => {
        axios({
            url: url + "api/user/" + id,
            method: "GET",
            headers: {
                "access-control-allow-origin": "*",
                "Content-type": "application/json; charset=UTF-8",
                "x-access-token": accessToken
            }
        })
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                console.log('error');
                console.log(err.response.data)
                reject(err)
            })
    })
}
