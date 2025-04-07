import { Service } from "typedi";
// import { InjectRepository } from "typeorm-typedi-extensions";
import { Repository } from "typeorm";
import { User } from "../model/User";
import { AppDataSource } from "../../ormconfig";
import { NotFoundError } from "node_modules/routing-controllers/types";

@Service()
export class UserService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  getUserById(id: string): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  createUser(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async updateUser(id: string, user: User): Promise<User | null> {
    const userExisti = await this.getUserById(id);

    if (!userExisti) {
      throw new Error(`User with id ${id} not found`);
    }

    return this.userRepository.save({ ...user, id });
  }

  async deleteUser(id: string): Promise<boolean | void> {
    const user = await this.getUserById(id);

    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }

    await this.userRepository.delete(id);
    return true;
  }
}
