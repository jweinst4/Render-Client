import axios from 'axios';
const fetch = require('node-fetch');

export function login(url, token, type) {
    return new Promise((resolve, reject) => {
        const body =
        {
            "credential": token,
            "type": "bearer",
        };

        fetch(url, {
            method: 'post',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json())
            .then(json => {
                console.log(' ');
                console.log(json);
                console.log(' ');
                resolve(json);
            })
            .catch(err => {
                console.log('error');
                console.log(err.response.data)
                reject(err)
            })

        // axios({
        //     url: url,
        //     method: "POST",
        //     data: {
        //         "credential": token,
        //         "type": "bearer",
        //         headers: {
        //             "Content-type": "application/json; charset=UTF-8",
        //         }
        //     },
        // })
        //     .then(res => {
        //         console.log('res');
        //         console.log(res);
        //         resolve(res)
        //     })
        //     .catch(err => {
        //         console.log('error');
        //         console.log(err.response.data)
        //         reject(err)
        //     })
    })
}
