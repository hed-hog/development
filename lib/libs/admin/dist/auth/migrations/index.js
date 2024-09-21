"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migrate = void 0;
const typeorm_1 = require("typeorm");
const utils_1 = require("@hedhog/utils");
const bcrypt = __importStar(require("bcrypt"));
class Migrate {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'multifactors',
            columns: [
                (0, utils_1.idColumn)(),
                {
                    name: 'name',
                    type: 'varchar',
                },
                (0, utils_1.timestampColumn)(),
                (0, utils_1.timestampColumn)('updated_at'),
            ],
        }));
        await queryRunner.manager
            .createQueryBuilder()
            .insert()
            .into('multifactors', ['name'])
            .values([
            {
                name: 'Email',
            },
            {
                name: 'Applicativo',
            },
        ])
            .execute();
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'users',
            columns: [
                (0, utils_1.idColumn)(),
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'email',
                    type: 'varchar',
                },
                {
                    name: 'password',
                    type: 'varchar',
                },
                {
                    name: 'multifactor_id',
                    type: 'int',
                    isNullable: true,
                    unsigned: true,
                },
                {
                    name: 'code',
                    type: 'varchar',
                    isNullable: true,
                },
                (0, utils_1.timestampColumn)(),
                (0, utils_1.timestampColumn)('updated_at'),
            ],
        }));
        await queryRunner.createForeignKeys('users', [
            new typeorm_1.TableForeignKey({
                columnNames: ['multifactor_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'multifactors',
                name: 'fk_users_to_multifactors_on_multifactor_id',
                onDelete: 'Cascade',
            }),
        ]);
        await queryRunner.manager
            .createQueryBuilder()
            .insert()
            .into('users', ['name', 'email', 'password'])
            .values([
            {
                name: 'Superuser',
                email: 'root@hedhog.com',
                password: await bcrypt.hash(`hedhog`, 12),
            },
            {
                name: 'User',
                email: 'user@hedhog.com',
                password: await bcrypt.hash(`hedhog`, 12),
            },
        ])
            .execute();
    }
    async down(queryRunner) {
        await queryRunner.dropTable('multifactors');
        await queryRunner.dropTable('users');
    }
}
exports.Migrate = Migrate;
//# sourceMappingURL=index.js.map