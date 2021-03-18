import {Args, Context, Mutation, Query, Resolver} from "@nestjs/graphql";
import {ReservationService} from "./reservation.service";
import {GetUserPipe} from "../get-user.pipe";
import {CreateReservationInput, Reservation, User} from "../db/graphql";

@Resolver('Reservation')
export class ReservationResolver {
    constructor(private reservationService: ReservationService) {
    }

    @Query('myReservations')
    async reservationsCreatedByUser(@Context('authToken', GetUserPipe) userPromise: Promise<User>) {
        const user = await userPromise;
        if (user) {
            return this.reservationService.getUpcomingReservationsForUserId(user.userId);
        }
        return [];
    }

    @Query('allReservations')
    async allReservationsForUser(@Context('authToken', GetUserPipe) userPromise: Promise<User>): Promise<Reservation[]> {
        const user = await userPromise;
        if (user) {
            return this.reservationService.getAllReservationsForUserId(user.userId);
        }
        return [];
    }

    @Mutation()
    async createReservation(@Args('reservation') reservationInput: CreateReservationInput,
                            @Context('authToken', GetUserPipe) userPromise: Promise<User>): Promise<Reservation> {
        const user = await userPromise;
        if (user) {
            return this.reservationService.createReservation(reservationInput, user.userId);
        }
        return undefined;
    }

    @Mutation()
    async deleteReservation(@Args('reservationId') reservationId: string,
                            @Context('authToken', GetUserPipe) userPromise: Promise<User>) {
        const user = await userPromise;
        const toDelete = await this.reservationService.getById(reservationId);
        if (user.userId === toDelete.userId) {
            await this.reservationService.deleteReservation(reservationId);
            return true;
        }
        return false;
    }
}