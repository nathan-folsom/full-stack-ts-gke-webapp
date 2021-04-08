import {Args, Context, Mutation, Resolver} from "@nestjs/graphql";
import {GetUserPipe} from "../get-user.pipe";
import {FriendRequestResponse, User} from "../graphql";
import {FriendRequestService} from "./friend-request.service";

@Resolver('FriendRequest')
export class FriendRequestResolver {
    constructor(private friendRequestService: FriendRequestService) {
    }

    @Mutation()
    async sendFriendRequest(
        @Context('authToken', GetUserPipe) userPromise: Promise<User>,
        @Args('username') username: string
    ): Promise<FriendRequestResponse> {
        const user = await userPromise;
        if (user && username !== user.username && username) {
            return this.friendRequestService.send(username, user.userId);
        }
        return FriendRequestResponse.invalid;
    }
}