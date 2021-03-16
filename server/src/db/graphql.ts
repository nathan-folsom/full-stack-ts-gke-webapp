
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum UserStatus {
    ACTIVE = "ACTIVE",
    DELETED = "DELETED",
    ADMIN = "ADMIN"
}

export interface CreateReservationInput {
    time: DateTime;
    location: string;
    message?: string;
}

export interface CreateUserInput {
    username: string;
    password: string;
}

export interface Reservation {
    id: string;
    userId: string;
    username: string;
    time: DateTime;
    location: string;
    message?: string;
}

export interface IQuery {
    allReservations(): Reservation[] | Promise<Reservation[]>;
    myReservations(): Reservation[] | Promise<Reservation[]>;
    user(): User | Promise<User>;
    getUserId(username: string): string | Promise<string>;
}

export interface IMutation {
    createReservation(reservation: CreateReservationInput): Reservation | Promise<Reservation>;
    deleteReservation(reservationId: string): boolean | Promise<boolean>;
    createUser(user?: CreateUserInput): boolean | Promise<boolean>;
    login(username: string, password: string): boolean | Promise<boolean>;
    logout(): boolean | Promise<boolean>;
}

export interface Session {
    token: string;
    userId: string;
    active: boolean;
}

export interface User {
    userId: string;
    username: string;
    created: DateTime;
    reservations?: Reservation[];
    status?: UserStatus;
}

export type DateTime = any;
