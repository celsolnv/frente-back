import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("address")
export class Address {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  cep: string;

  @Column()
  uf: string;

  @Column()
  city: string;

  @Column()
  district: string;

  @Column()
  street: string;

  @Column()
  identification_number: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
