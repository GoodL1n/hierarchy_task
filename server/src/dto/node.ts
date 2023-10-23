import { Citizen } from "src/entities/citizen.entity"

export interface Node {
    city_id: number
    name: string
    children?: Node[]
    citizens?: Citizen[]
  }