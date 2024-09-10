import * as chalk from 'chalk';
import { readFileSync } from 'fs';
import { platform, release } from 'os';
import { join } from 'path';
import {
  AbstractPackageManager,
  PackageManagerFactory,
} from '../lib/package-managers';
import { BANNER, MESSAGES } from '../lib/ui';
import { AbstractAction } from './abstract.action';
import osName from '../lib/utils/os-info.utils';

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

export class InfoAction extends AbstractAction {
  private manager!: AbstractPackageManager;

  private warningMessageDependenciesWhiteList = [
    '@hedhog/auth',
    '@hedhog/pagination',
    '@hedhog/prisma',
    '@hedhog/user',
  ];

  public async handle() {
    this.manager = await PackageManagerFactory.find();
    this.displayBanner();
    await this.displaySystemInformation();
    await this.displayHedHogInformation();
  }

  private displayBanner() {
    console.info(chalk.red(BANNER));
  }

  private async displaySystemInformation(): Promise<void> {
    console.info(chalk.green('[System Information]'));
    console.info(
      'OS Version     :',
      chalk.blue(osName(platform(), release()), release()),
    );
    console.info('NodeJS Version :', chalk.blue(process.version));
    await this.displayPackageManagerVersion();
  }

  async displayPackageManagerVersion() {
    try {
      const version: string = await this.manager.version();
      console.info(
        `${this.manager.name} Version    :`,
        chalk.blue(version),
        '\n',
      );
    } catch {
      console.error(
        `${this.manager.name} Version    :`,
        chalk.red('Unknown'),
        '\n',
      );
    }
  }

  async displayHedHogInformation(): Promise<void> {
    this.displayCliVersion();
    console.info(chalk.green('[HedHog Platform Information]'));
    await this.displayHedHogInformationFromPackage();
  }

  async displayHedHogInformationFromPackage(): Promise<void> {
    try {
      const dependencies: PackageJsonDependencies =
        this.readProjectPackageDependencies();
      this.displayVersions(dependencies);
    } catch (err) {
      console.error(
        chalk.red(MESSAGES.HEDHOG_INFORMATION_PACKAGE_MANAGER_FAILED),
      );
    }
  }

  displayCliVersion(): void {
    console.info(chalk.green('[HedHog CLI]'));
    console.info(
      'HedHog CLI Version :',
      chalk.blue(
        JSON.parse(readFileSync(join(__dirname, '../package.json')).toString())
          .version,
      ),
      '\n',
    );
  }

  readProjectPackageDependencies(): PackageJsonDependencies {
    const buffer = readFileSync(join(process.cwd(), 'package.json'));
    const pack = JSON.parse(buffer.toString());
    const dependencies = { ...pack.dependencies, ...pack.devDependencies };
    Object.keys(dependencies).forEach((key) => {
      dependencies[key] = {
        version: dependencies[key],
      };
    });
    return dependencies;
  }

  displayVersions(dependencies: PackageJsonDependencies) {
    const _dependencies = this.buildHedhogVersionsMessage(dependencies);
    _dependencies.forEach((dependency) =>
      console.info(dependency.name, chalk.blue(dependency.value)),
    );

    this.displayWarningMessage(_dependencies);
  }

  displayWarningMessage(dependencies: HedHogDependency[]) {
    try {
      const warnings = this.buildHedHogVersionsWarningMessage(dependencies);
      const majorVersions = Object.keys(warnings);
      if (majorVersions.length > 0) {
        console.info('\r');
        console.info(chalk.yellow('[Warnings]'));
        console.info(
          'The following packages are not in the same major version',
        );
        console.info('This could lead to runtime errors');
        majorVersions.forEach((version) => {
          console.info(chalk.bold(`* Under version ${version}`));
          warnings[version].forEach(({ packageName, value }) => {
            console.info(`- ${packageName} ${value}`);
          });
        });
      }
    } catch {
      console.info('\t');
      console.error(
        chalk.red(
          MESSAGES.HEDHOG_INFORMATION_PACKAGE_WARNING_FAILED(
            this.warningMessageDependenciesWhiteList,
          ),
        ),
      );
    }
  }

  buildHedHogVersionsWarningMessage(
    hedHogDependencies: HedHogDependency[],
  ): HedHogDependencyWarnings {
    const unsortedWarnings = hedHogDependencies.reduce(
      (depWarningsGroup, { name, packageName, value }) => {
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
      },
      Object.create(null) as HedHogDependencyWarnings,
    );

    const unsortedMinorVersions = Object.keys(unsortedWarnings);
    if (unsortedMinorVersions.length <= 1) {
      return {};
    }

    const sortedMinorVersions = unsortedMinorVersions.sort(
      (versionA, versionB) => {
        const numA = parseFloat(versionA);
        const numB = parseFloat(versionB);

        if (isNaN(numA) && isNaN(numB)) {
          // If both are not valid numbers, maintain the current order.
          return 0;
        }

        // NaN is considered greater than any number, so if numA is NaN, place it later.
        return isNaN(numA) ? 1 : isNaN(numB) ? -1 : numB - numA;
      },
    );

    return sortedMinorVersions.reduce(
      (warnings, minorVersion) => {
        warnings[minorVersion] = unsortedWarnings[minorVersion];
        return warnings;
      },
      Object.create(null) as HedHogDependencyWarnings,
    );
  }

  buildHedhogVersionsMessage(
    dependencies: PackageJsonDependencies,
  ): HedHogDependency[] {
    const _dependencies = this.collectHedHogDependencies(dependencies);
    return this.format(_dependencies);
  }

  collectHedHogDependencies(
    dependencies: PackageJsonDependencies,
  ): HedHogDependency[] {
    const _dependencies: HedHogDependency[] = [];
    Object.keys(dependencies).forEach((key) => {
      if (key.indexOf('@hedhog') > -1) {
        const depPackagePath = require.resolve(key + '/package.json', {
          paths: [process.cwd()],
        });
        const depPackage = readFileSync(depPackagePath).toString();
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

  format(dependencies: HedHogDependency[]): HedHogDependency[] {
    const sorted = dependencies.sort(
      (dependencyA, dependencyB) =>
        dependencyB.name.length - dependencyA.name.length,
    );
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

  rightPad(name: string, length: number): string {
    while (name.length < length) {
      name = name.concat(' ');
    }
    return name;
  }
}
