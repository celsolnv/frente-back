import { getCustomRepository } from "typeorm";

import { AddressRepository } from "../repositories/AddressRepository";
import { UserRepository } from "../repositories/UserRepository";
// eslint-disable-next-line @typescript-eslint/naming-convention
export interface ICreateUserData {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
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
  try {
    // Verificar se não existi outro usuário com o mesmo cpf ou email
    // Verificar se as senhas batem
    // Limpar as mascaras do cep e do cpf
    // Verificar formato da data
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
  } catch (error) {
    console.log(error);
    throw new Error("Error in create user!");
  }
}
