import { Component } from '@angular/core';
import { HierarchyService } from './services/hierarchy.service';
import { ImportNotificationService } from './services/import-notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isImport: boolean = true;

  constructor(private hierarchyService: HierarchyService,
    private notificationService: ImportNotificationService) { }

  importCities(event: Event) {
    const file = (event.target as HTMLInputElement).files;
    if (file) {
      const json = file[0];
      const reader = new FileReader();
      reader.readAsText(json)
      reader.onload = (e) => {
        this.hierarchyService.importCities(JSON.parse(e.target?.result as string)).subscribe()
      }
      reader.onerror = (event: any) => {
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
          this.notificationService.setNotificationAboutSuccessImport()
        })
      }
      reader.onerror = (event: any) => {
        console.log(event.target.error.code)
      }
    }
  }

  deleteCitizens() {
    this.hierarchyService.deleteCitizens().subscribe(data => {
      this.notificationService.setNotificationDeleteCitizens()
    })
  }
}
