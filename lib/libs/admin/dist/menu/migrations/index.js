"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migrate = void 0;
const typeorm_1 = require("typeorm");
const utils_1 = require("@hedhog/utils");
class Migrate {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'menus',
            columns: [
                (0, utils_1.idColumn)(),
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'url',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'order',
                    type: 'int',
                    default: 0,
                    unsigned: true,
                },
                {
                    name: 'menu_id',
                    type: 'int',
                    isNullable: true,
                    unsigned: true,
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
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'menu_screens',
            columns: [
                {
                    name: 'menu_id',
                    type: 'int',
                    isPrimary: true,
                    unsigned: true,
                },
                {
                    name: 'screen_id',
                    type: 'int',
                    isPrimary: true,
                    unsigned: true,
                },
            ],
        }));
        await queryRunner.createForeignKey('menu_screens', new typeorm_1.TableForeignKey({
            columnNames: ['menu_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'menus',
            onDelete: 'CASCADE',
        }));
        await queryRunner.createForeignKey('menu_screens', new typeorm_1.TableForeignKey({
            columnNames: ['screen_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'screens',
            onDelete: 'CASCADE',
        }));
        //System Populating
        await this.insertMenu(queryRunner, 'Dashboard', '/', 0, null, 'dashboard');
        const managementId = await this.insertMenu(queryRunner, 'Management', null, 1, null, 'settings');
        await this.insertMenu(queryRunner, 'Users', '/management/users', 0, managementId, 'users');
        await this.insertMenu(queryRunner, 'Roles', '/management/roles', 1, managementId, 'circles');
        await this.insertMenu(queryRunner, 'Screens', '/management/screens', 2, managementId, 'monitor');
        await this.insertMenu(queryRunner, 'Menus', '/management/menus', 3, managementId, 'menu');
    }
    async insertMenu(queryRunner, name, url, order, menuId, icon) {
        const result = await queryRunner.manager
            .createQueryBuilder()
            .insert()
            .into('menus')
            .values({
            name,
            url,
            order,
            menu_id: menuId,
            icon,
        })
            .returning('id')
            .execute();
        return result.raw[0].id;
    }
    async down(queryRunner) {
        await queryRunner.dropTable('menu_screens');
        await queryRunner.dropTable('menus');
    }
}
exports.Migrate = Migrate;
//# sourceMappingURL=index.js.map