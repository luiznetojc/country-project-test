if (getToken()) {
    window.location.href = 'index.html'
}

const errorMessageEl = document.getElementById('error-message')
const successMessageEl = document.getElementById('success-message')

function showError(message) {
    successMessageEl.classList.remove('show')
    errorMessageEl.textContent = message
    errorMessageEl.classList.add('show')
}

function showSuccess(message) {
    errorMessageEl.classList.remove('show')
    successMessageEl.textContent = message
    successMessageEl.classList.add('show')
}

function hideMessages() {
    errorMessageEl.classList.remove('show')
    successMessageEl.classList.remove('show')
}

function switchTab(tab) {
    hideMessages()

    const isLogin = tab === 'login'

    document.getElementById('tab-login').classList.toggle('active', isLogin)
    document.getElementById('tab-register').classList.toggle('active', !isLogin)
    document.getElementById('login-form').classList.toggle('active', isLogin)
    document.getElementById('register-form').classList.toggle('active', !isLogin)
}

document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault()
    hideMessages()

    const email = document.getElementById('login-email').value
    const password = document.getElementById('login-password').value

    try {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })

        const data = await response.json()

        if (!response.ok) {
            showError(data.message || 'Não foi possível entrar. Confira seu email e senha.')
            return
        }

        saveToken(data.access_token)
        window.location.href = 'index.html'

    } catch (error) {
        showError('Não foi possível conectar à API. Verifique se o servidor está rodando.')
    }
})

document.getElementById('register-form').addEventListener('submit', async (event) => {
    event.preventDefault()
    hideMessages()

    const name = document.getElementById('register-name').value
    const email = document.getElementById('register-email').value
    const password = document.getElementById('register-password').value

    try {
        const response = await fetch(`${API_BASE_URL}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        })

        const data = await response.json()

        if (!response.ok) {
            const message = Array.isArray(data.message) ? data.message.join(', ') : data.message
            showError(message || 'Não foi possível criar a conta.')
            return
        }

        document.getElementById('register-form').reset()
        switchTab('login')
        showSuccess('Conta criada com sucesso! Agora é só entrar.')

    } catch (error) {
        showError('Não foi possível conectar à API. Verifique se o servidor está rodando.')
    }
})
