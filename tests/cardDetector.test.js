import detectCardSystem from '../src/js/cardDetector';

describe('Credit Card System Detection', () => {
  test('should detect Visa', () => {
    expect(detectCardSystem('4111111111111111')).toBe('visa');
  });

  test('should detect Mastercard', () => {
    expect(detectCardSystem('5555555555554444')).toBe('mastercard');
  });

  test('should detect American Express', () => {
    expect(detectCardSystem('378282246310005')).toBe('amex');
  });

  test('should detect Discover', () => {
    expect(detectCardSystem('6011111111111117')).toBe('discover');
  });

  test('should detect JCB', () => {
    expect(detectCardSystem('3530111333300000')).toBe('jcb');
  });

  test('should detect Mir', () => {
    expect(detectCardSystem('2201382000000013')).toBe('mir');
  });

  test('should return null for unknown system', () => {
    expect(detectCardSystem('9999999999999999')).toBe(null);
  });

  test('should handle spaces in card number', () => {
    expect(detectCardSystem('4111 1111 1111 1111')).toBe('visa');
  });

  test('should return null for empty string', () => {
    expect(detectCardSystem('')).toBe(null);
  });
});
