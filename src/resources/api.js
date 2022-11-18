import axios from 'axios';
const fetch = require('node-fetch');

export function login(url, token, type) {
    return new Promise((resolve, reject) => {

        const body =
        {
            "credential": token,
            "type": "bearer",
        };

        var responseClone; // 1
        fetch(url, {
            method: 'post',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(function (response) {
                responseClone = response.clone(); // 2
                return response.json();
            })
            .then(function (data) {
                console.log(' ');
                console.log(data);
                console.log(' ');
                resolve(data);
                // Do something with data
            }, function (rejectionReason) { // 3
                console.log('Error parsing JSON from response:', rejectionReason, responseClone); // 4
                responseClone.text() // 5
                    .then(function (bodyText) {
                        console.log('Received the following instead of valid JSON:', bodyText); // 6
                    });
            });



        // fetch(url, {
        //     method: 'post',
        //     body: JSON.stringify(body),
        //     headers: { 'Content-Type': 'application/json' }
        // }).then(res => res.json())
        //     .then(json => {
        //         console.log(' ');
        //         console.log(json);
        //         console.log(' ');
        //         resolve(json);
        //     })
        //     .catch(err => {
        //         console.log('error');
        //         console.log(err);
        //         reject(err)
        //     })

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
