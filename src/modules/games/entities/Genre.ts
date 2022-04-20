import { Column, CreateDateColumn, PrimaryColumn, Entity } from "typeorm";

@Entity('genres')
export class Genre{
  @PrimaryColumn()
  id: string;

  @Column()
  genre: string;

  @CreateDateColumn()
  created_at: Date;
}