import {Args, Context, Mutation, Query, Resolver} from "@nestjs/graphql";
import {UserService} from "./user.service";
import {CreateUserInput} from "../db/graphql";
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

    @Mutation('login')
    async login(@Args('username') username: string,
                @Args('password') password: string,
                @Context('res') res: ServerResponse) {
        const user = await this.userService.login(username, password);
        if (user) {
            const session = await this.sessionService.getForUser(user.userId);
            this.sessionService.set(session.token, true);
            res.setHeader('Set-Cookie', `${COOKIE_NAME}=${session.token}`);
            return user;
        }
    }

    @Mutation()
    async logout(@Context('authToken') token: string) {
        const logout = await this.userService.logout(token);
        return !logout.active;
    }

    @Mutation('createUser')
    async createUser(@Args('user') input: CreateUserInput, @Context('res') res: ServerResponse) {
        const user = await this.userService.createUser(input);
        const session = await this.sessionService.create(user.userId);
        res.setHeader('Set-Cookie', `${COOKIE_NAME}=${session.token}`)
        return user;
    }
}
