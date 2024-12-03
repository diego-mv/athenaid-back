import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Subject } from './subject.entity';


@Entity('subject_coordinator')
export class SubjectCoordinator {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => User, (user) => user.subjectCoordinators)
  @JoinColumn({ name: 'coordinator_id' })
  coordinator: User;

  @ManyToOne(() => Subject, (subject) => subject.subjectCoordinators)
  @JoinColumn({ name: 'subject_id' })
  subject: Subject;
}
