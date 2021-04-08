import {Injectable} from "@nestjs/common";
import { FriendEntity } from "@prisma/client";
import {UserService} from "../user/user.service";
import {Friend} from "../graphql";

@Injectable()
export class FriendsAdaptor {

    constructor(private userService: UserService) {
    }

    toModels = (entities: FriendEntity[]): Promise<Friend[]> => Promise.all(entities.map(this.toModel));

    toModel = async (entity: FriendEntity): Promise<Friend> => ({
        userId: entity.toUserId,
        username: (await this.userService.getUser(entity.toUserId)).username,
        created: entity.created
    })

}
