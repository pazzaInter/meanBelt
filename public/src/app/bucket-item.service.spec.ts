import { TestBed, inject } from '@angular/core/testing';

import { BucketItemService } from './bucket-item.service';

describe('BucketItemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BucketItemService]
    });
  });

  it('should be created', inject([BucketItemService], (service: BucketItemService) => {
    expect(service).toBeTruthy();
  }));
});
