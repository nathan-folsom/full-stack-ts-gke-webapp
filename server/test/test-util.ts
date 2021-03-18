import {Test, TestingModule} from "@nestjs/testing";
import {AppModule, COOKIE_NAME} from "../src/app.module";
import {INestApplication} from "@nestjs/common";
import supertest from "supertest";
import {API_URL} from "./test-env";
import {UserService} from "../src/user/user.service";
import {SessionsService} from "../src/sessions/sessions.service";

export class TestUtil {
    static randomString = (length = 10) => {
        let str = '';
        for (let i = 0; i < length; i++) {
            const newletter = 'abcdefghijklmnopqrstuvwxyz'[Math.round(Math.random() * 25)];
            str += newletter;
        }
        return str;
    }

    static createE2eTestApp = async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        const app = moduleFixture.createNestApplication();
        await app.init();
        return app;
    }

    static requestWithToken = (app: INestApplication, token: string) => supertest(app.getHttpServer())
        .post(API_URL)
        .set("Cookie", `${COOKIE_NAME}=${token}`)

    static createTestUser = async (app: INestApplication) => {
        const userService = app.get(UserService);
        return await userService.createUser({username: TestUtil.randomString(), password: TestUtil.randomString()});
    }

    static getToken = async (app: INestApplication, userId: string) => {
        const sessionService = app.get(SessionsService);
        const session = await sessionService.create(userId);
        return session.token;
    }

    static setupIntegrationTest = async () => {
        const app = await TestUtil.createE2eTestApp();
        const user = await TestUtil.createTestUser(app);
        const token = await TestUtil.getToken(app, user.userId);
        return {app, user, token};
    }

    static teardownIntegrationTest = async (app: INestApplication, userId: string, token: string) => {
        const userService = app.get(UserService);
        await userService.deleteUser(userId);
        const sessionService = app.get(SessionsService);
        await sessionService.delete(token);
        await app.close();
    }
}