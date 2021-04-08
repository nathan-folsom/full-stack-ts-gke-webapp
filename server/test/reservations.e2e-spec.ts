import {TestUtil} from "./test-util";
import {INestApplication} from "@nestjs/common";
import {CreateReservationInput, Reservation, User} from "src/graphql";

describe('reservations integration testing', () => {
    let app: INestApplication;
    let user: User;
    let token: string;
    let reservationId;

    beforeAll(async () => {
        ({app, user, token} = await TestUtil.setupIntegrationTest());
    });

    afterAll( async () => {
        await TestUtil.teardownIntegrationTest(app, user.userId, token);
    });

    it('should create reservation', (done) => {
        const date = new Date();
        date.setFullYear(new Date().getFullYear() + 1);
        const reservationInput: CreateReservationInput = {
            location: TestUtil.randomString(),
            message: TestUtil.randomString(),
            time: date
        };
        TestUtil.requestWithToken(app, token)
            .send({
                query: `mutation ($input: CreateReservationInput!) {
                    createReservation(reservation: $input) {
                        id
                        location
                        time
                        message
                        userId
                        username
                    }
                }`,
                variables: {
                    input: reservationInput
                }
            })
            .expect(200)
            .end(((err, res) => {
                expect(err).toBeNull();
                const reservation: Reservation = res.body.data.createReservation;
                reservationId = reservation.id;
                expect(reservation).toBeTruthy();
                expect(reservation.userId).toEqual(user.userId);
                expect(reservation.username).toEqual(user.username);
                expect(reservation.message).toEqual(reservationInput.message);
                expect(reservation.location).toEqual(reservationInput.location);
                expect(reservation.time).toEqual(reservationInput.time.toISOString());
                done();
            }));
    });

    it('should get reservations', (done) => {
        TestUtil.requestWithToken(app, token)
            .send({
                query: `query { allReservations {id} }`
            })
            .expect(200)
            .end((err, res) => {
                const reservations: Reservation[] = res.body.data.allReservations;
                expect(err).toBeNull();
                expect(reservations).toBeTruthy();
                expect(reservations).toHaveLength(1);
                expect(reservations.find(r => r.id === reservationId)).toBeTruthy();
                done();
            });
    });

    it('should delete reservation', (done) => {
        TestUtil.requestWithToken(app, token)
            .send({
                query: `mutation ($id: String!) {deleteReservation(reservationId: $id)}`,
                variables: {id: reservationId}
            })
            .expect(200)
            .end((err, res) => {
                expect(res.body.data.deleteReservation).toBe(true);
                expect(err).toBeNull();
                done();
            });
    });

    it('should verify deleted reservation', (done) => {
        TestUtil.requestWithToken(app, token)
            .send({
                query: `query { allReservations {id} }`
            })
            .expect(200)
            .end((err, res) => {
                const reservations: Reservation[] = res.body.data.allReservations;
                expect(err).toBeNull();
                expect(reservations).toBeTruthy();
                expect(reservations).toHaveLength(0);
                done();
            });
    });
});
