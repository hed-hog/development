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
exports.Migration = void 0;
const typeorm_1 = require("typeorm");
const idColumn_1 = require("utils/idColumn");
const timestampColumn_1 = require("utils/timestampColumn");
const bcrypt = __importStar(require("bcrypt"));
class Migration {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'multifactors',
            columns: [
                (0, idColumn_1.idColumn)(),
                {
                    name: 'name',
                    type: 'varchar',
                },
                (0, timestampColumn_1.timestampColumn)(),
                (0, timestampColumn_1.timestampColumn)('updated_at'),
            ],
        }));
        await queryRunner.query(`
        INSERT INTO multifactors (name) VALUES
        ('Email'),
        ('Applicativo');
      `);
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'users',
            columns: [
                (0, idColumn_1.idColumn)(),
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
                },
                {
                    name: 'code',
                    type: 'varchar',
                    isNullable: true,
                },
                (0, timestampColumn_1.timestampColumn)(),
                (0, timestampColumn_1.timestampColumn)('updated_at'),
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
        const password = await bcrypt.hash(`hedhog`, 12);
        await queryRunner.query(`
          INSERT INTO users (name, email, password) VALUES
          ('Administrador', 'root@hcode.com.br', '${password}');
        `);
    }
    async down(queryRunner) {
        await queryRunner.dropTable('users');
        await queryRunner.dropTable('multifactors');
    }
}
exports.Migration = Migration;
//# sourceMappingURL=index.js.map