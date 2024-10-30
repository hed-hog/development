export const singularToPlural = (singular: string) => {
  console.log('singularToPlural', singular);
  if (singular.endsWith('s')) {
    return `${singular}es`;
  }

  if (singular.endsWith('y')) {
    return `${singular.slice(0, -1)}ies`;
  }

  return `${singular}s`;
};
