const modal = document.querySelector('.backdrop');

const modalBtnOpen = document.querySelector('.dashboard-button');
const modalBtnClose = document.querySelector('.add-client__btn-close');

const toggleModal = () => {
  modal.classList.toggle('is-hidden');
};

modalBtnOpen.addEventListener('click', toggleModal);
modalBtnClose.addEventListener('click', toggleModal);
