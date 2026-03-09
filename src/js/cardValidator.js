// Алгоритм Луна для проверки валидности номера карты
export default function validateCardNumber(cardNumber) {
    const cleanNumber = cardNumber.replace(/\s+/g, '');
    
    if (!/^\d+$/.test(cleanNumber)) return false;
    if (cleanNumber.length < 13 || cleanNumber.length > 19) return false;
    
    let sum = 0;
    let isEven = false;
    
    // Проходим по цифрам справа налево
    for (let i = cleanNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cleanNumber.charAt(i), 10);
      
      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      
      sum += digit;
      isEven = !isEven;
    }
    
    return sum % 10 === 0;
  }
