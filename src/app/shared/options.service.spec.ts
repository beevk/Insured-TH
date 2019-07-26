import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';

import { OptionsService } from './options.service';

describe('OptionsService', () => {
  let service: OptionsService;
  let httpTestingController: HttpTestingController;

  // beforeEach(() => TestBed.configureTestingModule({}));
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OptionsService],

    })
    service = TestBed.get(OptionsService);
    httpTestingController = TestBed.get(httpTestingController);
  })


  // it('should be created', () => {
  //   const service: OptionsService = TestBed.get(OptionsService);
  //   expect(service).toBeTruthy();
  // });
});