import axios from 'axios';

export function login(url, token, type) {
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
            url: url,
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
