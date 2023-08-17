import { Column, Entity, ManyToMany, ManyToOne, JoinTable } from 'typeorm';
import { IsOptional, IsString, IsUrl, Length } from 'class-validator';
import { User } from './user.entity';
import { Wish } from './wish.entity';
import { BaseEntity } from 'src/entities/base.entity';

@Entity()
export class Wishlist extends BaseEntity {
  @Column()
  @Length(1, 250)
  @IsString()
  name: string;

  @Column()
  @Length(1, 1500)
  @IsOptional()
  @IsString()
  description: string;

  @Column()
  @IsUrl()
  image: string;

  @ManyToOne(() => User, (user) => user.wishlists)
  owner: User;

  @ManyToMany(() => Wish, (wish) => wish.name)
  @JoinTable()
  items: Wish[];
}
