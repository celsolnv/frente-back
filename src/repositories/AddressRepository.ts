import { EntityRepository, Repository } from "typeorm";

import { Address } from "../entities/Address";

@EntityRepository(Address)
export class AddressRepository extends Repository<Address> {}
