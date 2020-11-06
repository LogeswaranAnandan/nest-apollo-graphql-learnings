import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorsModule } from './authors/authors.module';

@Module({
  imports: [AuthorsModule,
  GraphQLModule.forRoot({
    typePaths: ['./src/**/*.graphql']
  })
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
