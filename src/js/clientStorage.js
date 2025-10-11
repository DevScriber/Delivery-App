// Управление клиентами в localStorage

export function getClients() {
  return JSON.parse(localStorage.getItem('clientData')) || [];
}

export function saveClients(clients) {
  localStorage.setItem('clientData', JSON.stringify(clients));
}

export function updateClient(updatedClient) {
  const clients = getClients();
  const index = clients.findIndex(c => c.id === updatedClient.id);
  if (index !== -1) {
    clients[index] = updatedClient;
    saveClients(clients);
  }
}

export function deleteClient(id) {
  const clients = getClients();
  const updated = clients.filter(client => String(client.id) !== String(id));
  localStorage.setItem('clientData', JSON.stringify(updated));
}
