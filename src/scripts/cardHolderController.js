export class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.bindCardNumberCheckOnInput(this.handleCheckNumberOnInput);
    this.view.bindCommentInput(this.handleCommentInput);
    this.view.bindAddCardToList(this.addCardToList);
    this.view.bindDeleteCardFromList(this.deleteCardFromList)

    this.model.bindCardCheckResultOnInput(this.onCardCheckResultChanged);
    this.model.bindShowWarningMessage(this.showWarningMessage);
    this.model.bindAddCardToScreen(this.addCardToScreen);
    this.model.bindInitializeApp(this.showExistingCards);
  }

  handleCheckNumberOnInput = (number) => {
    this.model.checkCardNumberOnInput(number);
  };

  handleCommentInput = (comment) => {
    this.model.addCommentToCard(comment);
  };

  onCardCheckResultChanged = (result) => {
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
    this.model.deleteCardFromList(number)
  }
}
