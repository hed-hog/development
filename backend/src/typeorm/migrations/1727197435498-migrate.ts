import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrate1727197435498 implements MigrationInterface {
  async up(queryRunner: QueryRunner) {
    const screenIdScreen = await queryRunner.manager
      .createQueryBuilder()
      .select()
      .from('screens', 's')
      .where('slug = :slug', { slug: '/management/screens' })
      .execute();

    const screenIdRole = await queryRunner.manager
      .createQueryBuilder()
      .select()
      .from('screens', 's')
      .where('slug = :slug', { slug: '/management/roles' })
      .execute();

    const screenIdUser = await queryRunner.manager
      .createQueryBuilder()
      .select()
      .from('screens', 's')
      .where('slug = :slug', { slug: '/management/users' })
      .execute();

    const screenIdMenu = await queryRunner.manager
      .createQueryBuilder()
      .select()
      .from('screens', 's')
      .where('slug = :slug', { slug: '/management/menus' })
      .execute();

    const screenIdRoute = await queryRunner.manager
      .createQueryBuilder()
      .select()
      .from('screens', 's')
      .where('slug = :slug', { slug: '/management/routes' })
      .execute();

    const screenIdSetting = await queryRunner.manager
      .createQueryBuilder()
      .select()
      .from('screens', 's')
      .where('slug = :slug', { slug: '/management/settings' })
      .execute();

    const screenIdPerson = await queryRunner.manager
      .createQueryBuilder()
      .select()
      .from('screens', 's')
      .where('slug = :slug', { slug: '/management/persons' })
      .execute();

    const screenIdAddressType = await queryRunner.manager
      .createQueryBuilder()
      .select()
      .from('screens', 's')
      .where('slug = :slug', { slug: '/management/address-types' })
      .execute();

    const screenIdContactType = await queryRunner.manager
      .createQueryBuilder()
      .select()
      .from('screens', 's')
      .where('slug = :slug', { slug: '/management/contact-types' })
      .execute();

    const screenIdCustomType = await queryRunner.manager
      .createQueryBuilder()
      .select()
      .from('screens', 's')
      .where('slug = :slug', { slug: '/management/custom-types' })
      .execute();

    const screenIdDocumentType = await queryRunner.manager
      .createQueryBuilder()
      .select()
      .from('screens', 's')
      .where('slug = :slug', { slug: '/management/document-types' })
      .execute();

    const screenIdPersonType = await queryRunner.manager
      .createQueryBuilder()
      .select()
      .from('screens', 's')
      .where('slug = :slug', { slug: '/management/person-types' })
      .execute();

    for (const { url, screendId } of [
      { url: '/screens%', screendId: screenIdScreen[0].id },
      { url: '/roles%', screendId: screenIdRole[0].id },
      { url: '/users%', screendId: screenIdUser[0].id },
      { url: '/menus%', screendId: screenIdMenu[0].id },
      { url: '/routes%', screendId: screenIdRoute[0].id },
      { url: '/settings%', screendId: screenIdSetting[0].id },
      { url: '/persons%', screendId: screenIdPerson[0].id },
      { url: '/address-types%', screendId: screenIdAddressType[0].id },
      { url: '/contact-types%', screendId: screenIdContactType[0].id },
      { url: '/custom-types%', screendId: screenIdCustomType[0].id },
      { url: '/document-types%', screendId: screenIdDocumentType[0].id },
      { url: '/person-types%', screendId: screenIdPersonType[0].id },
    ]) {
      const routesScreens = await queryRunner.manager
        .createQueryBuilder()
        .select()
        .from('routes', 's')
        .where('s.url LIKE :url', { url })
        .execute();

      for (const route of routesScreens) {
        await queryRunner.manager
          .createQueryBuilder()
          .insert()
          .into('route_screens')
          .values({
            route_id: route.id,
            screen_id: screendId,
          })
          .execute();
      }
    }
  }

  async down(queryRunner: QueryRunner) {
    await queryRunner.manager.delete('route_screens', {});
  }
}
