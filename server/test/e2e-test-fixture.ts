import {INestApplication} from "@nestjs/common";
import {TestUtil} from "./test-util";

export class E2eTestFixture {
    app: INestApplication;

    init = async () => {
        this.app = await TestUtil.createE2eTestApp();
    }

    requestWithToken = (token: string) => TestUtil.requestWithToken(this.app, token);

    createTestUser = async () => {
        return await TestUtil.createTestUser(this.app);
    }

    createTestUserWithToken = async () => {
        const user = await this.createTestUser();
        const token = await TestUtil.getToken(this.app, user.userId);
        return {user, token};
    }

    close = async () => {
        await this.app.close();
    }

    getService = (clazz) => this.app.get(clazz);
}