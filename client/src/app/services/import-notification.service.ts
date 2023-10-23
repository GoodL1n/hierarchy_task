import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImportNotificationService {

  isImportCitizens$: Subject<boolean> = new Subject();
  isDeleteCitizens$: Subject<boolean> = new Subject();

  constructor() { }

  setNotificationAboutSuccessImport(){
    this.isImportCitizens$.next(true);
  }

  setNotificationDeleteCitizens(){
    this.isDeleteCitizens$.next(true);
  }

  getInfoAboutSuccessImport(){
    return this.isImportCitizens$;
  }

  getInfoAboutDeleteCitizens(){
    return this.isDeleteCitizens$;
  }
}
