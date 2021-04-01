
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum FriendRequestStatus {
    accepted = "accepted",
    rejected = "rejected",
    awaiting_response = "awaiting_response"
}

export enum FriendRequestResponse {
    success = "success",
    connected = "connected",
    already_connected = "already_connected",
    username_not_found = "username_not_found",
    invalid = "invalid"
}

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

export interface FriendRequest {
    id: string;
    requesterId: string;
    requesteeId: string;
    createdDate: DateTime;
    status: FriendRequestStatus;
}

export interface IMutation {
    sendFriendRequest(username: string): FriendRequestResponse | Promise<FriendRequestResponse>;
    deleteFriend(id: string): boolean | Promise<boolean>;
    createReservation(reservation: CreateReservationInput): Reservation | Promise<Reservation>;
    deleteReservation(reservationId: string): boolean | Promise<boolean>;
    createUser(user?: CreateUserInput): boolean | Promise<boolean>;
    login(username: string, password: string): boolean | Promise<boolean>;
    logout(): boolean | Promise<boolean>;
}

export interface Friend {
    userId: string;
    username: string;
    created: DateTime;
}

export interface IQuery {
    getFriends(): Friend[] | Promise<Friend[]>;
    allReservations(): Reservation[] | Promise<Reservation[]>;
    myReservations(): Reservation[] | Promise<Reservation[]>;
    user(): User | Promise<User>;
    getUserId(username: string): string | Promise<string>;
}

export interface Reservation {
    id: string;
    userId: string;
    username: string;
    time: DateTime;
    location: string;
    message?: string;
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
