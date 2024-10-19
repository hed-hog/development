import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({
  name: 'countries',
})
export class Country {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id: number;

  @Column()
  name: string;

  @Column({
    length: 3,
  })
  code: string;
}
