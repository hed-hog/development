import { AbstractPackageManager } from './abstract.package-manager';
import { PackageManager } from './package-manager';
export declare class PackageManagerFactory {
    static create(name: PackageManager | string): AbstractPackageManager;
    static findManager(): Promise<string>;
    static find(): Promise<AbstractPackageManager>;
}
