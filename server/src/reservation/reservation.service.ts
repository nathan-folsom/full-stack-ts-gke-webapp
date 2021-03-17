import {Injectable} from "@nestjs/common";
import {PrismaService} from "../db/prisma.service";
import {CreateReservationInput, Reservation} from "../db/graphql";
import { ReservationEntity } from "@prisma/client";
import {UserService} from "../user/user.service";

@Injectable()
export class ReservationService {
    constructor(private db: PrismaService,
                private userService: UserService) {
    }

    createReservation = (input: CreateReservationInput, userId: string) => {
        const {time, location, message} = input;
        return this.db.reservationEntity.create({
            data: {
                time, location, message, userId
            }
        })
    }

    deleteReservation = (id: string) => this.db.reservationEntity.delete({
        where: {
            id
        }
    })

    getReservationsForUserId = (userId: string) => this.db.reservationEntity.findMany({
        where: {
            userId,
            time: {gte: new Date()}
        }
    })

    getAllReservationsForUserId = async (userId: string): Promise<Reservation[]> => {
        const friends = await this.db.friendEntity.findMany({where: {userId}});
        const friendIds = friends.map(e => e.userId);
        const allIds = [ ...friendIds, userId ];
        const allReservations = await Promise.all(allIds.map(id => this.getReservationsForUserId(id)));
        const flattened = this.flattenReservations(allReservations);
        const addedUsernames = this.addUsernames(flattened)
        return Promise.all(addedUsernames);
    }

    private flattenReservations = (all: ReservationEntity[][]) => {
        const reservations = [];
        all.forEach(item => {
            if (item instanceof Array) {
                item.forEach(i => reservations.push(i));
            } else {
                reservations.push(item);
            }
        })
        return reservations;
    }

    private addUsernames = (reservations: ReservationEntity[]) => {
        const userMap = new Map();
        return reservations.map(async (r) => {
            if (!userMap.has(r.userId)) {
                const user = await this.userService.getUser(r.userId);
                userMap.set(r.userId, user.username);
            }
            return {...r, username: userMap.get(r.userId)}
        });
    }

    getById = (id: string) => this.db.reservationEntity.findUnique({
        where: {
            id
        }
    })
}