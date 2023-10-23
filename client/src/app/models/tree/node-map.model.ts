import { Citizen } from "../citizen.model"

export interface NodeWithMap {
    name: string
    city_id: number
    children: Map<string, NodeWithMap>
    citizens?: Citizen[]
  }