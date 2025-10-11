// Управление редактированием клиента

import { updateClient } from './clientStorage.js';

let currentOnUpdate = null;

export function openEditModal(client, onUpdate) {
  const modal = document.querySelector('.edit-client-modal');
  if (!modal) {
    return;
  }

  modal.classList.remove('is-hidden');

  currentOnUpdate = typeof onUpdate === 'function' ? onUpdate : null;

  const idInput = modal.querySelector('#edit-id');
  const nameInput = modal.querySelector('#edit-name');
  const surnameInput = modal.querySelector('#edit-surname');
  const phoneInput = modal.querySelector('#edit-phone');
  const locationInput = modal.querySelector('#edit-location');
  const addressInput = modal.querySelector('#edit-address');

  if (
    !idInput ||
    !nameInput ||
    !surnameInput ||
    !phoneInput ||
    !locationInput ||
    !addressInput
  ) {
    return;
  }

  idInput.value = client.id;
  nameInput.value = client.name;
  surnameInput.value = client.surname;
  phoneInput.value = client.phone;
  locationInput.value = client.location || '';
  addressInput.value = client.address || '';
}

export function setupEditForm() {
  const form = document.querySelector('.edit-client-form');
  if (!form) {
    return;
  }

  form.addEventListener('submit', event => {
    event.preventDefault();

    const updatedClient = {
      id: form.querySelector('#edit-id')?.value.trim() || '',
      name: form.querySelector('#edit-name')?.value.trim() || '',
      surname: form.querySelector('#edit-surname')?.value.trim() || '',
      phone: form.querySelector('#edit-phone')?.value.trim() || '',
      location: form.querySelector('#edit-location')?.value.trim() || '',
      address: form.querySelector('#edit-address')?.value.trim() || '',
    };

    updateClient(updatedClient);

    const modal = document.querySelector('.edit-client-modal');
    if (modal) modal.classList.add('is-hidden');

    if (typeof currentOnUpdate === 'function') {
      currentOnUpdate(updatedClient);
    }
  });
}
