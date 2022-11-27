class View {
  _container = document.querySelector(".container");
  _switch = document.querySelector(".switcher__switch");
  _history = document.querySelector(".display__history");
  _main = document.querySelector(".display__main");
  _numbers = document.querySelectorAll(".number");
  _operators = document.querySelectorAll(".operator");
  _del = document.querySelector(".del");
  _reset = document.querySelector(".reset");
  _equals = document.querySelector(".equals");

  switchTheme() {
    // Click handler
    const switchClick = function () {
      if (getComputedStyle(this._switch).left == "7.46875px") {
        // Move switch right
        this._switch.style.left = "50%";

        // Change theme
        this._container.classList.add("light-theme");
      } else if (getComputedStyle(this._switch).left == "22px") {
        // Move switch right
        this._switch.style.left = "83%";

        // Change theme
        this._container.classList.remove("light-theme");
        this._container.classList.add("dark-theme");
      } else if (getComputedStyle(this._switch).left == "36.5156px") {
        // Move switch left
        this._switch.style.left = "17%";

        // Change theme
        this._container.classList.remove("dark-theme");
      }
    };

    // Listen to theme switcher click
    this._switch.addEventListener("click", switchClick.bind(this));
  }

  // Delete character on main
  _delete() {
    this.mainOperand = this.mainOperand.toString().slice(0, -1);
  }

  // Append number on main
  _appendNumber(number) {
    // Check for periods on the main display
    if (number === "." && this.mainOperand.includes(".")) return;

    // Append number
    this.mainOperand = this.mainOperand.toString() + number.toString();
  }

  _compute() {
    let computation;

    const prev = parseFloat(this.historyOperand);
    const main = parseFloat(this.mainOperand);

    // If operand empty or not a number
    if (isNaN(prev) || isNaN(main)) return;

    // Swith the operators to compute
    switch (this.operation) {
      case "+":
        computation = prev + main;
        break;
      case "-":
        computation = prev - main;
        break;
      case "/":
        computation = prev / main;
        break;
      case "X":
        computation = prev * main;
        break;
      default:
        return;
    }

    // Set main operand after computing
    this.mainOperand = computation;

    // Reset operation
    this.operation = undefined;

    // Clear history operand
    this.historyOperand = "";
  }

  _chooseOperation(operation) {
    // Check if main display is empty return
    if (this.mainOperand === "") return;

    // Calculate
    if (this.historyOperand !== "") {
      this._compute();
    }

    // Set the operation clicked
    this.operation = operation;

    // Set the history operand to current operand
    this.historyOperand = this.mainOperand;

    // Clear main operand
    this.mainOperand = "";
  }

  // Helper function to format number
  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];

    let integerDisplay;

    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }

    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  // Update display
  _updateDisplay() {
    // Update main
    this._main.innerText = this.getDisplayNumber(this.mainOperand);

    // Update history if operator clicked
    if (this.operation != null) {
      this._history.innerText = `${this.getDisplayNumber(
        this.historyOperand
      )} ${this.operation}`;
    } else {
      this._history.innerText = "";
    }
  }

  // Clear display
  clear() {
    this.historyOperand = "";
    this.mainOperand = "";
    this.operation = undefined;
  }

  // Listening to number clicks
  numberClick() {
    this._numbers.forEach((num) => {
      const numberEl = function () {
        // Append number clicked
        this._appendNumber(num.innerText);

        // Update display
        this._updateDisplay();
      };

      num.addEventListener("click", numberEl.bind(this));
    });
  }

  // Listening to operator clicks
  operatorClick() {
    this._operators.forEach((operator) => {
      const operatorEl = function () {
        // Append number clicked
        this._chooseOperation(operator.innerText);

        // Update display
        this._updateDisplay();
      };

      operator.addEventListener("click", operatorEl.bind(this));
    });
  }

  // Listening to delete clicks
  deleteClick() {
    const deleteEl = function () {
      // Delete
      this._delete();

      // Update display
      this._updateDisplay();
    };

    this._del.addEventListener("click", deleteEl.bind(this));
  }

  // Listening to reset clicks
  resetClick() {
    const resetEl = function () {
      // Clear all
      this.clear();

      // Update display
      this._updateDisplay();
    };

    this._reset.addEventListener("click", resetEl.bind(this));
  }

  // Listening to equals clicks
  equalsClick() {
    const equalsEl = function () {
      // Compute values
      this._compute();

      // Update display
      this._updateDisplay();
    };

    this._equals.addEventListener("click", equalsEl.bind(this));
  }
}

export default new View();
