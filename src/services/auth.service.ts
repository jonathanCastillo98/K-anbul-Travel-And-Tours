import { BASE_URL } from "../models"
const tokenUrl = `${BASE_URL}/auth/login`
export const getUserToken = (username: string, password: string) => {

    const data = {
        username: username,
        password: password,
    }
    const result = fetch(tokenUrl, {
        method: 'POST',
        mode:"cors",
        credentials: "include",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(res => res.json())

    return result
}
