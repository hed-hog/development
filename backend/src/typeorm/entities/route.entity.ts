import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'route',
})
export class Route {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column({
    enum: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT', 'OPTIONS', 'HEAD'],
  })
  method: string;
}
