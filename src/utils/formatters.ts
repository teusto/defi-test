// Utility function to format crypto values with appropriate precision
export const formatCryptoValue = (value, options = {}) => {
    const {
      // Maximum significant digits to show for small numbers
      maxSignificantDigits = 6,
      // Maximum decimal places for regular numbers
      maxDecimalPlaces = 2,
      // Threshold below which to use significant digits instead of fixed decimals
      smallNumberThreshold = 1,
      // Whether to include currency symbol ($)
      includeCurrency = true,
      // Whether to use compact notation for large numbers
      useCompactNotation = false,
      // Currency symbol to use if includeCurrency is true
      currencySymbol = '$'
    } = options;
  
    // Handle invalid inputs
    if (typeof value !== 'number' || isNaN(value)) {
      return '0';
    }
  
    // Handle zero
    if (value === 0) {
      return includeCurrency ? `${currencySymbol}0.00` : '0.00';
    }
  
    const absValue = Math.abs(value);
  
    // Format using compact notation for large numbers if enabled
    if (useCompactNotation && absValue >= 1_000_000) {
      const formatter = new Intl.NumberFormat('en-US', {
        notation: 'compact',
        maximumFractionDigits: 2
      });
      const formatted = formatter.format(value);
      return includeCurrency ? `${currencySymbol}${formatted}` : formatted;
    }
  
    // Handle small numbers with significant digits
    if (absValue > 0 && absValue < smallNumberThreshold) {
      // Convert to scientific notation first to handle very small numbers
      const scientificStr = value.toExponential(maxSignificantDigits - 1);
      const [baseNum, exponent] = scientificStr.split('e');
      const exp = parseInt(exponent);
  
      // If the number is very small, show in scientific notation
      if (exp < -7) {
        const formatted = value.toExponential(2);
        return includeCurrency ? `${currencySymbol}${formatted}` : formatted;
      }
  
      // Otherwise show the full decimal number
      const formatted = value.toPrecision(maxSignificantDigits).replace(/\.?0+$/, '');
      return includeCurrency ? `${currencySymbol}${formatted}` : formatted;
    }
  
    // Handle regular numbers
    const formatted = value.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: maxDecimalPlaces
    });
    
    return includeCurrency ? `${currencySymbol}${formatted}` : formatted;
  };
  
  // Example usage:
  const examples = [
    0,                    // "0.00"
    0.0000843,           // "0.0000843"
    0.00000000843,       // "8.43e-9"
    1.23456789,          // "1.23"
    1234.5678,           // "1,234.57"
    1000000,             // "1M" (with useCompactNotation: true)
    0.123456789012345,   // "0.123457"
  ];

  export const formatCryptoValueUpdate = (
    value: number,
    decimals: number = 2,
    currencySymbol: string = '$'
  ): string => {
    if (value === 0) return '0';
    if (value < 0) return `-${formatCryptoValue(Math.abs(value), decimals, currencySymbol)}`;
  
    if (value >= 1e12) {
      return `${currencySymbol}${(value / 1e12).toFixed(decimals)}T`;
    } else if (value >= 1e9) {
      return `${currencySymbol}${(value / 1e9).toFixed(decimals)}B`;
    } else if (value >= 1e6) {
      return `${currencySymbol}${(value / 1e6).toFixed(decimals)}M`;
    } else if (value >= 1e3) {
      return `${currencySymbol}${(value / 1e3).toFixed(decimals)}K`;
    } else {
      return `${currencySymbol}${value.toFixed(decimals)}`;
    }
  };