import { Directive, ElementRef, HostListener, Input, inject } from '@angular/core';
import { TestService } from '../services/test.service';
import { MatTooltip } from '@angular/material/tooltip';


export interface City{
  id: number
  name: string
  data: string
}

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

  constructor(private matTooltip: MatTooltip,
    private testService: TestService) { }

  onMouseEnter() {
    const city = this.searchCity(Number(this.city_id))
    this.matTooltip.message = city.name + ', ' + city.data + ' жителей';
    this.matTooltip.show();
  }

  onMouseLeave() {
    this.matTooltip.hide();
  }

  searchCity(city_id: number): City{
    return this.testService.getCities().find(city => city.id == city_id)!
  }
}
