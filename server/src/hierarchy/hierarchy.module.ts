import { Module } from '@nestjs/common';
import { HierarchyService } from './hierarchy.service';
import { HierarchyController } from './hierarchy.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Citizen } from 'src/entities/citizen.entity';
import { City } from 'src/entities/city.entity';
import { Group } from 'src/entities/group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Citizen, City, Group])],
  providers: [HierarchyService],
  controllers: [HierarchyController]
})
export class HierarchyModule {}
