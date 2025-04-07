import {
  Body,
  Delete,
  Get,
  HttpCode,
  JsonController,
  Param,
  Post,
  Put,
} from "routing-controllers";
import { User } from "../model/User";
import { UserService } from "../service/UserService";
import { Inject, Service } from "typedi";

@Service()
@JsonController("/user")
export class UserController {
  @Inject()
  private readonly userService: UserService;

  @Get()
  getAll(): Promise<Array<User>> {
    return this.userService.getAllUsers();
  }

  @Get("/:id")
  getUserById(@Param("id") id: string): Promise<User | null> {
    return this.userService.getUserById(id);
  }

  @Post()
  @HttpCode(201)
  async createUser(@Body() user: User): Promise<User> {
    return this.userService.createUser(user);
  }

  @Put("/:id")
  async updateUser(
    @Param("id") id: string,
    @Body() user: User
  ): Promise<User | null> {
    return this.userService.updateUser(id, user);
  }

  @Delete("/:id")
  @HttpCode(204)
  async deleteUser(@Param("id") id: string): Promise<boolean | void> {
    return this.userService.deleteUser(id);
  }
}
