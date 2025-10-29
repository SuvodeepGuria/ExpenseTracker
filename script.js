let nameList = [];
let amountList = [];
let categoryList = [];
let dateList = [];

document.getElementById("totalItem").innerText = `Total items ${nameList.length}`;

// Calculate total
function calculateTotal() {
  let total = 0;
  for (let i = 0; i < amountList.length; i++) {
    total += Number(amountList[i]);
  }
  return total;
}

// Update totals
function updateTotals() {
  document.getElementById("totalExpenses").innerText = "₹ " + calculateTotal();
  document.getElementById("totalItem").innerText = `Total items ${nameList.length}`;
}

// Add new expense
function addToList(event) {
  event.preventDefault();

  let name = document.getElementById("name").value;
  let amount = Number(document.getElementById("amount").value);
  let category = document.getElementById("category").value;
  let date = document.getElementById("date").value;

  if (!name || !amount || !date) {
    alert("Please fill all fields!");
    return;
  }

  nameList.push(name);
  amountList.push(amount);
  categoryList.push(category);
  dateList.push(date);

  displayList();
  updateTotals();

  document.getElementById("expenseForm").reset();
}

// Show expense list
function displayList() {
  let tempDiv = '<table border=1>';
  tempDiv += '<tr><th>Name</th><th>Amount</th><th>Category</th><th>Date</th><th colspan="2">Actions</th></tr>';

  for (let i = 0; i < nameList.length; i++) {
    tempDiv += `<tr>
      <td>${nameList[i]}</td>
      <td>₹ ${amountList[i]}</td>
      <td>${categoryList[i]}</td>
      <td>${dateList[i]}</td>
      <td><button onclick="editItem(${i})">Edit</button></td>
      <td><button onclick="deleteItem(${i})">Remove</button></td>
    </tr>`;
  }

  tempDiv += '</table>';
  document.getElementById("table").innerHTML = tempDiv;
}

// Delete expense
function deleteItem(i) {
  nameList.splice(i, 1);
  amountList.splice(i, 1);
  categoryList.splice(i, 1);
  dateList.splice(i, 1);

  displayList();
  updateTotals();
}

// Edit expense
function editItem(i) {
  document.getElementById("name").value = nameList[i];
  document.getElementById("amount").value = amountList[i];
  document.getElementById("category").value = categoryList[i];
  document.getElementById("date").value = dateList[i];

  document.getElementById("submit").innerText = "Update Expense";
  document.getElementById("cancle").style.display = "block";
  document.getElementById("submit").setAttribute("onclick", `updateData(event, ${i})`);
}

// Update expense
function updateData(event, i) {
  event.preventDefault();

  nameList[i] = document.getElementById("name").value;
  amountList[i] = Number(document.getElementById("amount").value);
  categoryList[i] = document.getElementById("category").value;
  dateList[i] = document.getElementById("date").value;

  displayList();
  updateTotals();

  document.getElementById("submit").innerText = "Add Expense";
  document.getElementById("cancle").style.display = "none";
  document.getElementById("submit").setAttribute("onclick", "addToList(event)");
  document.getElementById("expenseForm").reset();
}

// Cancel edit
function cancle() {
  document.getElementById("expenseForm").reset();
  document.getElementById("submit").innerText = "Add Expense";
  document.getElementById("cancle").style.display = "none";
  document.getElementById("submit").setAttribute("onclick", "addToList(event)");
}
