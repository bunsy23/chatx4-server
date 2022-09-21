import { User, Conversation } from 'src/utils/typeorm';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'messages' })
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => User, (user) => user.messages)
  author: User;

  @ManyToOne(() => Conversation, (conversation) => conversation.messages, {
    cascade: ['insert', 'remove', 'update'],
  })
  conversation: Conversation;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: number;
}
