export class CardHolderController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.initializeApp = this.model.initializeApp;

    this.view.bindCardNumberCheckOnInput(this.handleCheckNumberOnInput);
    this.view.bindCommentInput(this.handleCommentInput);
    this.view.bindCardCheckOnAdd(this.cardCheckOnAdd);
    this.view.bindDeleteCardFromList(this.deleteCardFromList);

    this.model.bindCardNumberCheck(this.onCardNumberChecked);
    this.model.bindCardDuplicated(this.showWarningMessage);
    this.model.bindAddCardToList(this.addCardToScreen);
    this.model.bindInitializeApp(this.showExistingCards);
  }

  handleCheckNumberOnInput = (number) => {
    this.model.checkCardNumberValidity(number);
  };

  handleCommentInput = (comment) => {
    this.model.addCommentToCard(comment);
  };

  onCardNumberChecked = (result) => {
    this.view.setCardCheckResult(result);
  };

  cardCheckOnAdd = (number) => {
    this.model.cardCheckOnAdd(number);
  };

  showWarningMessage = () => {
    this.view.showWarningMessage();
  };

  addCardToScreen = (card) => {
    this.view.addCardToDom(card);
  };

  showExistingCards = (cards) => {
    this.view.showExistingCards(cards);
  };

  deleteCardFromList = (number) => {
    this.model.deleteCardFromList(number);
  };
}
