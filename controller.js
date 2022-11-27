import view from "./view";

import "core-js";
import "regenerator-runtime/runtime";

const init = function () {
  // Initialize theme switcher listener
  view.switchTheme();

  // Initialize number clicks listener
  view.numberClick();

  // Initialize operator click listener
  view.operatorClick();

  // Initialize delete clicks listener
  view.deleteClick();

  // Initialize reset clicks listener
  view.resetClick();

  // Initialize equals clicks listener
  view.equalsClick();

  // Clear display
  view.clear();
};

init();
