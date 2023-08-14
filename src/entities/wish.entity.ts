import { BaseEntity } from 'src/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { IsInt, IsNumber, IsString, IsUrl, Length } from 'class-validator';
import { User } from './user.entity';
import { Offer } from './offer.entity';

@Entity()
export class Wish extends BaseEntity {
  @Column()
  @Length(1, 250)
  @IsString()
  name!: string;

  @Column()
  @IsUrl()
  link!: string;

  @Column()
  @IsUrl()
  image!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @IsNumber()
  price!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @IsNumber()
  raised!: number;

  @Column({ type: 'integer', default: 0 })
  @IsInt()
  copied!: number;

  @Column()
  @Length(1, 1024)
  @IsString()
  description!: string;

  @ManyToOne(() => User, (user) => user.wishes)
  owner: User;

  @ManyToOne(() => Offer, (offer) => offer.item)
  offers: Offer[];
}
