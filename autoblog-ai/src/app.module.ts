import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogGeneratorModule } from './blog-generator/blog-generator.module';
import { EmailModule } from './email-service/email.module';
import { SchedulerModule } from './scheduler/scheduler.module';
import { TopicResearchModule } from './topic-research/topic-research.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    ScheduleModule.forRoot(),
    BlogGeneratorModule,
    EmailModule,
    SchedulerModule,
    TopicResearchModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
