import { createCardNode } from "./cardProcessor";
import { Card } from "./card";
import {
  showErrorMessage,
  hideError,
  toggleCardEditorVisibility,
  toggleDeleteConfirmationVisibility,
} from "./visibilityManager";

import "../styles/mainstyle.scss";

import { isValid, getCreditCardNameByNumber } from "creditcard.js";

const cards = JSON.parse(window.localStorage.getItem("cards")) || [];
const cardNumberInputs = document.querySelectorAll(".card_number_part");

function addCard() {
  let number = "";
  cardNumberInputs.forEach((input) => {
    number = number + input.value;
  });
  if (
    isValid(number) &&
    (getCreditCardNameByNumber(number) === "Visa" ||
      getCreditCardNameByNumber(number) === "Mastercard")
  ) {
    const comment = document.querySelector(".card_comment_input").value;
    const type = getCreditCardNameByNumber(number);
    const card = new Card(number, type, comment);
    cards.push(card);
    createCardList(cards);
    syncCardList();
    toggleCardEditorVisibility();
    clearForm();
  } else {
    showErrorMessage();
  }
}

function createCardList(cards) {
  if (cards) {
    const list = document.querySelector(".cards_list");
    list.innerHTML = null;
    cards.forEach((card) => {
      list.appendChild(createCardNode(card));
    });
    document
      .querySelectorAll(".delete_card_button")
      .forEach((button, index) => {
        button.addEventListener("click", () => {
          toggleDeleteConfirmationVisibility();
          addListenerToDeleteButton(index);
        });
      });
  }
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

function addListenerToDeleteButton(index) {
  document.querySelector(".approve_delete").addEventListener("click", () => {
    deleteCard(index);
  });
}

function clearForm() {
  cardNumberInputs.forEach((input) => (input.value = ""));
  document.querySelector(".card_comment_input").value = "";
  document.querySelector(".error_message").classList.add("invisible");
}

function deleteCard(index) {
  cards.splice(index, 1);
  createCardList(cards);
  syncCardList();
  toggleDeleteConfirmationVisibility();
}

function syncCardList() {
  const cardsJSON = JSON.stringify(cards);
  window.localStorage.setItem("cards", cardsJSON);
}

document.addEventListener("DOMContentLoaded", () => {
  createCardList(cards);
});
document.querySelector(".open_editor_button").addEventListener("click", () => {
  toggleCardEditorVisibility();
  addFocusListener();
});
document.querySelector(".close_card_editor").addEventListener("click", () => {
  toggleCardEditorVisibility();
  clearForm();
  hideError();
});
document.querySelector(".deny_delete").addEventListener("click", () => {
  toggleDeleteConfirmationVisibility();
});
document.querySelector(".add_card_button").addEventListener("click", (e) => {
  e.preventDefault();
  addCard();
});
