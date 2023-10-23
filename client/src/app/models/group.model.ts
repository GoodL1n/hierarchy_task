import { Citizen } from "./citizen.model"

export interface Group{
    id: number
    type: string
    name: string
    citizens: Citizen[]
}