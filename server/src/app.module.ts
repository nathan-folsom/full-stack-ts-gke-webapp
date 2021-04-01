import {Module} from '@nestjs/common';
import {AppService} from './app.service';
import {ServeStaticModule} from "@nestjs/serve-static";
import {GraphQLISODateTime, GraphQLModule} from '@nestjs/graphql';
import {join} from 'path';
import {PrismaService} from "./db/prisma.service";
import {UserService} from "./user/user.service";
import {UserResolver} from "./user/user.resolver";
import {SessionsService} from "./sessions/sessions.service";
import * as cookie from "cookie";
import {ReservationResolver} from "./reservation/reservation.resolver";
import {ReservationService} from "./reservation/reservation.service";
import {GetUserPipe} from "./get-user.pipe";
import {ReservationAdaptor} from "./reservation/reservation.adaptor";
import {FriendRequestResolver} from "./friend-request/friend-request.resolver";
import {FriendRequestService} from "./friend-request/friend-request.service";
import {FriendsService} from "./friends/friends.service";
import {FriendsResolver} from "./friends/friends.resolver";
import {FriendsAdaptor} from "./friends/friends.adaptor";

export const COOKIE_NAME = 'gymbuds';

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '../..', 'web-ui/dist/web-ui')
        }),
        GraphQLModule.forRoot({
            typePaths: ['./**/*.graphql'],
            definitions: {
                path: join(process.cwd(), 'src/db/graphql.ts'),
            },
            path: '/api',
            context: context => {
                const ctx = {res: context.res, req: context.req};
                const cookies = context.req.headers.cookie;
                if (cookies) {
                    return {...ctx, authToken: cookie.parse(cookies)[COOKIE_NAME]}
                }
                return ctx;
            },
            resolvers: { Date: GraphQLISODateTime }
        })
    ],
    providers: [
        AppService,
        PrismaService,
        UserService,
        UserResolver,
        SessionsService,
        ReservationResolver,
        ReservationService,
        GetUserPipe,
        ReservationAdaptor,
        FriendRequestResolver,
        FriendRequestService,
        FriendsService,
        FriendsResolver,
        FriendsAdaptor
    ],
})
export class AppModule {
}
