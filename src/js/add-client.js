// Логика добавления нового клиента и сохранения его данных в localStorage
import { setupCoordinatesButton } from './clientEditor.js';
import { getClients, saveClients } from './clientStorage.js';

export function setupAddClient() {
  const addClientForm = document.querySelector('.add-client__form');
  if (!addClientForm) return;

  addClientForm.addEventListener('submit', evt => {
    evt.preventDefault();

    const formData = {};
    for (let element of addClientForm.elements) {
      if (element.name) {
        formData[element.name] = element.value.trim();
      }
    }

    formData.id = Date.now().toString();

    const currentData = getClients();
    currentData.push(formData);
    saveClients(currentData);

    addClientForm.reset();
  });
}

setupCoordinatesButton(
  '.edit-client-modal',
  '#coordinates',
  '.add-coordinates-btn'
);
