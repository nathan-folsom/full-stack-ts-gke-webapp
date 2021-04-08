import {Injectable} from "@nestjs/common";
import {PrismaService} from "../db/prisma.service";
import {FriendRequestResponse, FriendRequestStatus} from "../graphql";
import {UserService} from "../user/user.service";
import {FriendRequestEntity} from "@prisma/client";
import {FriendsService} from "../friends/friends.service";

@Injectable()
export class FriendRequestService {
    constructor(private db: PrismaService,
                private userService: UserService,
                private friendService: FriendsService) {
    }

    send = async (toUserName: string, fromUserId: string): Promise<FriendRequestResponse> => {
        const toUser = await this.userService.getUserByName(toUserName);
        if (!toUser) {
            return FriendRequestResponse.username_not_found;
        }
        try {
            const request = await this.create(toUser.userId, fromUserId);
            const preexisting = await this.connectUsersIfBothRequestedFriendship(request);
            return preexisting ? FriendRequestResponse.connected : FriendRequestResponse.success;
        } catch (e) {
            const preexisting = await this.find(fromUserId, toUser.userId);
            switch (preexisting.status) {
                case FriendRequestStatus.awaiting_response:
                    return FriendRequestResponse.success;
                case FriendRequestStatus.accepted:
                    return FriendRequestResponse.already_connected;
                case FriendRequestStatus.rejected:
                    return FriendRequestResponse.success;
                default:
                    return FriendRequestResponse.success;
            }
        }
    }

    create = (toUserId: string, fromUserId: string) => this.db.friendRequestEntity.create({
        data: {
            senderId: fromUserId,
            recipientId: toUserId,
            status: FriendRequestStatus.awaiting_response
        }
    })

    find = async (fromUserId: string, toUserId: string) => this.db.friendRequestEntity.findFirst({
        where: {
            senderId: fromUserId,
            recipientId: toUserId
        }
    })

    private connectUsersIfBothRequestedFriendship = async (request: FriendRequestEntity) => {
        const preexistingRequest = await this.db.friendRequestEntity.findFirst({
            where: {
                senderId: request.recipientId,
                recipientId: request.senderId,
                status: FriendRequestStatus.awaiting_response
            }
        })
        if (preexistingRequest) {
            await this.friendService.connect(request.senderId, request.recipientId);
            await this.updateRequestStatus(FriendRequestStatus.accepted, preexistingRequest.id);
            await this.updateRequestStatus(FriendRequestStatus.accepted, request.id);
            return true;
        }
        return false;
    }

    private updateRequestStatus = async (newStatus: FriendRequestStatus, id: string) =>
        this.db.friendRequestEntity.update({
            where: {
                id
            }, data: {
                status: newStatus
            }
        })
}