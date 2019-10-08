import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  BeforeInsert,
  BeforeUpdate
} from 'typeorm';
import bcrypt from 'bcryptjs';
import { ObjectType, Field, ID, Root } from 'type-graphql';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  firstName!: string;

  @Field()
  @Column()
  lastName!: string;

  @Field()
  @Column('text', { unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column('boolean', { default: false })
  confirmed!: boolean;

  @Field(() => String)
  name(@Root() parent: User): string {
    return `${parent.firstName} ${parent.lastName}`;
  }

  async comparePassword(password: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
  }

  @BeforeInsert()
  async hashPassword1() {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
  }
}
