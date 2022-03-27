import visa from "../assets/images/visa.png";
import mastercard from "../assets/images/mastercard.png";

export function createCardNode(card) {
  const cardListItemContainer = document.createElement("div");
  const cardListItem = document.createElement("li");
  const cardImage = document.createElement("img");
  const cardNumber = document.createElement("div");
  const cardComment = document.createElement("div");
  const deleteButton = document.createElement("button");
  const horizontalLine = document.createElement("hr");

  cardListItemContainer.classList.add("card_container");
  cardListItem.classList.add("card");
  cardImage.classList.add("card_image");
  cardNumber.classList.add("card_number");
  cardComment.classList.add("card_comment");
  deleteButton.classList.add("delete_card_button");
  horizontalLine.classList.add("horizontal_line");

  cardImage.src = card.type === "Visa" ? visa : mastercard;

  const splitNumber = card.number.match(/.{1,4}/g);

  cardNumber.innerText = splitNumber.join(" ");
  cardComment.innerText = card.comment;
  deleteButton.innerHTML = "&#10060;";

  cardListItem.appendChild(cardImage);
  cardListItem.appendChild(cardNumber);
  cardListItemContainer.appendChild(cardListItem);
  cardListItemContainer.appendChild(cardComment);
  cardListItemContainer.appendChild(deleteButton);
  cardListItemContainer.appendChild(horizontalLine);

  return cardListItemContainer;
}
