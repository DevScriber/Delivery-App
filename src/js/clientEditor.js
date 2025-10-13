// Управление редактированием клиента

import { updateClient } from './clientStorage.js';

let currentOnUpdate = null;

export function openEditModal(client, onUpdate) {
  const modal = document.querySelector('.edit-client-modal');
  if (!modal) return;

  const idInput = modal.querySelector('#edit-id');
  const nameInput = modal.querySelector('#edit-name');
  const surnameInput = modal.querySelector('#edit-surname');
  const phoneInput = modal.querySelector('#edit-phone');
  const countryInput = modal.querySelector('#country');
  const cityInput = modal.querySelector('#edit-city');
  const addressInput = modal.querySelector('#edit-address');
  const coordinatesInput = modal.querySelector('#coordinates');

  if (
    !idInput ||
    !nameInput ||
    !surnameInput ||
    !phoneInput ||
    !countryInput ||
    !cityInput ||
    !addressInput ||
    !coordinatesInput
  )
    return;

  // Очистка
  idInput.value = '';
  nameInput.value = '';
  surnameInput.value = '';
  phoneInput.value = '';
  countryInput.value = '';
  cityInput.value = '';
  addressInput.value = '';
  coordinatesInput.value = '';

  // Заполнение
  idInput.value = client.id || '';
  nameInput.value = client.name || '';
  surnameInput.value = client.surname || '';
  phoneInput.value = client.phone || '';
  countryInput.value = client.country || 'Украина';
  cityInput.value = client.city || '';
  addressInput.value = client.address || '';
  coordinatesInput.value = client.coordinates || '';

  currentOnUpdate = typeof onUpdate === 'function' ? onUpdate : null;

  modal.classList.remove('is-hidden');
}

export function setupEditForm() {
  const form = document.querySelector('.edit-client-form');
  if (!form) return;

  form.addEventListener('submit', event => {
    event.preventDefault();

    const updatedClient = {
      id: form.querySelector('#edit-id')?.value.trim() || '',
      name: form.querySelector('#edit-name')?.value.trim() || '',
      surname: form.querySelector('#edit-surname')?.value.trim() || '',
      phone: form.querySelector('#edit-phone')?.value.trim() || '',
      country: form.querySelector('#country')?.value.trim() || '',
      city: form.querySelector('#edit-city')?.value.trim() || '',
      address: form.querySelector('#edit-address')?.value.trim() || '',
      coordinates: form.querySelector('#coordinates')?.value.trim() || '',
    };

    updateClient(updatedClient);

    const modal = document.querySelector('.edit-client-modal');
    if (modal) modal.classList.add('is-hidden');

    if (typeof currentOnUpdate === 'function') {
      currentOnUpdate(updatedClient);
    }
  });
}

const addBtn = document.querySelector('.add-coordinates-btn');
if (addBtn) {
  addBtn.onclick = () => {
    navigator.geolocation.getCurrentPosition(
      pos => {
        const modal = document.querySelector('.edit-client-modal');
        const coordsInput = modal?.querySelector('#coordinates');
        if (coordsInput) {
          coordsInput.value = `${pos.coords.latitude}, ${pos.coords.longitude}`;
          console.log('Координаты установлены:', coordsInput.value);
        } else {
          console.warn('Поле #coordinates не найдено');
        }
      },
      err => {
        console.error('Ошибка геолокации:', err);
      }
    );
  };
}
