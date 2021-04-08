import {Args, Context, Mutation, Query, Resolver} from "@nestjs/graphql";
import {FriendsService} from "./friends.service";
import {GetUserPipe} from "../get-user.pipe";
import {Friend, User} from "../graphql";

@Resolver('Friend')
export class FriendsResolver {
    constructor(private friendService: FriendsService) {
    }

    @Query('getFriends')
    async getFriendsForUser(
        @Context('authToken', GetUserPipe) userPromise: Promise<User>
    ): Promise<Friend[]> {
        const user = await userPromise;
        if (user) {
            return this.friendService.getForUser(user.userId);
        }
        return undefined
    }

    @Mutation('deleteFriend')
    async deleteFriend(
        @Context('authToken', GetUserPipe) userPromise: Promise<User>,
        @Args('id') userId: string
    ): Promise<boolean> {
        const user = await userPromise;
        if (user) {
            await this.friendService.delete(user.userId, userId);
            return true;
        }
        return undefined;
    }
}