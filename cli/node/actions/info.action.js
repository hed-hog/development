"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfoAction = void 0;
const chalk = require("chalk");
const fs_1 = require("fs");
const os_1 = require("os");
const path_1 = require("path");
const package_managers_1 = require("../lib/package-managers");
const ui_1 = require("../lib/ui");
const abstract_action_1 = require("./abstract.action");
const os_info_utils_1 = require("../lib/utils/os-info.utils");
class InfoAction extends abstract_action_1.AbstractAction {
    constructor() {
        super(...arguments);
        this.warningMessageDependenciesWhiteList = [
            '@hedhog/auth',
            '@hedhog/pagination',
            '@hedhog/prisma',
            '@hedhog/user',
        ];
    }
    async handle() {
        this.manager = await package_managers_1.PackageManagerFactory.find();
        this.displayBanner();
        await this.displaySystemInformation();
        await this.displayHedHogInformation();
    }
    displayBanner() {
        console.info(chalk.red(ui_1.BANNER));
    }
    async displaySystemInformation() {
        console.info(chalk.green('[System Information]'));
        console.info('OS Version     :', chalk.blue((0, os_info_utils_1.default)((0, os_1.platform)(), (0, os_1.release)()), (0, os_1.release)()));
        console.info('NodeJS Version :', chalk.blue(process.version));
        await this.displayPackageManagerVersion();
    }
    async displayPackageManagerVersion() {
        try {
            const version = await this.manager.version();
            console.info(`${this.manager.name} Version    :`, chalk.blue(version), '\n');
        }
        catch {
            console.error(`${this.manager.name} Version    :`, chalk.red('Unknown'), '\n');
        }
    }
    async displayHedHogInformation() {
        this.displayCliVersion();
        console.info(chalk.green('[HedHog Platform Information]'));
        await this.displayHedHogInformationFromPackage();
    }
    async displayHedHogInformationFromPackage() {
        try {
            const dependencies = this.readProjectPackageDependencies();
            this.displayVersions(dependencies);
        }
        catch (err) {
            console.error(chalk.red(ui_1.MESSAGES.HEDHOG_INFORMATION_PACKAGE_MANAGER_FAILED));
        }
    }
    displayCliVersion() {
        console.info(chalk.green('[HedHog CLI]'));
        console.info('HedHog CLI Version :', chalk.blue(JSON.parse((0, fs_1.readFileSync)((0, path_1.join)(__dirname, '../package.json')).toString())
            .version), '\n');
    }
    readProjectPackageDependencies() {
        const buffer = (0, fs_1.readFileSync)((0, path_1.join)(process.cwd(), 'package.json'));
        const pack = JSON.parse(buffer.toString());
        const dependencies = { ...pack.dependencies, ...pack.devDependencies };
        Object.keys(dependencies).forEach((key) => {
            dependencies[key] = {
                version: dependencies[key],
            };
        });
        return dependencies;
    }
    displayVersions(dependencies) {
        const _dependencies = this.buildHedhogVersionsMessage(dependencies);
        _dependencies.forEach((dependency) => console.info(dependency.name, chalk.blue(dependency.value)));
        this.displayWarningMessage(_dependencies);
    }
    displayWarningMessage(dependencies) {
        try {
            const warnings = this.buildHedHogVersionsWarningMessage(dependencies);
            const majorVersions = Object.keys(warnings);
            if (majorVersions.length > 0) {
                console.info('\r');
                console.info(chalk.yellow('[Warnings]'));
                console.info('The following packages are not in the same major version');
                console.info('This could lead to runtime errors');
                majorVersions.forEach((version) => {
                    console.info(chalk.bold(`* Under version ${version}`));
                    warnings[version].forEach(({ packageName, value }) => {
                        console.info(`- ${packageName} ${value}`);
                    });
                });
            }
        }
        catch {
            console.info('\t');
            console.error(chalk.red(ui_1.MESSAGES.HEDHOG_INFORMATION_PACKAGE_WARNING_FAILED(this.warningMessageDependenciesWhiteList)));
        }
    }
    buildHedHogVersionsWarningMessage(hedHogDependencies) {
        const unsortedWarnings = hedHogDependencies.reduce((depWarningsGroup, { name, packageName, value }) => {
            if (!this.warningMessageDependenciesWhiteList.includes(packageName)) {
                return depWarningsGroup;
            }
            const [major] = value.replace(/[^\d.]/g, '').split('.', 1);
            const minimumVersion = major;
            depWarningsGroup[minimumVersion] = [
                ...(depWarningsGroup[minimumVersion] || []),
                { name, packageName, value },
            ];
            return depWarningsGroup;
        }, Object.create(null));
        const unsortedMinorVersions = Object.keys(unsortedWarnings);
        if (unsortedMinorVersions.length <= 1) {
            return {};
        }
        const sortedMinorVersions = unsortedMinorVersions.sort((versionA, versionB) => {
            const numA = parseFloat(versionA);
            const numB = parseFloat(versionB);
            if (isNaN(numA) && isNaN(numB)) {
                // If both are not valid numbers, maintain the current order.
                return 0;
            }
            // NaN is considered greater than any number, so if numA is NaN, place it later.
            return isNaN(numA) ? 1 : isNaN(numB) ? -1 : numB - numA;
        });
        return sortedMinorVersions.reduce((warnings, minorVersion) => {
            warnings[minorVersion] = unsortedWarnings[minorVersion];
            return warnings;
        }, Object.create(null));
    }
    buildHedhogVersionsMessage(dependencies) {
        const _dependencies = this.collectHedHogDependencies(dependencies);
        return this.format(_dependencies);
    }
    collectHedHogDependencies(dependencies) {
        const _dependencies = [];
        Object.keys(dependencies).forEach((key) => {
            if (key.indexOf('@hedhog') > -1) {
                const depPackagePath = require.resolve(key + '/package.json', {
                    paths: [process.cwd()],
                });
                const depPackage = (0, fs_1.readFileSync)(depPackagePath).toString();
                const value = JSON.parse(depPackage).version;
                _dependencies.push({
                    name: `${key.replace(/@hedhog\//, '').replace(/@.*/, '')} version`,
                    value: value || dependencies[key].version,
                    packageName: key,
                });
            }
        });
        return _dependencies;
    }
    format(dependencies) {
        const sorted = dependencies.sort((dependencyA, dependencyB) => dependencyB.name.length - dependencyA.name.length);
        const length = sorted[0].name.length;
        sorted.forEach((dependency) => {
            if (dependency.name.length < length) {
                dependency.name = this.rightPad(dependency.name, length);
            }
            dependency.name = dependency.name.concat(' :');
            dependency.value = dependency.value.replace(/(\^|\~)/, '');
        });
        return sorted;
    }
    rightPad(name, length) {
        while (name.length < length) {
            name = name.concat(' ');
        }
        return name;
    }
}
exports.InfoAction = InfoAction;
