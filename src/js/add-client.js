const addClientForm = document.querySelector('.add-client__form');

addClientForm.addEventListener('submit', evt => {
  evt.preventDefault();

  const formData = {};
  for (let element of addClientForm.elements) {
    if (element.name) {
      formData[element.name] = element.value.trim();
    }
  }

  formData.id = Date.now().toString();

  const currentData = JSON.parse(localStorage.getItem('clientData') || '[]');
  currentData.push(formData);
  localStorage.setItem('clientData', JSON.stringify(currentData));

  addClientForm.reset();
});
