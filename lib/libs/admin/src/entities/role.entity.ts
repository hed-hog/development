import { Entity, PrimaryGeneratedColumn, Column, JoinColumn } from 'typeorm';

@Entity({
  name: 'roles',
})
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  slug: string;
}
