import { Command } from '@commander-js/extra-typings';
export declare class CommandLoader {
    static load(program: Command): Promise<void>;
    private static handleInvalidCommand;
}
