import {Injectable} from "@nestjs/common";
import {PrismaService} from "../db/prisma.service";
import {UserStatus} from "../db/graphql";
import {UserEntity} from "@prisma/client";

@Injectable()
export class UserService {
    constructor(private db: PrismaService) {
    }

    getUser = (userId: string, includeOwnReservations?: boolean, includeFriends?: boolean) => {
        return this.db.userEntity.findUnique(
            {
                where: {userId},
                include: {reservations: !!includeOwnReservations, friends: !!includeFriends}
            })
    }

    getUserByName = (username: string) => this.db.userEntity.findUnique({
        where: {
            username
        }
    })

    login = async (username: string, password: string) => {
        const user: UserEntity = await this.db.userEntity.findUnique({
            where: {
                username
            }
        });
        if (user && user.password === password) {
            return user
        }
        return undefined
    }

    logout = (token: string) => this.db.sessionEntity.update({
        where: {
            token
        },
        data: {
            active: false
        }
    })

    createUser = async (input) => {
        const {username, password} = input;
        console.log(`creating user with username '${username}'`);
        return this.db.userEntity.create({
            data: {username, password, status: UserStatus.ACTIVE},
            select: {username: true, userId: true, status: true, created: true}
        });
    }

    deleteUser = async (userId: string) => this.db.userEntity.delete({
        where: {
            userId
        }
    })
}