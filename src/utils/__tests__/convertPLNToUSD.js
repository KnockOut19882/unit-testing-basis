import { convertPLNToUSD } from '../convertPLNToUSD';

describe('convertPLNToUSD', () => {
  describe('when given valid numeric input', () => {
    it('should convert small amounts correctly', () => {
      expect(convertPLNToUSD(1)).toBe('$0.29');
      expect(convertPLNToUSD(2)).toBe('$0.57');
    });

    it('should convert larger amounts correctly', () => {
      expect(convertPLNToUSD(20)).toBe('$5.71');
      expect(convertPLNToUSD(12)).toBe('$3.43');
    });
  });

  describe('when given invalid input', () => {
    it('should return NaN for string values', () => {
      expect(convertPLNToUSD('6')).toBeNaN();
      expect(convertPLNToUSD('abc')).toBeNaN();
      expect(convertPLNToUSD('-154')).toBeNaN();
    });

    it('should return NaN for empty or undefined input', () => {
      expect(convertPLNToUSD()).toBeNaN();
      expect(convertPLNToUSD(undefined)).toBeNaN();
      expect(convertPLNToUSD(null)).toBeNaN();
    });

    it('should return NaN for negative numbers', () => {
      expect(convertPLNToUSD(-1)).toBeNaN();
      expect(convertPLNToUSD(-100)).toBeNaN();
    });

    it('should return NaN for non-primitive types', () => {
      expect(convertPLNToUSD([])).toBeNaN();
      expect(convertPLNToUSD({})).toBeNaN();
      expect(convertPLNToUSD(NaN)).toBeNaN();
    });
  });
});