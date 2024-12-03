import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { Subject } from './subject.entity'; 
import { User } from './user.entity'; 
import { Period } from './period.entity'; 
import { EventApplication } from './event_application.entity';
import { StateApplication } from './state_application.entity';


@Entity('assistant_application')
export class AssistantApplication {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Subject, (subject) => subject.assistantApplications, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'subject_id' })
  subject: Subject;

  @ManyToOne(() => User, (user) => user.assistantApplications, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Period, (period) => period.assistantApplications, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'period_id' })
  period: Period;

  @ManyToOne(() => EventApplication, (eventApplication) => eventApplication.assistantApplications, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'event_id' })
  event: EventApplication;

  @ManyToOne(() => StateApplication, (stateApplication) => stateApplication.assistantApplications, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'state_id' })
  state: StateApplication;

  @ManyToOne(() => User, (user) => user.assistantApplications, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'last_editor_id' })
  lastEditor: User;

  @Column()
  date: Date;
}
