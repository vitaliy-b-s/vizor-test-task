import { Model } from "./cardHolderModel";
import { Controller } from "./cardHolderController";
import { View } from "./cardHolderView";
import "../styles/mainstyle.scss";

const app = new Controller(new Model(), new View());

app.model.initializeApp();
