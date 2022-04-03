import visaImg from "../assets/images/visa.png";
import mastercardImg from "../assets/images/mastercard.png";
import deleteIcon from "../assets/images/delete.png";
import chip from "../assets/images/chip.png";

export class CardHolderView {
  constructor() {
    this.list = document.querySelector(".cards_list");
    this.openEditorButton = document.querySelector(".open_editor_button");
    this.closeCardEditorButton = document.querySelector(".close_card_editor");
    this.cardEditor = document.querySelector(".new_card_editor_container");
    this.cardNumberSections = document.querySelectorAll(".card_number_part");
    this.errorMessage = document.querySelector(".error_message");
    this.cardComment = document.querySelector(".card_comment_input");
    this.addCardButton = document.querySelector(".add_card_button");
    this.cardTemplate = document.querySelector("#card");
    this.warningMessage = document.querySelector(".warning_message");
    this.confirmationPopup = document.querySelector(".delete_popup_container");
    this.approveDeleteButton = document.querySelector(".approve_delete");
    this.denyDeleteButton = document.querySelector(".deny_delete");

    this.enteredNumber = [];
    this.numberToDelete = null;
    this.elementToDelete = null;

    this._initListeners();
  }

  _initListeners = () => {
    this.openEditorButton.addEventListener("click", () => {
      this._toggleVisibility(this.cardEditor);
    });

    this.closeCardEditorButton.addEventListener("click", () => {
      this._toggleVisibility(this.cardEditor);
      this.clearForm();
    });

    this.cardNumberSections.forEach((input, index) => {
      input.addEventListener("input", (e) => {
        if (e.target.value.length === 4 && index !== 3) {
          input.nextElementSibling.focus();
        }
      });
      input.addEventListener("focus", (e) => {
        e.currentTarget.value = "";
        this.toggleInputsError(true);
        this.hideWarningMessage();
      });
    });
    this.denyDeleteButton.addEventListener("click", () => {
      this.numberToDelete = null;
      this.elementToDelete = null;
      this._toggleVisibility(this.confirmationPopup);
    });
  };

  _toggleVisibility = (element) => {
    element.classList.toggle("invisible");
  };

  //binding card check on each user's type
  bindCardNumberCheckOnInput = (handler) => {
    this.cardNumberSections.forEach((section, index) => {
      section.addEventListener("input", (event) => {
        if (event.currentTarget.value.length <= 1) return;
        this.enteredNumber[index] = event.target.value;
        handler(this.enteredNumber.join(""));
      });
    });
  };

  bindCommentInput = (handler) => {
    this.cardComment.addEventListener("input", (event) => {
      handler(event.currentTarget.value);
    });
  };

  bindCardCheckOnAdd = (handler) => {
    this.addCardButton.addEventListener("click", () => {
      handler(this.enteredNumber.join(""));
    });
  };

  bindDeleteCardFromList = (handler) => {
    this.approveDeleteButton.addEventListener("click", () => {
      handler(this.numberToDelete);
      this.deleteCard(this.elementToDelete);
      this._toggleVisibility(this.confirmationPopup);
    });
  };

  addCardToDom = (card) => {
    this.addCard(card);
    this._toggleVisibility(this.cardEditor)
  }

  addCard = (card) => {
    const cardTemplate = this.cardTemplate.content.cloneNode(true);
    const img = cardTemplate.querySelector(".card_image");
    const comment = cardTemplate.querySelector(".card_comment");
    const number = cardTemplate.querySelector(".card_number");
    const deleteButton = cardTemplate.querySelector(".open_delete_conf_button");
    const deleteButtonIcon = cardTemplate.querySelector(".delete-button-icon");
    const chipImage = cardTemplate.querySelector(".chip");

    deleteButton.addEventListener("click", (event) => {
      this._toggleVisibility(this.confirmationPopup);

      const parentNode = event.currentTarget.parentNode;
      this.numberToDelete = parentNode.querySelector(".card_number").innerText;
      this.elementToDelete = parentNode;
    });

    img.src = card.type === "visa" ? visaImg : mastercardImg;
    chipImage.src = chip;
    deleteButtonIcon.src = deleteIcon;
    comment.innerText = card.comment;
    number.innerText = card.number.match(/.{1,4}/g).join(" ");

    this.list.appendChild(cardTemplate);
    this.clearForm();
  };

  deleteCard = (element) => {
    element.remove();
  };

  showExistingCards = (cards) => {
    cards.forEach((card) => this.addCard(card));
  };

  toggleInputsError = (error) => {
    if (error) {
      this.cardNumberSections.forEach((section) => {
        section.classList.remove("error");
      });
      this.errorMessage.classList.add("invisible");
    } else {
      this.cardNumberSections.forEach((section) => {
        section.classList.add("error");
      });
      this.errorMessage.classList.remove("invisible");
    }
  };

  clearForm = () => {
    this.cardNumberSections.forEach((input) => {
      input.value = "";
      input.classList.remove("error");
    });
    this.cardComment.value = "";
    this.errorMessage.classList.add("invisible");
  };

  setCardCheckResult = (result) => {
    this.toggleInputsError(result);
  };

  showWarningMessage = () => {
    this.warningMessage.classList.remove("invisible");
  };

  hideWarningMessage = () => {
    this.warningMessage.classList.add("invisible");
  };
}
