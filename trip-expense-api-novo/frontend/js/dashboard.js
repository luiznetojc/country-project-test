
const token = requireAuth()

async function loadUserName() {
    const payload = parseJwt(token)

    if (!payload) return

    const response = await apiFetch(`/users/${payload.sub}`)
    if (!response || !response.ok) return

    const user = await response.json()
    document.getElementById('greeting').textContent = `Olá, ${user.name}`
}

async function loadTrips() {
    const container = document.getElementById('trips-container')

    const response = await apiFetch('/trips')
    if (!response) return 

    if (!response.ok) {
        container.innerHTML = '<div class="empty-state">Não foi possível carregar suas viagens.</div>'
        return
    }

    const trips = await response.json()

    if (trips.length === 0) {
        container.innerHTML = '<div class="empty-state">Você ainda não tem viagens cadastradas. Clique em "+ Nova Viagem" para começar!</div>'
        return
    }

    container.innerHTML = trips.map(trip => `
        <div class="trip-card" onclick="window.location.href='trip.html?id=${trip.id}'">
            <h3>${trip.title}</h3>
            <div class="destination">${trip.destination}</div>
            <div class="dates">${formatDate(trip.startDate)} — ${formatDate(trip.endDate)}</div>
        </div>
    `).join('')
}

loadUserName()
loadTrips()
