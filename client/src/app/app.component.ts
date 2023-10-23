import { Component } from '@angular/core';
import { HierarchyService } from './services/hierarchy.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';

  constructor(private hierarchyService: HierarchyService){}

  importCities(event: Event) {
    const file = (event.target as HTMLInputElement).files;
    if (file) {
      const json = file[0];
      const reader = new FileReader();
      reader.readAsText(json)
      reader.onload = (e) => {
        this.hierarchyService.importCities(JSON.parse(e.target?.result as string)).subscribe(data => {
          window.location.reload()
        })
      }
      reader.onerror = (event:any) => {
        console.log(event.target.error.code)
      }
    }
  }

  importCitizens(event: Event) {
    const file = (event.target as HTMLInputElement).files;
    if (file) {
      const json = file[0];
      const reader = new FileReader();
      reader.readAsText(json)
      reader.onload = (e) => {
        this.hierarchyService.importCitizens(JSON.parse(e.target?.result as string)).subscribe(data => {
          window.location.reload()
        })
      }
      reader.onerror = (event:any) => {
        console.log(event.target.error.code)
      }
    }
   }
}
