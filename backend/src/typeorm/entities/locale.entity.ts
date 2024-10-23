import { Entity, PrimaryGeneratedColumn, Column, JoinColumn } from "typeorm";

@Entity({
  name: "locales",
})
export class Locale {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id: number;

  @JoinColumn()
  @Column({
    unsigned: true,
  })
  country_id: number;

  @Column({
    length: 2,
  })
  code: string;

  @Column({
    length: 2,
  })
  region: string;

  @Column()
  enabled: boolean;
}
