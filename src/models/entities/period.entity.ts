import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { EventApplication } from './event_application.entity';
import { AssistantApplication } from './assistant_application.entity';
import { Assistant } from './assistant.entity';

@Entity('period')
export class Period {
  @PrimaryColumn()
  id: string;

  @Column()
  year: number;

  @Column()
  period: number;

  @OneToMany(() => EventApplication, (eventApplication) => eventApplication.period)
  eventApplications: EventApplication[];

  @OneToMany(() => AssistantApplication, (assistantApplication) => assistantApplication.period)
  assistantApplications: AssistantApplication[];

  @OneToMany(() => Assistant, (assistant) => assistant.period)
  assistants: Assistant[];
}