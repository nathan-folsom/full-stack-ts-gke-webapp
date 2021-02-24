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

    isActive = (token: string) => {
        console.log('finding session for token: ' + token)
        return this.db.sessionEntity.findUnique({
            where: {
                token
            },
            select: {
                active: true
            }
        });
    }

    set = (token: string, active: boolean) => this.db.sessionEntity.update({
        where: {
            token
        },
        data: {
            active
        }
    })
}