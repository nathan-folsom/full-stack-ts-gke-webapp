import {Context, Query, Resolver} from "@nestjs/graphql";
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
}