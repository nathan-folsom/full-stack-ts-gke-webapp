import {Injectable} from "@nestjs/common";
import {PrismaService} from "../db/prisma.service";
import {CreateReservationInput, Reservation} from "../graphql";
import {ReservationEntity} from "@prisma/client";
import {ReservationAdaptor} from "./reservation.adaptor";

@Injectable()
export class ReservationService {
    constructor(private db: PrismaService,
                private reservationAdaptor: ReservationAdaptor) {
    }

    createReservation = async (input: CreateReservationInput, userId: string): Promise<Reservation> => {
        const {time, location, message} = input;
        const reservation = await this.db.reservationEntity.create({
            data: {
                time, location, message, userId
            }
        })
        return this.reservationAdaptor.toGql(reservation);
    }

    deleteReservation = (id: string) => this.db.reservationEntity.delete({
        where: {
            id
        }
    })

    getUpcomingReservationsForUserId = (userId: string) => this.db.reservationEntity.findMany({
        where: {
            userId,
            time: {gte: new Date()}
        }
    })

    getAllReservationsForUserId = async (userId: string): Promise<Reservation[]> => {
        const friends = await this.db.friendEntity.findMany({where: {userId}});
        const friendIds = friends.map(e => e.userId);
        const allIds = [...friendIds, userId];
        const allReservations = await Promise.all(allIds.map(id => this.getUpcomingReservationsForUserId(id)));
        const flattened = this.flattenReservations(allReservations);
        return this.reservationAdaptor.toGqls(flattened);
    }

    private flattenReservations = (all: ReservationEntity[][]): ReservationEntity[] => {
        let reservations = [];
        all.forEach(item => {
            reservations = reservations.concat(item);
        })
        return reservations;
    }

    getById = (id: string) => this.db.reservationEntity.findUnique({
        where: {
            id
        }
    })
}