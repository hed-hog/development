import { AbstractAction } from './abstract.action';
interface LockfileDependency {
    version: string;
}
interface PackageJsonDependencies {
    [key: string]: LockfileDependency;
}
interface HedHogDependency {
    name: string;
    value: string;
    packageName: string;
}
interface HedHogDependencyWarnings {
    [key: string]: Array<HedHogDependency>;
}
export declare class InfoAction extends AbstractAction {
    private manager;
    private warningMessageDependenciesWhiteList;
    handle(): Promise<void>;
    private displayBanner;
    private displaySystemInformation;
    displayPackageManagerVersion(): Promise<void>;
    displayHedHogInformation(): Promise<void>;
    displayHedHogInformationFromPackage(): Promise<void>;
    displayCliVersion(): void;
    readProjectPackageDependencies(): PackageJsonDependencies;
    displayVersions(dependencies: PackageJsonDependencies): void;
    displayWarningMessage(dependencies: HedHogDependency[]): void;
    buildHedHogVersionsWarningMessage(hedHogDependencies: HedHogDependency[]): HedHogDependencyWarnings;
    buildHedhogVersionsMessage(dependencies: PackageJsonDependencies): HedHogDependency[];
    collectHedHogDependencies(dependencies: PackageJsonDependencies): HedHogDependency[];
    format(dependencies: HedHogDependency[]): HedHogDependency[];
    rightPad(name: string, length: number): string;
}
export {};
