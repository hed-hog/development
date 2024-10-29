export const snakeCaseToPascalCase = (snakeCase: string) => {
  return snakeCase
    .split('_')
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join('');
};
