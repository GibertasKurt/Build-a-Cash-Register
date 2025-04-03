const cash = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const changeDue = document.getElementById("change-due");
const pricetxt = document.getElementById("price");
let price = Math.floor(Math.random() * 500);
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];
const denominations = [
  { name: 'ONE HUNDRED', value: 100.00 },
  { name: 'TWENTY', value: 20.00 },
  { name: 'TEN', value: 10.00 },
  { name: 'FIVE', value: 5.00 },
  { name: 'ONE', value: 1.00 },
  { name: 'QUARTER', value: 0.25 },
  { name: 'DIME', value: 0.10 },
  { name: 'NICKEL', value: 0.05 },
  { name: 'PENNY', value: 0.01 }
];
pricetxt.innerHTML = `Price: &#36;${price}`;

function calculateTotalCashInDrawer(cid) {
  return cid.reduce((total, currency) => total + currency[1], 0);
}
function handlePurchase(cashAmountValue) { // BRAIN ANEURYSM IMMINENT
  if (cashAmountValue < price) {
    alert("Customer does not have enough money to purchase the item");
  } else if (cashAmountValue === price) {
    changeDue.textContent = "No change due - customer paid with exact cash";
  } else {
    const changeDueAmount = cashAmountValue - price;
    const totalCashInDrawer = calculateTotalCashInDrawer(cid);

    if (totalCashInDrawer < changeDueAmount) {
      changeDue.textContent = "Status: INSUFFICIENT_FUNDS";
    } else {
      const change = [];
      let remainingChange = changeDueAmount;

      for (let i = 0; i < denominations.length; i++) { 
        const denomination = denominations[i];
        const availableAmount = cid.find(x => x[0] === denomination.name)[1];
        const count = Math.min(Math.floor(availableAmount / denomination.value), Math.floor(remainingChange / denomination.value));
        remainingChange -= count * denomination.value;
        remainingChange = Math.round(remainingChange * 100) / 100;
        if (count > 0) {
          change.push([denomination.name, count * denomination.value]);
        }
      }

      if (remainingChange > 0) {
        changeDue.textContent = "Status: INSUFFICIENT_FUNDS";
      } else {
        if (changeDueAmount === totalCashInDrawer) {
          changeDue.innerHTML = `Status: CLOSED ${change.map(x => `${x[0]}: &#36;${x[1].toFixed(2)}`).join('<br>')}`;
        } else {
          changeDue.innerHTML = `Status: OPEN <br> Change Due: &#36;${changeDueAmount.toFixed(2)} <br> ${change.map(x => `${x[0]}: &#36;${x[1].toFixed(2)}`).join('<br>')}`;
        }
      }
    }
  }
}
purchaseBtn.addEventListener("click", function() {
  let cashAmountValue = parseFloat(cash.value);
  handlePurchase(cashAmountValue);
});

// 19. When price is less than the value in the #cash element, total cash in drawer cid is equal to change due, and the #purchase-btn element is clicked, the value in the #change-due element should be "Status: CLOSED" with change due in coins and bills sorted in highest to lowest order.