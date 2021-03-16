import {Injectable} from "@nestjs/common";
import {PrismaService} from "../db/prisma.service";

@Injectable()
export class SessionsService {
    constructor(private db: PrismaService) {
    }

    create = (userId: string) => this.db.sessionEntity.create({
        data: {
            userId
        },
        select: {
            token: true
        }
    })

    get = (token: string) => this.db.sessionEntity.findUnique({
        where: {
            token
        }
    })

    delete = (token: string) => this.db.sessionEntity.delete({
        where: {token}
    })
}