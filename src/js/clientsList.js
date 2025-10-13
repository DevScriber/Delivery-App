import { getClients, deleteClient } from './clientStorage.js';
import { openEditModal } from './clientEditor.js';

export function setupClientsList() {
  const openButton = document.querySelector('.dashboard-clients-list');
  const modal = document.querySelector('.clients-list-modal');
  const listContainer = modal?.querySelector('.clients-list__allClients');
  const referenceActions = document.querySelector('.action-btn-group');

  if (!openButton || !modal || !listContainer || !referenceActions) {
    return;
  }

  openButton.addEventListener('click', () => {
    renderClientsList(listContainer, referenceActions);
  });
}

function renderClientsList(listContainer, referenceActions) {
  const clients = getClients();
  listContainer.innerHTML = '';

  if (clients.length === 0) {
    listContainer.innerHTML =
      '<li><p class="clients-list__no-clients">Клиенты не найдены.</p></li>';
    return;
  }

  clients.forEach((client, index) => {
    const listItem = document.createElement('li');
    listItem.className = 'clients-list__client';

    const dataBlock = document.createElement('div');
    dataBlock.className = 'data-content';
    dataBlock.innerHTML = `
    <p><strong>№</strong> ${index + 1}</p>
      <p><strong>ID:</strong> ${client.id}</p>
      <p><strong>Имя:</strong> ${client.name}</p>
      <p><strong>Фамилия:</strong> ${client.surname}</p>
      <p><strong>Телефон:</strong> ${client.phone}</p>
      <p><strong>Страна:</strong> ${client.country}</p>
      <p><strong>Город/село:</strong> ${client.city || ''}</p>
      <p><strong>Адрес:</strong> ${client.address || ''}</p>
      <p><strong>Координаты:</strong> ${client.coordinates}</p>
    `;

    const actions = referenceActions.cloneNode(true);
    const editBtn = actions.querySelector('.change-info');
    const mapBtn = actions.querySelector('.map');
    const deleteBtn = actions.querySelector('.cancel');

    editBtn.onclick = () => {
      openEditModal(client, updated => {
        Object.assign(client, updated);
        dataBlock.innerHTML = `
          <p><strong>ID:</strong> ${updated.id}</p>
          <p><strong>Имя:</strong> ${updated.name}</p>
          <p><strong>Фамилия:</strong> ${updated.surname}</p>
          <p><strong>Телефон:</strong> ${updated.phone}</p>
          <p><strong>Страна:</strong> ${updated.country}</p>
          <p><strong>Город/село:</strong> ${updated.city || ''}</p>
          <p><strong>Адрес:</strong> ${updated.address || ''}</p>
          <p><strong>Координаты:</strong> ${updated.coordinates}</p>
        `;
      });
    };

    if (mapBtn) {
      mapBtn.onclick = () => {
        const coords = client.coordinates?.trim();
        if (!coords) {
          alert('У клиента нет координат');
          return;
        }

        const [lat, lng] = coords.split(',').map(Number);
        if (isNaN(lat) || isNaN(lng)) {
          alert('Неверный формат координат');
          return;
        }

        const url = `https://www.google.com/maps?q=${lat},${lng}`;
        window.open(url, '_blank');
      };
    }

    deleteBtn.onclick = () => {
      if (confirm('Удалить клиента?')) {
        deleteClient(client.id);
        listItem.remove();
      }
    };

    listItem.append(dataBlock, actions);
    listContainer.appendChild(listItem);
  });
}
