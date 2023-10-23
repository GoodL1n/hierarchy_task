import { Citizen } from "src/entities/citizen.entity"

export interface NodeWithMap {
    name: string
    city_id: number
    children: Map<string, NodeWithMap>
    citizens?: Citizen[]
  }