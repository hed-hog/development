"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageManagerFactory = void 0;
const fs = require("fs");
const npm_package_manager_1 = require("./npm.package-manager");
const package_manager_1 = require("./package-manager");
const yarn_package_manager_1 = require("./yarn.package-manager");
const pnpm_package_manager_1 = require("./pnpm.package-manager");
class PackageManagerFactory {
    static create(name) {
        switch (name) {
            case package_manager_1.PackageManager.NPM:
                return new npm_package_manager_1.NpmPackageManager();
            case package_manager_1.PackageManager.YARN:
                return new yarn_package_manager_1.YarnPackageManager();
            case package_manager_1.PackageManager.PNPM:
                return new pnpm_package_manager_1.PnpmPackageManager();
            default:
                throw new Error(`Package manager ${name} is not managed.`);
        }
    }
    static async findManager() {
        const DEFAULT_PACKAGE_MANAGER = package_manager_1.PackageManager.NPM;
        try {
            const files = await fs.promises.readdir(process.cwd());
            const hasYarnLockFile = files.includes('yarn.lock');
            if (hasYarnLockFile) {
                return package_manager_1.PackageManager.YARN;
            }
            const hasPnpmLockFile = files.includes('pnpm-lock.yaml');
            if (hasPnpmLockFile) {
                return package_manager_1.PackageManager.PNPM;
            }
            return DEFAULT_PACKAGE_MANAGER;
        }
        catch (error) {
            return DEFAULT_PACKAGE_MANAGER;
        }
    }
    static async find() {
        return this.create(await this.findManager());
    }
}
exports.PackageManagerFactory = PackageManagerFactory;
