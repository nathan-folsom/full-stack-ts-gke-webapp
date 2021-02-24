
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
    login(username: string, password: string): User | Promise<User>;
    user(id: string): User | Promise<User>;
}

export interface Session {
    token: string;
    userId: string;
    active: boolean;
}

export interface User {
    userId: string;
    username: string;
    created: string;
    reservations?: Reservation[];
    status?: UserStatus;
}

export interface CreateUserOutput {
    user: User;
    sessionIsActive: boolean;
}

export interface IMutation {
    createUser(user?: CreateUserInput): CreateUserOutput | Promise<CreateUserOutput>;
    createRandomUser(): User | Promise<User>;
}
