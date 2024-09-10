import { Input } from '../commands';
import { AbstractAction } from './abstract.action';

export class AddAction extends AbstractAction {
  public async handle(
    inputs: Input[],
    options: Input[],
    extraFlags: string[],
  ) {}
}
