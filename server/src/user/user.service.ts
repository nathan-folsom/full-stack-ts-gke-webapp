import {Injectable} from "@nestjs/common";
import {PrismaService} from "../db/prisma.service";
import {User, UserStatus} from "../db/graphql";

@Injectable()
export class UserService {
    constructor(private db: PrismaService) {
    }

    getUser = (userId: string, includeOwnReservations?: boolean, includeFriends?: boolean) => {
        return this.db.user.findUnique(
            {
                where: {userId},
                include: {reservations: !!includeOwnReservations, friends: !!includeFriends}
            })
    }

    createUser = async (input): Promise<User> => {
        console.log(input);
        const {username, password} = input;
        const user = await this.db.user.create({
            data: {username, password, status: UserStatus.ACTIVE},
            select: {username: true, userId: true, status: true, created: true}
        })
        return {...user, created: user.created.toISOString()} as User;
    }
}