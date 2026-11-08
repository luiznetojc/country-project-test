requireAuth()


const urlParams = new URLSearchParams(window.location.search)
const tripId = urlParams.get('id')

const container = document.getElementById('trip-container')

async function loadTrip() {
    if (!tripId) {
        container.innerHTML = '<div class="empty-state">Nenhuma viagem informada.</div>'
        return
    }

    const response = await apiFetch(`/trips/${tripId}`)
    if (!response) return 

    if (!response.ok) {
        container.innerHTML = '<div class="empty-state">Viagem não encontrada.</div>'
        return
    }

    const trip = await response.json()

    container.innerHTML = `
        <div class="trip-detail-card">
            <h1>${trip.title}</h1>
            <div class="destination">${trip.destination}</div>

            <div class="detail-row">
                <div class="detail-item">
                    <span>Data de Início</span>
                    <strong>${formatDate(trip.startDate)}</strong>
                </div>
                <div class="detail-item">
                    <span>Data de Fim</span>
                    <strong>${formatDate(trip.endDate)}</strong>
                </div>
            </div>

            <div class="expenses-section">
                <h2>Despesas</h2>
                <div class="expenses-placeholder">
                    O controle de despesas será implementado em um módulo futuro.
                </div>
            </div>
        </div>
    `
}

loadTrip()
