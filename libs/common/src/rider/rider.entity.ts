import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity('Rider')
export class Rider {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  fullName: string;

  @Column({ nullable: false, unique: true })
  @Index()
  phoneNumber: string;

  @Column({ default: true })
  isActive: boolean;

  @Column('varchar', { array: true, nullable: true })
  riderDocuments: string[];

  @Column({ type: 'jsonb', nullable: true })
  vechileDetails: {
    vechileNumber: string;
    vechileRegistrationNumber: string;
    vechileDocuments: string[];
  };

  @Column({ default: false })
  isVerified: boolean;

  @Column({ type: 'jsonb', nullable: true })
  location: {
    lat: string;
    lon: string;
  };

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
