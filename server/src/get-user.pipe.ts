import {Injectable, PipeTransform} from "@nestjs/common";
import {UserService} from "./user/user.service";
import {SessionsService} from "./sessions/sessions.service";

@Injectable()
export class GetUserPipe implements PipeTransform {
    constructor(private userService: UserService,
                private sessionsService: SessionsService) {
    }

    async transform(value: string) {
        // console.log(value);
        if (value) {
            const session = await this.sessionsService.get(value);
            return this.userService.getUser(session.userId);
        }
        return value;
        // return value;
    }

}