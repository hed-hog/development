import { Input } from '../commands';
import { AbstractAction } from './abstract.action';
export declare class AddAction extends AbstractAction {
    handle(inputs: Input[], options: Input[]): Promise<void>;
    complete(module: string): Promise<void>;
    copyMigrationsFiles(nodeModulePath: string): Promise<boolean | undefined>;
    addModuleImportToAppModule(addModuleName: string, moduleImport: string, appModulePath: string): Promise<boolean>;
    checkIfModuleExists(module: string, nodeModulePath: string): Promise<boolean>;
    checkIfDirectoryIsPackage(directory: string): any;
    capitalizeFirstLetter(value: string): string;
    installPackage(module: string): Promise<boolean>;
}
