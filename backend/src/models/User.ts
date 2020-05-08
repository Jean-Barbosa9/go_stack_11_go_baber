import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
 } from 'typeorm'

 @Entity('user')
 class User {
   @PrimaryGeneratedColumn()
   id: String;

   @Column()
   name: String;

   @Column()
   email: String;

   @Column()
   password: String;

   @CreateDateColumn()
   created_at: Date;

   @UpdateDateColumn()
   updated_at: Date;
 }

 export default User;
