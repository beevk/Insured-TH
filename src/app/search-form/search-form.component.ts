import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { IBrand } from '../shared/models/brand.interface';
import { IModel } from '../shared/models/model.interface';
import { IMake } from '../shared/models/make.interface';
import { IInsurance } from '../shared/models/insurance.interface';
import { OptionsService } from '../shared/options.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {
  @Output() formSubmitted = new EventEmitter();
  @ViewChild('modelRef', { static: false }) modelRef: any;
  @ViewChild('makeRef', { static: false }) makeRef: any;

  searchKeyword: Object = {
    brand: 'default_name',
    model: 'model_group',
    make: 'year_model'
  };

  brandList: IBrand[];
  modelList: IModel[];
  makeList: IMake[];
  insuranceList: IInsurance[];
  queryForm: FormGroup;

  buttonError: boolean = false;
  isLoading = {
    brand: '',
    model: '',
    make: ''
  };

  private selected = {};


  constructor(private options: OptionsService, private fb: FormBuilder) {
    this.queryForm = fb.group({
      brand: ['', Validators.required],
      model: ['', Validators.required],
      make: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.isLoading.brand = "true";
    this.options.listBrands().subscribe(data => {
      if (data['status']) {
        this.brandList = <IBrand[]>data['return_value'];
        this.isLoading.brand = "";
      } else {
        // Handle Errors
        console.log('Error Fetching from HTTP -', data);
      }
    })
  }


  fetchModels(brand: any) {
    this.isLoading.model = "true";
    this.selected = Object.assign({}, this.selected, { brand: brand });
    this.options.listModels(brand.code).subscribe(data => {
      if (data['status']) {
        this.modelList = <IModel[]>data['return_value'];
        this.isLoading.model = "";
      } else {
        // Handle Errors
        console.log(`Error Fetching from HTTP - ${data}`);
      }
    })
  }

  fetchMakeYears(model: any) {
    this.isLoading.make = "true";
    this.selected = Object.assign({}, this.selected, { model: model });
    this.options.listMakeYears(model.brand_rid, model.model_group).subscribe(data => {
      if (data['status']) {
        this.makeList = <IMake[]>data['return_value'];
        this.isLoading.make = "";
      } else {
        // Handle Errors
        console.log(`Error Fetching from HTTP - ${data}`);
      }
    })
  }

  onSubmit(finalData: any) {
    this.selected = Object.assign({}, this.selected, { make: finalData.make });

    let formInfo = {
      brandId: finalData.brand.record_id,
      model: finalData.make.model,
      make: finalData.make.year_model
    };

    this.formSubmitted.emit(formInfo);
    // this.formSubmitted.emit(Object.assign({}, formInfo));
    // this.router.navigate([`${this.selected.brand.record_id}`, `${finalData.make.model}`, `${finalData.make.year_model}`])
  }

  onChangeSearch(val: string) {
    // console.log('Input field changed', val);
  }

  onFocused(val: string) {
    // Check if previous fields are set and valid here
  }

  clearInputField(val: string) {
    if (val === "model") {
      this.makeRef.clear();
      this.makeList = [];
    } else {
      this.modelRef.clear();
      this.modelList = [];
    }
  }


  validateBrand() {
    return this.queryForm.controls.brand.valid || this.queryForm.controls.brand.untouched;
  }
  validateModel() {
    return this.queryForm.controls.brand.valid || this.queryForm.controls.brand.untouched;
  }
  validateMake() {
    return this.queryForm.controls.brand.valid || this.queryForm.controls.brand.untouched;
  }
}
