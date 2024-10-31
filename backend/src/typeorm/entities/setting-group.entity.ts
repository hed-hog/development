import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'setting_group',
})
export class SettingGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 31,
  })
  icon: string;

  @Column({
    unique: true,
    length: 63,
  })
  slug: string;
}
