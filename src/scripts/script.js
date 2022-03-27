import { createCardNode } from "./cardProcessor";
import { Card } from "./card";

import "../styles/scss.scss";

import { isValid, getCreditCardNameByNumber } from "creditcard.js";

let cardToDeleteIndex;

const cards = JSON.parse(window.localStorage.getItem("cards")) || [];
const cardNumberInputs = document.querySelectorAll(".card_number_part");

function addCard() {
  let number = "";
  cardNumberInputs.forEach((input) => {
    number = number + input.value;
  });
  const isCardValid = isValid(number);
  if (isCardValid) {
    const comment = document.querySelector(".card_comment_input").value;
    const type = getCreditCardNameByNumber(number);
    const card = new Card(number, type, comment);
    cards.push(card);
    createCardList(cards);
    syncCardList();
    manageCardEditorVisibility();
    clearForm();
  } else {
    showErrorMessage();
  }
}

function createCardList(cards) {
  if (cards) {
    const list = document.querySelector(".cards_list");
    list.innerHTML = null;
    cards.forEach((card, index) => {
      list.appendChild(createCardNode(card, index));
    });
  }
}

function manageCardEditorVisibility() {
  document
    .querySelector(".new_card_editor_container")
    .classList.toggle("invisible");
}

function addFocusListener() {
  cardNumberInputs.forEach((input, index) => {
    input.addEventListener("input", (e) => {
      if (e.target.value.length === 4 && index !== 3) {
        input.nextElementSibling.focus();
      }
    });
    input.addEventListener("focus", () => {
      cardNumberInputs.forEach((input) => {
        input.classList.remove("error");
      });
    });
  });
}

function clearForm() {
  cardNumberInputs.forEach((input) => (input.value = ""));
  document.querySelector(".card_comment_input").value = "";
  document.querySelector(".error_message").classList.add("invisible");
}

function showErrorMessage() {
  document.querySelector(".error_message").classList.remove("invisible");
  cardNumberInputs.forEach((input) => input.classList.add("error"));
}

function hideError() {
  document.querySelector(".error_message").classList.add("invisible");
  cardNumberInputs.forEach((input) => input.classList.remove("error"));
}

function deleteCard() {
  cards.splice(cardToDeleteIndex, 1);
  syncCardList();
  manageDeleteConfirmationVisibility();
}

function syncCardList() {
  createCardList(cards);
  const cardsJSON = JSON.stringify(cards);
  window.localStorage.setItem("cards", cardsJSON);
}

export function manageDeleteConfirmationVisibility() {
  document
    .querySelector(".delete_popup_container")
    .classList.toggle("invisible");
}

export function getDeletedCardIndex(index) {
  cardToDeleteIndex = index;
}

document.addEventListener("DOMContentLoaded", () => {
  createCardList(cards);
});
document.querySelector(".open_editor_button").addEventListener("click", () => {
  manageCardEditorVisibility();
  addFocusListener();
});
document.querySelector(".close_card_editor").addEventListener("click", () => {
  manageCardEditorVisibility();
  clearForm();
  hideError();
});
document.querySelector(".approve_delete").addEventListener("click", () => {
  deleteCard();
});
document.querySelector(".deny_delete").addEventListener("click", () => {
  manageDeleteConfirmationVisibility();
});
document.querySelector(".add_card_button").addEventListener("click", (e) => {
  e.preventDefault();
  addCard();
});
