import { Entity, PrimaryGeneratedColumn, Column, JoinColumn } from 'typeorm';

@Entity({
  name: 'translations',
})
export class TranslationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @JoinColumn()
  locale_id: number;

  @JoinColumn()
  namespace_id: number;

  @Column()
  name: string;

  @Column()
  value: string;
}
