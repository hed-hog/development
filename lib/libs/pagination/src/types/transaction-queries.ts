import { QueryOption } from './query-option';

export type TransactionQueries = {
  query: string;
  values?: any[];
  options?: QueryOption;
};
