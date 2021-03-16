import {Injectable, PipeTransform} from "@nestjs/common";
import {UserService} from "./user/user.service";
import {SessionsService} from "./sessions/sessions.service";

@Injectable()
export class GetUserPipe implements PipeTransform {
    constructor(private userService: UserService,
                private sessionsService: SessionsService) {
    }

    async transform(authToken: string) {
        if (authToken) {
            const session = await this.sessionsService.get(authToken);
            return session ? this.userService.getUser(session.userId) : authToken;
        }
        return authToken;
    }

}