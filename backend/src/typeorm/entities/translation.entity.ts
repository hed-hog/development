import { Column, Entity, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'translation',
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
