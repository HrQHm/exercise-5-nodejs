import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    const user = await this.repository.findOneOrFail({
      relations: ['games'],
      where: { 
        id:user_id 
      }
    });
    
    if(!user){
      throw new Error("User not found!");
    }
    return user;
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    return this.repository.query("SELECT * FROM USERS ORDER BY FIRST_NAME ASC"); // Complete usando raw query
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    return this.repository.query("SELECT * FROM USERS WHERE FIRST_NAME ILIKE $1 AND LAST_NAME ILIKE $2", [`${first_name}`, `${last_name}`]); // Complete usando raw query
  }
}
