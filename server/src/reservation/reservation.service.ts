import {Injectable} from "@nestjs/common";
import {PrismaService} from "../db/prisma.service";
import {CreateReservationInput} from "../db/graphql";
import { ReservationEntity } from "@prisma/client";

@Injectable()
export class ReservationService {
    constructor(private db: PrismaService) {
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
            userId
        }
    })

    getAllReservationsForUserId = async (userId: string) => {
        const friends = await this.db.friendEntity.findMany({where: {userId}});
        const friendIds = friends.map(e => e.userId);
        const allIds = [ ...friendIds, userId ];
        const allReservations = await Promise.all(allIds.map(id => this.getReservationsForUserId(id)));
        return this.flattenReservations(allReservations);
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

    getById = (id: string) => this.db.reservationEntity.findUnique({
        where: {
            id
        }
    })
}