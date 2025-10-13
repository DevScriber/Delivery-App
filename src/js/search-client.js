import { getClients } from './clientStorage.js';
import { openEditModal } from './clientEditor.js';
import { deleteClient } from './clientStorage.js';

export function setupSearchClient() {
  const modal = document.querySelector('.search-client-modal');
  if (!modal) return;

  const form = modal.querySelector('.dashboard-modal__form');
  const resultBlock = modal.querySelector('.search-client-result');
  const dataContent = modal.querySelector('.data-content');

  form.addEventListener('submit', event => {
    event.preventDefault();

    const id = form.id.value.trim();
    const name = form.name.value.trim().toLowerCase();
    const surname = form.surname.value.trim().toLowerCase();
    const phone = form.phone.value.trim();

    const storedClients = getClients();

    const foundClient = storedClients.find(
      client =>
        (!id || String(client.id) === id) &&
        (!name || client.name.toLowerCase() === name) &&
        (!surname || client.surname.toLowerCase() === surname) &&
        (!phone || client.phone === phone)
    );

    const renderClient = client => {
      dataContent.innerHTML = `
        <p><strong>ID:</strong> ${client.id}</p>
        <p><strong>Имя:</strong> ${client.name}</p>
        <p><strong>Фамилия:</strong> ${client.surname}</p>
        <p><strong>Телефон:</strong> ${client.phone}</p>
        <p><strong>Страна:</strong> ${client.country || ''}</p>
        <p><strong>Город/Село:</strong> ${client.city || ''}</p>
        <p><strong>Адрес:</strong> ${client.address || ''}</p>
        <p><strong>Координаты:</strong> ${client.coordinates || ''}</p>
      `;
    };

    if (foundClient) {
      renderClient(foundClient);
      resultBlock.classList.remove('is-hidden');

      const editBtn = resultBlock.querySelector('.change-info');
      const deleteBtn = resultBlock.querySelector('.cancel');

      if (editBtn) {
        editBtn.onclick = () => {
          openEditModal(foundClient, updatedClient => {
            Object.assign(foundClient, updatedClient);
            renderClient(updatedClient);
          });
        };
      }

      if (deleteBtn) {
        deleteBtn.onclick = () => {
          if (confirm('Удалить этого клиента?')) {
            deleteClient(foundClient.id);
            dataContent.innerHTML = `<p>Клиент удалён</p>`;
          }
        };
      }
    } else {
      dataContent.innerHTML = `<p>Клиент не найден</p>`;
      resultBlock.classList.remove('is-hidden');
    }

    form.reset();
  });
}
