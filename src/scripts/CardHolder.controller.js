export class CardHolderController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.initializeApp = this.model.initializeApp;

    this.view.bindCardNumberCheckOnInput(this.handleCheckNumberOnInput);
    this.view.bindCommentInput(this.handleCommentInput);
    this.view.bindAddCardToList(this.addCardToList);
    this.view.bindDeleteCardFromList(this.deleteCardFromList);

    this.model.bindCardNumberCheck(this.onCardNumberChecked);
    this.model.bindCardDuplicated(this.showWarningMessage);
    this.model.bindApproveAddingCard(this.addCardToScreen);
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

  addCardToList = (number) => {
    this.model.addCardToList(number);
  };

  showWarningMessage = () => {
    this.view.showWarningMessage();
  };

  addCardToScreen = (card) => {
    this.view.addCard(card);
  };

  showExistingCards = (cards) => {
    this.view.showExistingCards(cards);
  };

  deleteCardFromList = (number) => {
    this.model.deleteCardFromList(number);
  };
}
