import {Injectable} from "@nestjs/common";
import {PrismaService} from "../db/prisma.service";
import {User, UserStatus} from "../db/graphql";
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

    createUser = async (input): Promise<User> => {
        const {username, password} = input;
        console.log(`creating user with username '${username}'`);
        const user = await this.db.userEntity.create({
            data: {username, password, status: UserStatus.ACTIVE},
            select: {username: true, userId: true, status: true, created: true}
        })
        return {...user, created: user.created.toISOString()} as User;
    }
}