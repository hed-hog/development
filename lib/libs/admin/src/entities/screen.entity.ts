import { Entity, PrimaryGeneratedColumn, Column, JoinColumn } from 'typeorm';

@Entity({
  name: 'screens',
})
export class Screen {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  slug: string;

  @Column({
    nullable: true,
  })
  icon?: string;
}
