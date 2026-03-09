// Определение платежной системы по номеру карты
export default function detectCardSystem(cardNumber) {
    const cleanNumber = cardNumber.replace(/\s+/g, '');
    
    if (!cleanNumber) return null;
    
    // Регулярные выражения для определения платежных систем
    const patterns = {
      visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
      mastercard: /^(5[1-5][0-9]{14}|2(2[2-9][0-9]{12}|[3-6][0-9]{13}|7[01][0-9]{12}|720[0-9]{12}))$/,
      amex: /^3[47][0-9]{13}$/,
      discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
      jcb: /^(?:2131|1800|35[0-9]{3})[0-9]{11}$/,
      mir: /^220[0-4][0-9]{12}$/,
    };
  
    for (const [system, pattern] of Object.entries(patterns)) {
      if (pattern.test(cleanNumber)) {
        return system;
      }
    }
    
    return null;
  }
