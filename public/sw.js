self.addEventListener('push', (event) => {
  let data = { title: 'Flight update', body: '' }
  try {
    data = event.data ? event.data.json() : data
  } catch {
    // non-JSON payload, fall back to defaults
  }
  event.waitUntil(self.registration.showNotification(data.title, { body: data.body }))
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  event.waitUntil(self.clients.openWindow('/'))
})
