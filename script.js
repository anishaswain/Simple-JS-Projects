// Calculator variables
let calculation = '';
let history = [];

// DOM elements
const resultInput = document.getElementById('result');
const historyList = document.getElementById('history-list');
const historyToggle = document.createElement('div');
historyToggle.className = 'history-toggle';
//historyToggle.innerHTML = '<button onclick="toggleHistory()">Toggle History</button>';
document.querySelector('.calculator').appendChild(historyToggle);

// Append number or operator to the calculation string
function appendNumber(number) {
  calculation += number;
  updateResult();
}

function appendOperator(operator) {
  calculation += operator;
  updateResult();
}

// Update the result input with the current calculation string
function updateResult() {
  resultInput.value = calculation;
}

// Calculate the result of the calculation string
function calculate() {
  try {
    const result = eval(calculation);
    if (result || result === 0) {
      history.push(`${calculation} = ${result}`);
      updateHistory();
      clearDisplay();
    }
  } catch (error) {
    console.log('Error:', error);
  }
}

// Clear the calculation string and update the result input
function clearDisplay() {
  calculation = '';
  updateResult();
}

// Update the history list with the stored calculations
function updateHistory() {
  historyList.innerHTML = '';
  history.forEach((calculation) => {
    const li = document.createElement('li');
    li.textContent = calculation;
    historyList.appendChild(li);
  });
}

// Toggle the visibility of the history list
function toggleHistory() {
  historyList.classList.toggle('hidden');
}
