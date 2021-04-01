import {Injectable} from "@nestjs/common";
import {PrismaService} from "../db/prisma.service";
import {FriendsAdaptor} from "./friends.adaptor";

@Injectable()
export class FriendsService {
    constructor(private db: PrismaService,
                private adaptor: FriendsAdaptor) {
    }

    connect = async (userId1: string, userId2: string) => {
        await this.create(userId1, userId2);
        await this.create(userId2, userId1);
    }

    create = (ownerId: string, toUserId: string) => this.db.friendEntity.create({
            data: {
                toUserId,
                userId: ownerId
            }
    })

    getForUser = async (userId: string) => this.adaptor.toModels( await this.db.friendEntity.findMany({
        where: {
            userId
        }
    }))

    delete = async (userId1: string, userId2: string) => {
        await this.db.friendEntity.deleteMany({
            where: {
                OR: [
                    {AND: {userId: userId1, toUserId: userId2}},
                    {AND: {userId: userId2, toUserId: userId1}}
                ]
            }
        })
    }
}