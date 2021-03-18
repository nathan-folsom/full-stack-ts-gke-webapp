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

    createUser = async (input: {username: string, password: string}): Promise<User> => {
        const {username, password} = input;
        const entity = await this.db.userEntity.create({
            data: {username, password, status: UserStatus.ACTIVE},
            select: {username: true, userId: true, status: true, created: true}
        });
        console.log(`created user with username '${username}'`);
        return entity as User;
    }

    deleteUser = async (userId: string) => {
        const user = await this.db.userEntity.delete({
            where: {
                userId
            }
        });
        console.log(`deleted user with username '${user.username}'`);
        return user;
    }
}