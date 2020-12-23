import { TestBed } from '@angular/core/testing';

import { FlowsService } from './flows.service';

describe('FlowsService', () => {
  let service: FlowsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlowsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
