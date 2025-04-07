import { Service } from "typedi";
// import { InjectRepository } from "typeorm-typedi-extensions";
import { Repository } from "typeorm";
import { User } from "../model/User";
import { AppDataSource } from "../../ormconfig";

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

  updateUser(id: string, user: User): Promise<User | null> {
    return this.userRepository.save({ ...user, id });
  }

  deleteUser(id: string): Promise<void> {
    return this.userRepository.delete(id).then(() => undefined);
  }
}
