import {E2eTestFixture} from "../../test/e2e-test-fixture";
import {FriendRequestStatus, FriendRequestResponse, User} from "../graphql";
import {PrismaService} from "../db/prisma.service";

const SEND_REQUEST = `
                    mutation ($username: String!) {
                        sendFriendRequest(username: $username)
                    }
                `

export const sendFriendRequest = (fixture, token, toUserName) =>
    fixture.requestWithToken(token)
        .send({
            query: SEND_REQUEST,
            variables: {
                username: toUserName
            }
        })
        .expect(200)

describe('friend request e2e testing', () => {
    let fixture: E2eTestFixture;
    let user: User;
    let token: string;
    let db: PrismaService;

    beforeAll(async () => {
        fixture = new E2eTestFixture();
        await fixture.init();
        ({user, token} = await fixture.createTestUserWithToken())
        db = fixture.getService(PrismaService);
    });

    afterAll( async () => {
        await fixture.close();
    });

    it('should send friend request successfully', async () => {
        const recipient = await fixture.createTestUser();
        const response = await sendFriendRequest(fixture, token, recipient.username);
        expect(response.body.data.sendFriendRequest).toEqual(FriendRequestResponse.success);

        const result = await db.friendRequestEntity.findFirst({
            where: {
                senderId: user.userId,
                recipientId: recipient.userId
            }
        })
        expect(result).toBeTruthy();
        expect(result.created).toBeTruthy();
        expect(result.status).toEqual(FriendRequestStatus.awaiting_response);
    });

    it('should not create additional requests if one exists already', async () => {
        const recipient = await fixture.createTestUser();
        await db.friendRequestEntity.create({
            data: {
                senderId: user.userId,
                recipientId: recipient.userId,
                status: FriendRequestStatus.accepted
            }
        })

        const response = await sendFriendRequest(fixture, token, recipient.username);

        expect(response.body.data.sendFriendRequest).toEqual(FriendRequestResponse.already_connected);
    });

    it('should connect users when both have sent requests', async () => {
        const recipient = await fixture.createTestUser();

        await db.friendRequestEntity.create({
            data: {
                senderId: recipient.userId,
                recipientId: user.userId,
                status: FriendRequestStatus.awaiting_response
            }
        })

        const response = await sendFriendRequest(fixture, token, recipient.username);

        expect(response.body.data.sendFriendRequest).toEqual(FriendRequestResponse.connected);

        const friends = await db.friendEntity.findMany({
            where: {
                OR: [
                    {userId: recipient.userId, toUserId: user.userId},
                    {userId: user.userId, toUserId: recipient.userId}
                ]
            }
        })

        expect(friends.length).toEqual(2);

        const requests = await db.friendRequestEntity.findMany({
            where: {
                OR: [
                    {senderId: user.userId, recipientId: recipient.userId},
                    {senderId: recipient.userId, recipientId: user.userId}
                ]
            }
        })

        expect(requests.length).toEqual(2);
        expect(requests[0].status).toEqual(FriendRequestStatus.accepted);
        expect(requests[1].status).toEqual(FriendRequestStatus.accepted);
    });
})

