import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFormComponent } from './search-form.component';

describe('SearchFormComponent', () => {
  let component: SearchFormComponent;
  let mockOptionsService, mockFormBuilder;

  beforeEach(() => {
    mockOptionsService = jasmine.createSpyObj(['listBrands', 'listModels', 'listMakeYears', 'listMakeYears']);
    mockFormBuilder = jasmine.createSpyObj(['listBrands', 'listModels', 'listMakeYears', 'listMakeYears']);

    component = new SearchFormComponent(mockOptionsService, mockFormBuilder);
  });
});
