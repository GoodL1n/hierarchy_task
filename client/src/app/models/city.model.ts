import { Citizen } from "./citizen.model"

export interface City{
    id: number
    name: string
    data: string
    citizens?: Citizen[]
}