import {Args, Mutation, Query, Resolver} from "@nestjs/graphql";
import {UserService} from "./user.service";
import {CreateUserInput, User} from "../db/graphql";

@Resolver('User')
export class UserResolver {
    constructor(private userService: UserService) {
    }

    @Query('user')
    async getUser(@Args('id') id: string) {
        return this.userService.getUser(id);
    }

    @Query('login')
    async login(@Args('username') username: string, @Args('password') password: string) {
        return this.userService.login(username, password);
    }

    @Mutation('createUser')
    async createUser(@Args('user') input: CreateUserInput): Promise<User> {
        return this.userService.createUser(input);
    }

    @Mutation('createRandomUser')
    async createRandomUser() {
        const input = {username: 'abc123', password: '123abc'}
        return this.userService.createUser(input);
    }

}
