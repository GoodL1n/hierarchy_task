import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Citizen } from './entities/citizen.entity';
import { City } from './entities/city.entity';
import { Group } from './entities/group.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HierarchyModule } from './hierarchy/hierarchy.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    TypeOrmModule.forRoot(
      {
        type: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: parseInt(process.env.POSTGRES_PORT),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        entities: [Citizen, City, Group],
        synchronize: true,
        dropSchema: true
      }),
    HierarchyModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
