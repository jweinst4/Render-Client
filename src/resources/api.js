import axios from 'axios';

export function login(url, token, type) {
    return new Promise((resolve, reject) => {
        axios({
            url: url,
            method: "POST",
            data: {
                "credential": token,
                "type": "bearer"
            }
        })
            .then(res => {
                console.log('res');
                console.log(res);
                resolve(res)
            })
            .catch(err => {
                console.log('error');
                console.log(err.response.data)
                reject(err)
            })
    })
}
