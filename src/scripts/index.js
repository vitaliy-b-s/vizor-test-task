import { CardHolderModel } from "./CardHolder.model";
import { CardHolderController } from "./CardHolder.controller";
import { CardHolderView } from "./CardHolder.view";
import "../styles/mainstyle.scss";

const app = new CardHolderController(
  new CardHolderModel(),
  new CardHolderView()
);

app.initializeApp();
