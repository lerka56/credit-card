import '../css/style.css';
import validateCardNumber from './cardValidator';
import detectCardSystem from './cardDetector';

// Импорт изображений для Webpack
import visaImg from '../img/visa.png';
import mastercardImg from '../img/mastercard.png';
import mirImg from '../img/mir.png';
import amexImg from '../img/amex.png';
import discoverImg from '../img/discover.png';
import jcbImg from '../img/jcb.png';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.createElement('form');
  form.className = 'card-validator';
  
  form.innerHTML = `
    <h2>Credit Card Validator</h2>
    <div class="card-icons">
      <img src="${visaImg}" alt="Visa" class="card-icon" data-system="visa">
      <img src="${mastercardImg}" alt="Mastercard" class="card-icon" data-system="mastercard">
      <img src="${mirImg}" alt="Mir" class="card-icon" data-system="mir">
      <img src="${amexImg}" alt="American Express" class="card-icon" data-system="amex">
      <img src="${discoverImg}" alt="Discover" class="card-icon" data-system="discover">
      <img src="${jcbImg}" alt="JCB" class="card-icon" data-system="jcb">
    </div>
    <div class="input-group">
      <input type="text" id="card-number" placeholder="Enter card number" maxlength="19">
      <button type="submit">Validate</button>
    </div>
    <div class="result"></div>
  `;
  
  document.body.appendChild(form);
  
  const input = document.getElementById('card-number');
  const resultDiv = document.querySelector('.result');
  const cardIcons = document.querySelectorAll('.card-icon');
  
  // Форматирование номера карты
  input.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\s+/g, '');
    value = value.replace(/(\d{4})/g, '$1 ').trim();
    e.target.value = value;
    
    // Определение платежной системы
    const system = detectCardSystem(value);
    
    // Подсветка соответствующей иконки
    cardIcons.forEach(icon => {
      icon.classList.remove('active');
      if (icon.dataset.system === system) {
        icon.classList.add('active');
      }
    });
  });
  
  // Валидация при отправке формы
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const cardNumber = input.value;
    const isValid = validateCardNumber(cardNumber);
    const system = detectCardSystem(cardNumber);
    
    if (isValid) {
      resultDiv.textContent = `✓ Valid ${system ? system.toUpperCase() : ''} card number`;
      resultDiv.className = 'result success';
    } else {
      resultDiv.textContent = '✗ Invalid card number';
      resultDiv.className = 'result error';
    }
  });
});
