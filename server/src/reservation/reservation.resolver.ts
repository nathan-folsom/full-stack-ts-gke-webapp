import {Args, Context, Mutation, Query, Resolver} from "@nestjs/graphql";
import {ReservationService} from "./reservation.service";
import {GetUserPipe} from "../get-user.pipe";
import {CreateReservationInput, User} from "../db/graphql";

@Resolver('Reservation')
export class ReservationResolver {
    constructor(private reservationService: ReservationService) {
    }

    @Query('myReservations')
    async reservationsCreatedByUser(@Context('authToken', GetUserPipe) userPromise: Promise<User>) {
        const user = await userPromise;
        // console.log(user);
        if (user) {
            return this.reservationService.getReservationsForUserId(user.userId);
        }
        return [];
    }

    @Query('allReservations')
    async allReservationsForUser(@Context('authToken', GetUserPipe) userPromise: Promise<User>) {
        const user = await userPromise;
        if (user) {
            return this.reservationService.getAllReservationsForUserId(user.userId);
        }
        return [];
    }

    @Mutation()
    async createReservation(@Args('reservation') reservation: CreateReservationInput,
                            @Context('authToken', GetUserPipe) userPromise: Promise<User>) {
        const user = await userPromise;
        return user ? this.reservationService.createReservation(reservation, user.userId) : undefined;
    }

    @Mutation()
    async deleteReservation(@Args('reservationId') reservationId: string,
                            @Context('authToken', GetUserPipe) userPromise: Promise<User>) {
        const user = await userPromise;
        const toDelete = await this.reservationService.getById(reservationId);
        if (user.userId === toDelete.userId) {
            this.reservationService.deleteReservation(reservationId);
            return true;
        }
        return false;
    }
}