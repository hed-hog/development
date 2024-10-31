import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'multifactor',
})
export class Multifactor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  slug: string;
}
