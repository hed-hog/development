import { Command } from '@commander-js/extra-typings';
import { AbstractAction } from '../actions/abstract.action';
export declare abstract class AbstractCommand {
    protected action: AbstractAction;
    constructor(action: AbstractAction);
    abstract load(program: Command): void;
}
