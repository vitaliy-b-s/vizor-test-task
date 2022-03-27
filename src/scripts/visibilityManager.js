const cardNumberInputs = document.querySelectorAll(".card_number_part");

export function toggleCardEditorVisibility() {
  document
    .querySelector(".new_card_editor_container")
    .classList.toggle("invisible");
}

export function showErrorMessage() {
  document.querySelector(".error_message").classList.remove("invisible");
  cardNumberInputs.forEach((input) => input.classList.add("error"));
}

export function hideError() {
  document.querySelector(".error_message").classList.add("invisible");
  cardNumberInputs.forEach((input) => input.classList.remove("error"));
}

export function toggleDeleteConfirmationVisibility() {
  document
    .querySelector(".delete_popup_container")
    .classList.toggle("invisible");
}
