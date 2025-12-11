// ----- LOGIN LOGIC -----
const loginBtn = document.getElementById('login-btn');
const usernameInput = document.getElementById('username');
const loginSection = document.getElementById('login-section');
const dashboardSection = document.getElementById('dashboard-section');
const userNameSpan = document.getElementById('user-name');
const logoutBtn = document.getElementById('logout-btn');

loginBtn.addEventListener('click', () => {
  const username = usernameInput.value.trim();

  if (username === "") {
    alert("Please enter your name!");
    return;
  }

  // naam dashboard pe show karo
  userNameSpan.textContent = username;

  // login hide, dashboard show
  loginSection.classList.add('hidden');
  dashboardSection.classList.remove('hidden');
});

logoutBtn.addEventListener('click', () => {
  dashboardSection.classList.add('hidden');
  loginSection.classList.remove('hidden');
  usernameInput.value = "";
});


// ----- APPLIANCE & ENERGY LOGIC -----
const addBtn = document.getElementById('add-btn');
const tableBody = document.querySelector('#appliance-table tbody');
const totalEnergyDisplay = document.getElementById('total-energy');
const billDisplay = document.getElementById('bill');

// yahan sab appliances ka data store hoga
let appliances = [];
let totalEnergy = 0; // kWh/day
const ratePerUnit = 5; // ₹ per kWh (chaaho toh change kar sakte ho)

// Add button click
addBtn.addEventListener('click', () => {
  const name = document.getElementById('appliance-name').value.trim();
  const power = parseFloat(document.getElementById('power').value);
  const hours = parseFloat(document.getElementById('hours').value);

  // basic validation
  if (!name || isNaN(power) || isNaN(hours)) {
    alert("Please fill all fields correctly!");
    return;
  }

  // Energy calculation: kWh/day
  const energy = (power * hours) / 1000;

  // Data array me push karo
  appliances.push({ name, power, hours, energy });

  // Total energy update
  totalEnergy += energy;

  // Table me nayi row add karo
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${name}</td>
    <td>${power}</td>
    <td>${hours}</td>
    <td>${energy.toFixed(2)}</td>
  `;
  tableBody.appendChild(row);

  // Summary update
  totalEnergyDisplay.textContent = totalEnergy.toFixed(2);

  // Bill = totalEnergy (per day) * 30 days * rate
  const monthlyBill = totalEnergy * 30 * ratePerUnit;
  billDisplay.textContent = monthlyBill.toFixed(2);

  // Form clear karo
  document.getElementById('appliance-name').value = "";
  document.getElementById('power').value = "";
  document.getElementById('hours').value = "";
});
