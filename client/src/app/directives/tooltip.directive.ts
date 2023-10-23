import { Directive, ElementRef, HostListener, Input, inject } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { HierarchyService } from '../services/hierarchy.service';
import { City } from '../models/city.model';

@Directive({
  selector: '[toolTip]',
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()',
  },
  providers: [MatTooltip],
})

export class TooltipDirective{

  @Input() city_id!: string;

  cities: City[] = []

  constructor(private matTooltip: MatTooltip,
    private hierarchyService: HierarchyService) { 
      this.hierarchyService.getCities().subscribe(data => {
        this.cities = data
      })
    }

  onMouseEnter() {
    const city = this.searchCity(Number(this.city_id))
    this.matTooltip.message = city.name + ', ' + city.data + ' жителей';
    this.matTooltip.show();
  }

  onMouseLeave() {
    this.matTooltip.hide();
  }

  searchCity(city_id: number): City{
    return this.cities.find(city => city.id == city_id)!
  }
}
