import { Entity, PrimaryGeneratedColumn, Column, JoinColumn } from 'typeorm';

@Entity({
  name: 'multifactors',
})
export class Multifactor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  slug: string;
}
