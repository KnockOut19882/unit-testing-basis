export const convertPLNToUSD = (PLN) => {
  // Sprawdź czy input jest prawidłową liczbą (nie NaN, nie string, nie null, etc.)
  if (typeof PLN !== 'number' || isNaN(PLN) || PLN < 0) {
    return NaN;
  }

  const PLNtoUSD = PLN / 3.5;
  
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });

  return formatter.format(PLNtoUSD).replace(/\u00a0/g, ' ');
}