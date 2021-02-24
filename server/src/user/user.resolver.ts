import {Args, Context, Mutation, Query, Resolver} from "@nestjs/graphql";
import {UserService} from "./user.service";
import {CreateUserInput, CreateUserOutput} from "../db/graphql";
import {ServerResponse} from "http";
import {SessionsService} from "../sessions/sessions.service";
import {COOKIE_NAME} from "../app.module";

@Resolver('User')
export class UserResolver {
    constructor(private userService: UserService,
                private sessionService: SessionsService) {
    }

    @Query('user')
    async getUser(@Args('id') id: string) {
        return this.userService.getUser(id);
    }

    @Query('login')
    async login(@Args('username') username: string,
                @Args('password') password: string,
                @Context('authToken') token: string,
                @Context('res') res: ServerResponse) {
        const user = await this.userService.login(username, password);
        if (token) {
            this.sessionService.set(token, true);
        } else {
            res.setHeader('Set-Cookie', `${COOKIE_NAME}=${token}`)
        }
        return user;
    }

    @Mutation('createUser')
    async createUser(@Args('user') input: CreateUserInput, @Context('res') res: ServerResponse): Promise<CreateUserOutput> {
        const user = await this.userService.createUser(input);
        const token = await this.sessionService.create(user.userId);
        res.setHeader('Set-Cookie', `${COOKIE_NAME}=${token}`)
        return {user, sessionIsActive: true};
    }

    @Mutation('createRandomUser')
    async createRandomUser() {
        const input = {username: 'abc123', password: '123abc'}
        return this.userService.createUser(input);
    }

}
