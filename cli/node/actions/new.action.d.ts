import { Input } from '../commands';
import { AbstractAction } from './abstract.action';
export declare class NewAction extends AbstractAction {
    handle(inputs: Input[], options: Input[]): Promise<void>;
    complete(directory: string, packageManager: string): void;
    add(module: string): Promise<void>;
    installPackages(options: Input[], directory: string): Promise<string | undefined>;
    cloneRepository(url: string, directory: string): Promise<void>;
    configureGit(directory: string): Promise<void[]>;
    createEnvFile(dirPath: string, config: {
        host: string;
        port: number;
        user: string;
        password: string;
        database: string;
    }): Promise<void>;
}
