import {ReservationEntity} from "@prisma/client";
import {Reservation} from "../db/graphql";

export class ReservationAdaptor {
    static toGql(entity: ReservationEntity, username: string): Reservation {
        return {...entity, username};
    }
}