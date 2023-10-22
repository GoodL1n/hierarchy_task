import { Injectable } from '@nestjs/common';
import { group } from 'console';

export interface Citizen {
  id: number
  name: string
  city_id: number
  groups: Group[]
}

export interface Group {
  type: string
  name: string
  children?: Group[]
  cityzen?: string
}

@Injectable()
export class AppService {

  async createHierarchyOfCitizens1() {
    let hierarchyOfCitizens: Map<string, Map<string, string[]>> = new Map()

    let citizens: Citizen[] = this.getCitizens()

    for (let citizen of citizens) {
      for (let groupIndex = 1; groupIndex < citizen.groups.length; groupIndex++) {
        const previousGroup = citizen.groups[groupIndex - 1]
        const currentGroup = citizen.groups[groupIndex]

        if (!hierarchyOfCitizens.has(previousGroup.name)) {
          hierarchyOfCitizens.set(previousGroup.name, new Map())
        }

        const prevHierarchy = hierarchyOfCitizens.get(previousGroup.name)
        if (!prevHierarchy.has(currentGroup.name)) {
          prevHierarchy.set(currentGroup.name, [])
        }

        prevHierarchy.get(currentGroup.name).push(citizen.name)
      }
    }
    this.printHierarchy1(hierarchyOfCitizens, '')
  }

  printHierarchy1(map: Map<string, any>, str: string) {
    for (const [name, names] of map.entries()) {
      if (typeof name == 'string') {
        console.log(str + name)
        const hier = map.get(name)
        if (hier) {
          this.printHierarchy1(hier, str + '--')
        }
      } else {
        console.log(str + names)
      }
    }
  }

  async createHierarchyOfCitizens2() {
    let citizens: Citizen[] = this.getCitizens()
    let hierarchyOfCitizens: Group[] = []

    for (let citizen of citizens) {
      for (let groupIndex = 0; groupIndex < citizen.groups.length; groupIndex++) {
        const currentGroup = citizen.groups[groupIndex]
        const checkGroup = hierarchyOfCitizens.find(group => group.name == currentGroup.name)
        if(!checkGroup){
          hierarchyOfCitizens.push(currentGroup)
        }
      }
    }
  }

  getCitizens() {
    return [
      {
        "id": 0,
        "name": "Анна",
        "city_id": 1,
        "groups": [
          {
            "type": "country",
            "name": "Россия"
          },
          {
            "type": "city",
            "name": "Москва г."
          },
          {
            "type": "district",
            "name": "Пресненский р-н"
          },
          {
            "type": "street",
            "name": "Гашека ул."
          }
        ]
      },
      {
        "id": 1,
        "name": "Степан",
        "city_id": 1,
        "groups": [
          {
            "type": "country",
            "name": "Россия"
          },
          {
            "type": "city",
            "name": "Москва г."
          },
          {
            "type": "district",
            "name": "Пресненский р-н"
          },
          {
            "type": "street",
            "name": "Рочдельская ул."
          }
        ]
      },
      {
        "id": 1,
        "name": "Виктор",
        "city_id": 1,
        "groups": [
          {
            "type": "country",
            "name": "Россия"
          },
          {
            "type": "city",
            "name": "Москва г."
          },
          {
            "type": "district",
            "name": "Коптево р-н"
          },
          {
            "type": "street",
            "name": "Нарвская ул."
          }
        ]
      },
      {
        "id": 1,
        "name": "Алексей",
        "city_id": 1,
        "groups": [
          {
            "type": "country",
            "name": "Россия"
          },
          {
            "type": "city",
            "name": "Москва г."
          },
          {
            "type": "district",
            "name": "Коптево р-н"
          },
          {
            "type": "street",
            "name": "Коптевская ул."
          }
        ]
      },
      {
        "id": 1,
        "name": "Ярослав",
        "city_id": 1,
        "groups": [
          {
            "type": "country",
            "name": "Россия"
          },
          {
            "type": "city",
            "name": "Москва г."
          },
          {
            "type": "district",
            "name": "Отрадное р-н"
          },
          {
            "type": "street",
            "name": "Сигнальный проезд"
          }
        ]
      },
      {
        "id": 1,
        "name": "Антонина",
        "city_id": 1,
        "groups": [
          {
            "type": "country",
            "name": "Россия"
          },
          {
            "type": "city",
            "name": "Москва г."
          },
          {
            "type": "district",
            "name": "Отрадное р-н"
          },
          {
            "type": "street",
            "name": "Отрадная ул."
          }
        ]
      },
      {
        "id": 2,
        "name": "Григорий",
        "city_id": 1,
        "groups": [
          {
            "type": "country",
            "name": "НеРоссия"
          },
          {
            "type": "city",
            "name": "Воронеж г."
          },
          {
            "type": "district",
            "name": "Советский р-н"
          },
          {
            "type": "street",
            "name": "Патриотов пр-т"
          }
        ]
      },
      {
        "id": 2,
        "name": "Александр",
        "city_id": 1,
        "groups": [
          {
            "type": "country",
            "name": "НеРоссия"
          },
          {
            "type": "city",
            "name": "Воронеж г."
          },
          {
            "type": "district",
            "name": "Советский р-н"
          },
          {
            "type": "street",
            "name": "Кривошеина ул."
          }
        ]
      },
      {
        "id": 2,
        "name": "Владимир",
        "city_id": 1,
        "groups": [
          {
            "type": "country",
            "name": "НеРоссия"
          },
          {
            "type": "city",
            "name": "Воронеж г."
          },
          {
            "type": "district",
            "name": "Центральный р-н"
          },
          {
            "type": "street",
            "name": "Ленина ул."
          }
        ]
      },
      {
        "id": 2,
        "name": "Василий",
        "city_id": 1,
        "groups": [
          {
            "type": "country",
            "name": "НеРоссия"
          },
          {
            "type": "city",
            "name": "Воронеж г."
          },
          {
            "type": "district",
            "name": "Центральный р-н"
          },
          {
            "type": "street",
            "name": "Рабочий пр-т"
          }
        ]
      },
      {
        "id": 3,
        "name": "Яков",
        "city_id": 1,
        "groups": [
          {
            "type": "country",
            "name": "123"
          },
          {
            "type": "city",
            "name": "Санкт-Петербург г."
          },
          {
            "type": "district",
            "name": "Выборгский р-н"
          },
          {
            "type": "street",
            "name": "Светлановский пр-т"
          }
        ]
      },
      {
        "id": 3,
        "name": "Виктория",
        "city_id": 1,
        "groups": [
          {
            "type": "country",
            "name": "123"
          },
          {
            "type": "city",
            "name": "Санкт-Петербург г."
          },
          {
            "type": "district",
            "name": "Выборгский р-н"
          },
          {
            "type": "street",
            "name": "Орбели ул."
          }
        ]
      },
    ]
  }
}
