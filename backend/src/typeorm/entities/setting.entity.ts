import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'setting',
})
export class Setting {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    length: 63,
  })
  slug: string;

  @Column({
    enum: ['string', 'number', 'boolean', 'json'],
  })
  type: string;

  @Column({
    length: 1023,
  })
  value: string;

  @Column({
    default: false,
  })
  userOverride: boolean;
}
