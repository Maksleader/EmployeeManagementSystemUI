import { TestBed } from '@angular/core/testing';

import { ModalconfigService } from './modalconfig.service';

describe('ModalconfigService', () => {
  let service: ModalconfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalconfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
