import validateCardNumber from '../src/js/cardValidator';

describe('Credit Card Number Validation', () => {
  test('should return true for valid Visa card', () => {
    expect(validateCardNumber('4111111111111111')).toBe(true);
  });

  test('should return true for valid Mastercard', () => {
    expect(validateCardNumber('5555555555554444')).toBe(true);
  });

  test('should return true for valid American Express', () => {
    expect(validateCardNumber('378282246310005')).toBe(true);
  });

  test('should return false for invalid card number', () => {
    expect(validateCardNumber('1234567890123456')).toBe(false);
  });

  test('should handle spaces in card number', () => {
    expect(validateCardNumber('4111 1111 1111 1111')).toBe(true);
  });

  test('should return false for non-numeric characters', () => {
    expect(validateCardNumber('4111 1111 1111 111a')).toBe(false);
  });

  test('should return false for too short number', () => {
    expect(validateCardNumber('4111')).toBe(false);
  });

  test('should return false for too long number', () => {
    expect(validateCardNumber('411111111111111111111')).toBe(false);
  });
});
