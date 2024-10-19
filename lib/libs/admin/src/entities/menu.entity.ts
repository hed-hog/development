import { Entity, PrimaryGeneratedColumn, Column, JoinColumn } from 'typeorm';

@Entity({
  name: 'menus',
})
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @JoinColumn()
  @Column({
    nullable: true,
    unsigned: true,
  })
  menu_id?: string;

  @Column()
  slug: string;

  @Column({
    nullable: true,
  })
  url?: string;

  @Column({
    default: 0,
    unsigned: true,
  })
  order: number;

  @Column({
    nullable: true,
  })
  icon?: string;
}
