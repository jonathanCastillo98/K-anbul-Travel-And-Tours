const tokenUrl = "http://localhost:3000/api/v1/auth/login"

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
