import axios from 'axios';
const url = process.env.REACT_APP_SERVER_URL

export function login(token, type) {
    return new Promise((resolve, reject) => {
        const data =
        {
            "credential": token,
            "type": type,
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

export async function getUserById(id, accessToken) {
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

export function createLeague(accessToken, userId, leagueName) {
    return new Promise((resolve, reject) => {
        axios({
            url: url + "api/user/createleague",
            method: "POST",
            headers: {
                "x-access-token": accessToken
            },
            data: {
                "userId": userId,
                "leagueName": leagueName
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

export function joinLeague(accessToken, userId, leagueId) {
    return new Promise((resolve, reject) => {
        axios({
            url: url + "api/user/joinleague",
            method: "POST",
            headers: {
                "x-access-token": accessToken
            },
            data: {
                "userId": userId,
                "leagueId": leagueId
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
