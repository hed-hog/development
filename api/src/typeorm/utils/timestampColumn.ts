import { TableColumn } from 'typeorm';

export const timestampColumn = (name = 'created_at') => {
  return {
    name,
    type: 'timestamp',
    default: 'CURRENT_TIMESTAMP',
  } as TableColumn;
};
