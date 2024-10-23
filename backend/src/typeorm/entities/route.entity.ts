import { Entity, PrimaryGeneratedColumn, Column, JoinColumn } from "typeorm";

@Entity({
  name: "routes",
})
export class Route {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column({
    enum: ["GET", "POST", "PATCH", "DELETE", "PUT", "OPTIONS", "HEAD"],
  })
  method: string;
}
