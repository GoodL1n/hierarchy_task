import { Citizen } from "../citizen.model"

export interface Node {
    city_id: number
    name: string
    children?: Node[]
    citizens?: Citizen[]
  }
  