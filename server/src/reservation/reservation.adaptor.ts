import {ReservationEntity} from "@prisma/client";
import {Reservation} from "../db/graphql";
import {UserService} from "../user/user.service";
import {Injectable} from "@nestjs/common";

@Injectable()
export class ReservationAdaptor {

    constructor(private userService: UserService) {
    }

    toGql = async (entity: ReservationEntity): Promise<Reservation> => {
        const user = await this.userService.getUser(entity.userId);
        return {...entity, username: user.username};
    }

    toGqls = async (entities: ReservationEntity[]): Promise<Reservation[]> => {
        const userMap = new Map();
        const gqls = entities.map(async (r) => {
            if (!userMap.has(r.userId)) {
                const user = await this.userService.getUser(r.userId);
                userMap.set(r.userId, user.username);
            }
            return {...r, username: userMap.get(r.userId)}
        });
        return Promise.all(gqls);
    }
}