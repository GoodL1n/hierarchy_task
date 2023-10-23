import { TestBed } from '@angular/core/testing';

import { ImportNotificationService } from './import-notification.service';

describe('ImportNotificationService', () => {
  let service: ImportNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImportNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
