
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

export interface CreateUserInput {
    username: string;
    password: string;
}

export interface Reservation {
    id: string;
    userId: string;
    time: string;
    location: string;
}

export interface IQuery {
    allReservations(userId: string): Reservation[] | Promise<Reservation[]>;
    myReservations(userId: string): Reservation[] | Promise<Reservation[]>;
    sessionIsActive(): boolean | Promise<boolean>;
    user(): User | Promise<User>;
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

export interface IMutation {
    createUser(user?: CreateUserInput): boolean | Promise<boolean>;
    login(username: string, password: string): boolean | Promise<boolean>;
    logout(): boolean | Promise<boolean>;
}

export type DateTime = any;
