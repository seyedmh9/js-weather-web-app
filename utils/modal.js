const modalContainer = document.querySelector(".modal-container");
const modalContent = document.querySelector(".modal-content").lastChild;
const citynameInput = document.querySelector(".name-input");

const showModal = (data) => {
  modalContent.textContent = data;
  modalContainer.style.display = "flex";
};

const offModal = (data) => {
  modalContainer.style.display = "none";
  citynameInput.value = "";
};

export { offModal, showModal };
