/**
 * Checks if the given CPF is valid.
 *
 * @param {string} cpf the CPF number to check
 * @returns {boolean} true if the CPF is valid, false otherwise
 * @example
 * isValidCPF('123.456.789-00'); // true
 *
 * @example
 * isValidCPF('123.456.789-01'); // false
 */
export const isValidCPF = (cpf: string): boolean => {
  cpf = cpf.replace(/\D/g, '');
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

  const calcDigit = (slice: string): number => {
    let sum = 0;
    for (let i = 0; i < slice.length; i++) {
      sum += Number(slice[i]) * (slice.length + 1 - i);
    }
    const rest = sum % 11;
    return rest < 2 ? 0 : 11 - rest;
  };

  const firstDigit = calcDigit(cpf.slice(0, 9));
  const secondDigit = calcDigit(cpf.slice(0, 10));

  return firstDigit === Number(cpf[9]) && secondDigit === Number(cpf[10]);
};

export const cleanCPF = (cpf: string) => {
  return cpf.replace(/\D/g, '');
};
