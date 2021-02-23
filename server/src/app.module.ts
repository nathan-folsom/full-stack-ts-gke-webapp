import {Module} from '@nestjs/common';
import {AppService} from './app.service';
import {ServeStaticModule} from "@nestjs/serve-static";
import {GraphQLModule} from '@nestjs/graphql';
import {join} from 'path';
import {PrismaService} from "./db/prisma.service";
import {UserService} from "./user/user.service";
import {UserResolver} from "./user/user.resolver";

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
            cors: true
        })
    ],
    providers: [
        AppService,
        PrismaService,
        UserService,
        UserResolver
    ],
})
export class AppModule {
}
