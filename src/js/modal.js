const toggleModal = selector => {
  const modal = document.querySelector(selector);
  if (modal) {
    modal.classList.toggle('is-hidden');
  }
};

const modalMap = {
  'dashboard-add-client': '.add-client-modal',
  'dashboard-search-client': '.search-client-modal',
  'dashboard-clients-list': '.clients-list-modal',
  'dashboard-map': '.map-modal',
};

// Открытие модалок

document.querySelector('.nav-buttons').addEventListener('click', event => {
  const button = event.target.closest('.dashboard-button');
  if (!button) return;

  for (const className of button.classList) {
    if (modalMap[className]) {
      toggleModal(modalMap[className]);
      break;
    }
  }
});

// Закрытие модалок

document.querySelectorAll('.btn-exit ').forEach(btn => {
  btn.addEventListener('click', () => {
    const modal = btn.closest('.backdrop');
    if (modal) {
      modal.classList.add('is-hidden');
    }
  });
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    document.querySelectorAll('.backdrop').forEach(modal => {
      modal.classList.add('is-hidden');
    });
  }
});
