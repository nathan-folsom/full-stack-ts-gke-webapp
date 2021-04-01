import {Injectable} from "@nestjs/common";
import {PrismaService} from "../db/prisma.service";

@Injectable()
export class FriendsService {
    constructor(private db: PrismaService) {
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

    getForUser = (userId: string) => this.db.friendEntity.findMany({
        where: {
            userId
        }
    })

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