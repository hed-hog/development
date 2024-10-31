import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'locale',
})
export class Locale {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id: number;

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
