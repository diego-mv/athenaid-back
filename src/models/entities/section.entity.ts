import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Subject } from './subject.entity'; 
import { Assistant } from './assistant.entity';

@Entity('section')
export class Section {
  @PrimaryColumn()
  id: string;

  @Column({ length: 64 })
  code: string;

  @Column({ default: true })
  active: boolean;

  @ManyToOne(() => Subject, (subject) => subject.sections, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'subject_id' })
  subject: Subject;

  @OneToMany(() => Assistant, (assistant) => assistant.section, { nullable: false, onDelete: 'CASCADE' })
  assistants: Assistant[];
}
