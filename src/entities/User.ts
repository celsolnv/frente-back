import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";

import { Address } from "./Address";

@Entity("users")
export class User {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  cpf: string;

  @CreateDateColumn({ name: "bird_date" })
  birdDate: Date;

  @OneToOne(() => Address)
  @JoinColumn({ name: "address_id" })
  address: Address;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
