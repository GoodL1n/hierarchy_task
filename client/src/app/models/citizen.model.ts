import { City } from "./city.model"
import { Group } from "./group.model"

export interface Citizen{
    uid: string
    id: number
    name: string
    city?: City
    city_id: number
    groups: Group[]
}