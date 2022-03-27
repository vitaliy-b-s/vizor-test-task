import visa from "../assets/images/visa.png";
import mastercard from "../assets/images/mastercard.png";
import {
  getDeletedCardIndex,
  manageDeleteConfirmationVisibility,
} from "./script";

export function createCardNode(card, index) {
  const cardListItem = document.createElement("li");
  const cardImage = document.createElement("img");
  const cardNumber = document.createElement("div");
  const cardComment = document.createElement("div");
  const deleteButton = document.createElement("button");
  const horizontalLine = document.createElement("hr")

  cardListItem.classList.add("card");
  cardImage.classList.add("card_image");
  cardNumber.classList.add("card_number");
  cardComment.classList.add("card_comment");
  deleteButton.classList.add("delete_card_button");
  horizontalLine.classList.add("horizontal_line")


  deleteButton.addEventListener("click", () => {
    manageDeleteConfirmationVisibility();
    getDeletedCardIndex(index);
  });

  deleteButton.classList.add("invisible");

  cardImage.src = card.type === "Visa" ? visa : mastercard;

  const splitNumber = card.number.match(/.{1,4}/g);

  cardNumber.innerText = splitNumber.join(" ");
  cardComment.innerText = card.comment;
  deleteButton.innerHTML = "&#10060;";

  cardListItem.appendChild(cardImage);
  cardListItem.appendChild(cardNumber);
  cardListItem.appendChild(cardComment);
  cardListItem.appendChild(deleteButton);
  cardListItem.appendChild(horizontalLine);


  return cardListItem;
}
