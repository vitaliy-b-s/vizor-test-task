export class CardHolderModel {
  existingCards;

  constructor() {
    this.existingCards = this._getCardsFromLocalStorage("cards") || [];
    this.valid = require("card-validator");
    this.cardTypes = {
      visa: "visa",
      mastercard: "mastercard",
    };
    this.cardToAdd = {
      number: "",
      comment: "",
      type: "",
    };
  }

  _getCardsFromLocalStorage = (key) => {
    const JSONCards = window.localStorage.getItem(key);
    const cards = JSON.parse(JSONCards);
    return cards;
  };

  _setItemToLocalStorage = (key, value) => {
    return Promise.resolve().then(function () {
      window.localStorage.setItem(key, JSON.stringify(value));
    });
  };

  bindInitializeApp = (callback) => {
    this.onInitializeApp = callback;
  };

  bindCardNumberCheck = (callback) => {
    this.provideCardNumberCheckResult = callback;
  };

  bindCardPresenceCheckError = (callback) => {
    this.cardPresenceCheckError = callback;
  };

  bindApproveAddingCard = (callback) => {
    this.onApproveAddingCard = callback;
  };

  initializeApp = () => {
    this.onInitializeApp(this.existingCards);
  };

  checkCardNumberOnInput = (number) => {
    const numberToValidate = this.valid.number(number);
    const isPotentiallyValid = numberToValidate.isPotentiallyValid;
    const cardToCheck = numberToValidate.card;

    if (
      isPotentiallyValid &&
      (cardToCheck.type === this.cardTypes.visa ||
        cardToCheck.type === this.cardTypes.mastercard)
    ) {
      this.provideCardNumberCheckResult(true);
    } else {
      this.provideCardNumberCheckResult(false);
    }
  };

  addCardToList = (number) => {
    const numberToValidate = this.valid.number(number);
    const cardToCheck = numberToValidate.card;
    const isValid = numberToValidate.isValid;

    if (number.length < 16 || !isValid) {
      this.provideCardNumberCheckResult(false);
    } else if (this.checkIfCardPresent(number)) {
      this.cardPresenceCheckError();
    } else {
      this.cardToAdd.number = number;
      this.cardToAdd.type = cardToCheck.type;
      this.existingCards.push(this.cardToAdd);
      this._setItemToLocalStorage("cards", this.existingCards);
      this.onApproveAddingCard(this.cardToAdd);
    }
  };

  deleteCardFromList = (number) => {
    const indexToDelete = this.existingCards.findIndex((item) => {
      return item.number === number;
    });

    this.existingCards.splice(indexToDelete, 1);

    this._setItemToLocalStorage("cards", this.existingCards);
  };

  checkIfCardPresent = (number) => {
    const searchedNumber = this.existingCards.find((item) => {
      return item.number === number;
    });
    return Boolean(searchedNumber);
  };

  addCommentToCard = (comment) => {
    this.cardToAdd.comment = comment;
  };
}
