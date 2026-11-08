
const API_BASE_URL = 'http://localhost:3000'


function saveToken(token) {
    localStorage.setItem('token', token)
}


function getToken() {
    return localStorage.getItem('token')
}


function logout() {
    localStorage.removeItem('token')
    window.location.href = 'login.html'
}


function parseJwt(token) {
    try {
        const payloadBase64 = token.split('.')[1]
        const decoded = atob(payloadBase64.replace(/-/g, '+').replace(/_/g, '/'))
        return JSON.parse(decoded)
    } catch (error) {
        return null
    }
}


function requireAuth() {
    const token = getToken()

    if (!token) {
        window.location.href = 'login.html'
        return null
    }

    return token
}


async function apiFetch(path, options = {}) {
    const token = getToken()

    const headers = {
        'Content-Type': 'application/json',
        ...options.headers
    }

    if (token) {
        headers['Authorization'] = `Bearer ${token}`
    }

    const response = await fetch(`${API_BASE_URL}${path}`, {
        ...options,
        headers
    })

    if (response.status === 401) {
        logout()
        return null
    }

    return response
}


function formatDate(isoDate) {
    const date = new Date(isoDate)
    return date.toLocaleDateString('pt-BR')
}
