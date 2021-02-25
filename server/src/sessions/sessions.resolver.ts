import {Args, Context, Query, Resolver} from "@nestjs/graphql";
import {SessionsService} from "./sessions.service";

@Resolver('Session')
export class SessionsResolver {
    constructor(private service: SessionsService) {
    }

    @Query('sessionIsActive')
    async activeSessionForUser(@Context('authToken') token: string) {
        if (!token) {
            return false;
        }
        return this.service.isActive(token);
    }

    @Query('getToken')
    async getToken(@Args('userId') userId: string) {
        const session = await this.service.getForUser(userId);
        return session.token;
    }
}