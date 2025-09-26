import collapse from "@alpinejs/collapse";
import focus from "@alpinejs/focus";
import Alpine, { type Alpine as AlpineType } from "alpinejs";
import { calculator } from "./data/calculator/calculator";
import "./styles.css";

declare global {
  var Alpine: AlpineType;
}

Alpine.plugin(collapse);
Alpine.plugin(focus);

Alpine.data("calculator", calculator);

Alpine.start();
