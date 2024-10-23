import { Entity, PrimaryGeneratedColumn, Column, JoinColumn } from "typeorm";

@Entity({
  name: "setting_groups",
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
