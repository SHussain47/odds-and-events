const bank = [];
const odds = [];
const evens = [];

// =============== STATE LOGIC ===============

function addToBank(num) {
  bank.push(num);
  render();
}

function addRandomNum() {
  const num = Math.floor(Math.random() * 201);
  addToBank(num);
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

function OddEvenForm() {
  const $form = document.createElement("form");
  $form.innerHTML = `
    <label>
      Odds and Evens
      <input name="oddEven" type="text" placeholder="Enter number" />
    </label>
    <button type="submit" data-action="add">Add Number</button>
    <button type="submit" data-action="randomNum">Add Random Number</button>
    <button type="submit" data-action="sortOne">Sort One</button>
    <button type="submit" data-action="sortAll">Sort All</button>
  `;

  $form.addEventListener("submit", function (event) {
    event.preventDefault();
    const action = event.submitter.dataset.action;
    const data = new FormData($form);
    const userInputtedNum = data.get("oddEven").trim();

    const $input = $form.querySelector("[name = 'oddEven']");

    if (action === "add" && userInputtedNum !== "") {
      if (isNaN(userInputtedNum)) {
        $input.value = "";
        alert("Please enter a valid number")
      } else {
        addToBank(userInputtedNum);
      }
    } else if (action === "randomNum"){
      addRandomNum();
    } else if (action === "sortOne") {
      sortOne();
    } else if (action === "sortAll") {
      sortAll();
    }
  });

  return $form;
}

function OddEvenGroup(title, nums) {
  const $section = document.createElement("section");
  $section.innerHTML = `
  <h2>${title}</h2>
  <p class = "oddEvenBox"></p>
  `;

  // Finds the <p> we just created inside the section
  // Stores it in the variable $box so we can put the numbers inside
  const $box = $section.querySelector(".oddEvenBox");

  // Takes the array [nums] from parameters and joins them with ", "
  $box.textContent = nums.join(", ");

  return $section;
}


// =============== RENDER ===============

function render() {
  const $root = document.querySelector("#root");
  $root.innerHTML = `
    <h1>Odds and Evens</h1>
    <OddEvenForm></OddEvenForm>
    <OddEvenGroup id="bank"></OddEvenGroup>
    <OddEvenGroup id="odds"></OddEvenGroup>
    <OddEvenGroup id="evens"></OddEvenGroup>
  `;

  $root.querySelector("OddEvenForm").replaceWith(OddEvenForm());
  $root.querySelector("OddEvenGroup#bank").replaceWith(OddEvenGroup("Bank", bank));
  $root.querySelector("OddEvenGroup#odds").replaceWith(OddEvenGroup("Odds", odds));
  $root.querySelector("OddEvenGroup#evens").replaceWith(OddEvenGroup("Evens", evens));
}

render();






