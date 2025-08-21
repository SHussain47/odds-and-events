const bank = [];
const odds = [];
const evens = [];

// =============== STATE LOGIC ===============

function addToBank(num) {
  bank.push(num);
  render();
}

function addRandomNum() {
  bank.push(Math.floor(Math.random() * 201));
}

function sortBank(num) {
  if (num % 2 === 0) {
    evens.push(num);
  } else {
    odds.push(num);
  }
}

function sortOne() {
  if (bank.length === 0) {
    return;
  }
  sortBank(bank.shift());
  render();
}

function sortAll() {
  while (bank.length > 0) {
    sortBank(bank.shift());
  }
  render();
}


// =============== COMPONENTS / DISPLAY ===============

function oddEvenForm() {
  const $form = document.createElement("form");
  $form.innerHTML = `
    <label>
      Odds and Evens
      <input name="oddEven" type="text" placeholder="Enter number" />
    </label>
    <button type="submit" data-action="add">Add Number</button>
    <button type="submit" data-action="sortOne">Sort One</button>
    <button type="submit" data-action="sortAll">Sort All</button>
  `;

  $form.addEventListener("submit", function (event) {
    event.preventDefault();
    const action = event.submitter.dataset.action;
    const data = new FormData($form);
    const userInputtedNum = data.get("oddEven").trim();

    if (action === "add" && userInputtedNum !== "") {
      addToBank(userInputtedNum);
    } else if (action === "sortOne") {
      sortOne();
    } else if (action === "sortAll") {
      sortAll();
    }
  });

  return $form;
}







// =============== RENDER ===============

function render() {
  
}







