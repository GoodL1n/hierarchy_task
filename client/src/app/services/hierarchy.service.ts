import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Citizen } from '../models/citizen.model';
import { Node } from '../models/tree/node.model';
import { City } from '../models/city.model';

@Injectable({
  providedIn: 'root'
})
export class HierarchyService {

  constructor(private http: HttpClient) { }

  getHierarchyOfCitizens(): Observable<Node>{
    return this.http.get<Node>(`http://localhost:8000/api/hierarchy`)
  }

  getCities():Observable<City[]>{
    return this.http.get<City[]>(`http://localhost:8000/api/hierarchy/cities`)
  }

  importCitizens(citizens: Citizen[]): Observable<Citizen[]>{
    return this.http.post<Citizen[]>(`http://localhost:8000/api/hierarchy/import/citizens`, citizens)
  }

  deleteCitizens(): Observable<void>{
    return this.http.delete<void>(`http://localhost:8000/api/hierarchy/citizens`)
  }

  importCities(cities: City[]): Observable<City[]>{
    return this.http.post<City[]>(`http://localhost:8000/api/hierarchy/import/cities`, cities)
  }
}
