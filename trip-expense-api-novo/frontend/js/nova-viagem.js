const token = requireAuth()
const errorMessageEl = document.getElementById('error-message')

document.getElementById('trip-form').addEventListener('submit', async (event) => {
    event.preventDefault()
    errorMessageEl.classList.remove('show')


    const body = {
    title: document.getElementById('title').value,
    destination: document.getElementById('destination').value,
    startDate: document.getElementById('start-date').value,
    endDate: document.getElementById('end-date').value
}

    const response = await apiFetch('/trips', {
        method: 'POST',
        body: JSON.stringify(body)
    })

    if (!response) return // já foi redirecionado pro login

    if (!response.ok) {
        const data = await response.json()
        const message = Array.isArray(data.message) ? data.message.join(', ') : data.message
        errorMessageEl.textContent = message || 'Não foi possível salvar a viagem.'
        errorMessageEl.classList.add('show')
        return
    }

    window.location.href = 'index.html'
})
