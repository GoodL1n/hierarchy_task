import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Node } from 'src/dto/node';
import { NodeWithMap } from 'src/dto/node-map';
import { Citizen } from 'src/entities/citizen.entity';
import { City } from 'src/entities/city.entity';
import { Group } from 'src/entities/group.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HierarchyService {
    constructor(
        @InjectRepository(Citizen) private citizenRepository: Repository<Citizen>,
        @InjectRepository(City) private cityRepository: Repository<City>,
        @InjectRepository(Group) private groupRepository: Repository<Group>
      ) {}

      async getCitizens(){
        return await this.citizenRepository.find({
          order: {
            groups: {
              id: "ASC"
            }
          }
        })
      }
    
      async getHierarchyOfCitizens() {
        const citizens = await this.getCitizens()
        console.log(citizens)
        const treeWithMap = await this.construcTree(citizens)
        return this.traversal(treeWithMap)
      }
    
      async construcTree(arrayCitizen: Citizen[]) {
        let root: NodeWithMap = { name: 'root', city_id: 0, children: new Map<string, NodeWithMap> }
        for (let citizen of arrayCitizen) {
          let current = root
          for (let group of citizen.groups) {
            if (!current.children.has(group.name)) {
              current.children.set(group.name, { name: group.name, city_id: citizen.city_id, children: new Map<string, NodeWithMap> })
            }
            current = current.children.get(group.name)!
          }
          if (!current.citizens) {
            current.citizens = [citizen]
          } else {
            current.citizens?.push(citizen)
          }
        }
        return root
      }
    
      traversal(node: NodeWithMap): Node {
        if (node.citizens) {
          return { name: node.name, city_id: node.city_id, children: node.citizens }
        }
        let array: any[] = []
        for (let value of node.children.values()) {
          array.push(this.traversal(value))
        }
        return { name: node.name, city_id: node.city_id, children: array }
      }

      async getCities():Promise<City[]>{
        return await this.cityRepository.find()
      }
    
      async importCitizens(citizens: Citizen[]): Promise<Citizen[]> {
        for(let citizen of citizens){
          let groups = []
          for(let groupIndex of citizen.groups){
            let group: Group
            group = await this.groupRepository.findOneBy({type: groupIndex.type, name: groupIndex.name})
            if(!group){
              group = await this.groupRepository.save(groupIndex)
            }
            groups.push(group)
          }
          citizen.groups = groups
        }
        const z = await this.citizenRepository.save(citizens)
        console.log(z)
        return z
      }
    
      async importCities(cities: City[]): Promise<City[]> {
        return await this.cityRepository.save(cities)
      }
}
