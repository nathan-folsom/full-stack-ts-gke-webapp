import {INestApplication} from '@nestjs/common';
import {COOKIE_NAME} from "../src/app.module";
import supertest from "supertest";
import {TestUtil} from "./test-util";
import * as cookie from 'cookie';
import {UserService} from "../src/user/user.service";
import {API_URL} from "./test-env";

describe('Auth integrations tests', () => {
    let app: INestApplication;

    beforeAll(async () => {
        app = await TestUtil.createE2eTestApp();
    });

    afterAll(async () => {
        await app.close();
    })

    describe('users', () => {
        const username = TestUtil.randomString();
        const password = TestUtil.randomString();
        let token = '';

        it('should create user', (done) => {
            supertest(app.getHttpServer())
                .post(API_URL)
                .send({
                    query: `mutation ($user: CreateUserInput!) {createUser(user: $user)}`,
                    variables: {
                        user: {
                            username, password
                        }
                    }
                })
                .expect(200)
                .end(((err, res) => {
                    token = cookie.parse(res.header['set-cookie'][0])[COOKIE_NAME]
                    expect(token).toBeTruthy();
                    expect(res.body.data.createUser).toBe(true);
                    done()
                }))
        });

        it('should get user', (done) => {
            supertest(app.getHttpServer())
                .post(API_URL)
                .send({
                    query: `query {user { username }}`
                })
                .set("Cookie", `${COOKIE_NAME}=${token}`)
                .expect(200)
                .end(((err, res) => {
                    expect(res.body.data.user.username).toEqual(username);
                    done()
                }))
        });

        it('should logout', (done) => {
            supertest(app.getHttpServer())
                .post(API_URL)
                .send({
                    query: `mutation { logout }`
                })
                .set("Cookie", `${COOKIE_NAME}=${token}`)
                .expect(200)
                .end((err, res) => {
                    expect(res.body.data.logout).toBe(true);
                    done()
                })
        });

        it('should not get user after logout', (done) => {
            supertest(app.getHttpServer())
                .post(API_URL)
                .send({
                    query: `query {user { username }}`
                })
                .set("Cookie", `${COOKIE_NAME}=${token}`)
                .expect(200)
                .end(((err, res) => {
                    expect(res.body.data.user).toBeNull();
                    done()
                }))
        });

        it('should login', (done) => {
            supertest(app.getHttpServer())
                .post(API_URL)
                .send({
                    query: `mutation($password: String!, $username: String!) {login(password: $password, username: $username)}`,
                    variables: {username, password}
                })
                .expect(200)
                .end(((err, res) => {
                    expect(res.body.data.login).toBe(true);
                    const newToken = cookie.parse(res.header['set-cookie'][0])[COOKIE_NAME]
                    expect(newToken).toBeTruthy();
                    expect(newToken === token).toBe(false);
                    done()
                }))
        });

        afterAll(async () => {
            const service: UserService = app.get('UserService');
            const user = await service.getUserByName(username);
            await service.deleteUser(user.userId);
        })
    })


});
