import axios from 'axios';

export function login(url, token, type) {
    return new Promise((resolve, reject) => {
        axios({
            url: url,
            method: "POST",
            data: {
                "credential": token,
                "type": type
            }
        })
            .then(res => {
                resolve(res)
            })
            .catch(err => reject(err))
    })
}
