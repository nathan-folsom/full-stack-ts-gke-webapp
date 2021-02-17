import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ServeStaticModule} from "@nestjs/serve-static";
import {GraphQLModule} from '@nestjs/graphql';
import {join} from 'path';
import {PrismaService} from "./prisma.service";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'web-ui/dist/web-ui')
    }),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
    })
  ],
  controllers: [AppController],
  providers: [
      AppService,
      PrismaService
  ],
})
export class AppModule {}
