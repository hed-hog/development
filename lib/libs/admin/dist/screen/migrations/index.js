"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migrate = void 0;
const utils_1 = require("@hedhog/utils");
const typeorm_1 = require("typeorm");
class Migrate {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'screens',
            columns: [
                (0, utils_1.idColumn)(),
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'slug',
                    type: 'varchar',
                    isUnique: true,
                },
                {
                    name: 'description',
                    type: 'varchar',
                },
                {
                    name: 'icon',
                    type: 'varchar',
                    isNullable: true,
                },
                (0, utils_1.timestampColumn)(),
                (0, utils_1.timestampColumn)('updated_at'),
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('screens');
    }
}
exports.Migrate = Migrate;
//# sourceMappingURL=index.js.map