import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { HierarchyService } from './hierarchy.service';
import { Citizen } from 'src/entities/citizen.entity';
import { City } from 'src/entities/city.entity';

@Controller('api/hierarchy')
export class HierarchyController {
    constructor(private readonly hierarchyService: HierarchyService){}

    @Get()
    async getHierarchyOfCitizens(){
      return await this.hierarchyService.getHierarchyOfCitizens()
    }

    @Get('cities')
    async getCities(){
      return await this.hierarchyService.getCities()
    }
  
    @Post('import/citizens')
    async importCitizens(@Body() citizens: Citizen[]){
      await this.hierarchyService.importCitizens(citizens)
    }
  
    @Post('import/cities')
    async importCities(@Body() cities: City[]){
      await this.hierarchyService.importCities(cities)
    }

    @Delete('citizens')
    async deleteCitizens(){
      await this.hierarchyService.deleteCitizens()
    }
}
