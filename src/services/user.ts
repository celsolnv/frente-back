import { getCustomRepository } from "typeorm";

import { UserAlreadyExists } from "../errors/UserAlreadyExists";
import { AddressRepository } from "../repositories/AddressRepository";
import { UserRepository } from "../repositories/UserRepository";
// eslint-disable-next-line @typescript-eslint/naming-convention
export interface ICreateUserData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  bird_date: Date;
  cpf: string;
  cep: string;
  uf: string;
  city: string;
  district: string;
  street: string;
  identification_number: string;
}

export async function createUser(data: ICreateUserData) {
  const userRepository = getCustomRepository(UserRepository);
  const addressRepository = getCustomRepository(AddressRepository);
  const userAlreadyExist = await userRepository.findOne({
    where: [{ cpf: data.cpf }, { email: data.email }],
  });
  if (userAlreadyExist) {
    throw new UserAlreadyExists();
  }
  const address = addressRepository.create({
    cep: data.cep,
    uf: data.uf,
    city: data.city,
    district: data.district,
    street: data.street,
    identification_number: data.identification_number,
  });

  await addressRepository.save(address);

  const user = userRepository.create({
    name: data.name,
    address,
    cpf: data.cpf,
    birdDate: data.bird_date,
    email: data.email,
    password: data.password,
  });
  await userRepository.save(user);

  return user;
}
