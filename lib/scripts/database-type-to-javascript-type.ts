export const databaseTypeToJavascriptType = (databaseType: string) => {
  switch (databaseType) {
    case 'int':
    case 'int4':
    case 'int8':
    case 'integer':
    case 'smallint':
      return 'number';
    case 'text':
    case 'varchar':
    case 'char':
    case 'timestamp':
    case 'bpchar':
    case 'date':
    case 'time':
    case 'timetz':
    case 'timestamptz':
      return 'string';

    case 'bool':
    case 'boolean':
    case 'bit':
      return 'boolean';

    default:
      if (
        databaseType.split('_')[databaseType.split('_').length - 1] === 'enum'
      ) {
        return { enum: databaseType };
      } else {
        return 'any';
      }
  }
};
