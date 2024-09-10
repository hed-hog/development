import { Command } from '@commander-js/extra-typings';
import { AbstractAction } from '../actions/abstract.action';

export abstract class AbstractCommand {
  constructor(protected action: AbstractAction) {}

  public abstract load(program: Command): void;
}
