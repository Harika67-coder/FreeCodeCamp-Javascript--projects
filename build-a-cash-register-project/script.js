let price = 19.5;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];

const currencyUnits = {
  "PENNY": 0.01,
  "NICKEL": 0.05,
  "DIME": 0.1,
  "QUARTER": 0.25,
  "ONE": 1,
  "FIVE": 5,
  "TEN": 10,
  "TWENTY": 20,
  "ONE HUNDRED": 100
};

document.getElementById("purchase-btn").addEventListener("click", () => {
  const cash = parseFloat(document.getElementById("cash").value);
  const changeDueEl = document.getElementById("change-due");

  if (cash < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }

  if (cash === price) {
    changeDueEl.innerText = "No change due - customer paid with exact cash";
    return;
  }

  let changeNeeded = parseFloat((cash - price).toFixed(2));
  let totalCid = parseFloat(cid.reduce((sum, curr) => sum + curr[1], 0).toFixed(2));
  let changeArray = [];

  const reversedCid = cid.slice().reverse(); // highest to lowest

  for (let [unit, amount] of reversedCid) {
    let unitValue = currencyUnits[unit];
    let unitAmountAvailable = amount;
    let amountToReturn = 0;

    while (changeNeeded >= unitValue && unitAmountAvailable >= unitValue) {
      changeNeeded = parseFloat((changeNeeded - unitValue).toFixed(2));
      unitAmountAvailable = parseFloat((unitAmountAvailable - unitValue).toFixed(2));
      amountToReturn = parseFloat((amountToReturn + unitValue).toFixed(2));
    }

    if (amountToReturn > 0) {
      changeArray.push([unit, amountToReturn]);
    }
  }

  if (changeNeeded > 0) {
    changeDueEl.innerText = "Status: INSUFFICIENT_FUNDS";
    return;
  }

  const changeTotal = changeArray.reduce((sum, curr) => sum + curr[1], 0);
  if (changeTotal === totalCid) {
    // Closed case
    let closedText = "Status: CLOSED";
    for (let [unit, amount] of cid) {
      if (amount > 0) {
        closedText += ` ${unit}: $${amount}`;
      }
    }
    changeDueEl.innerText = closedText;
    return;
  }

  // Open case
  let openText = "Status: OPEN";
  for (let [unit, amount] of changeArray) {
    openText += ` ${unit}: $${amount}`;
  }
  changeDueEl.innerText = openText;
});
