import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/entities/base.entity';
import { IsEmail, IsString, IsUrl, Length } from 'class-validator';
import { Wish } from './wish.entity';
import { Offer } from './offer.entity';
import { Wishlist } from './wishlist.entity';

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true })
  @IsString()
  @Length(1, 64)
  username!: string;

  @Column({ default: 'Пока ничего не рассказал о себе' })
  @IsString()
  @Length(1, 200)
  about: string;

  @Column({ default: 'https://i.pravatar.cc/300' })
  @IsUrl()
  avatar: string;

  @Column({ unique: true })
  @IsEmail()
  email!: string;

  @Column()
  @IsString()
  password!: string;

  @OneToMany(() => Wish, (wish) => wish.owner)
  wishes: Wish[];

  @OneToMany(() => Offer, (offer) => offer.user)
  offers: Offer[];

  @OneToMany(() => Wishlist, (wishlist) => wishlist.owner)
  wishlists: Wishlist[];
}
