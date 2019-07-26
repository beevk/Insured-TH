import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { OptionsService } from '../shared/options.service';

import { IBrand, IModel, IMake, IInputError } from '../shared/models/index.interface';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {
  @Output() formSubmitted = new EventEmitter();
  @ViewChild('brandRef', { static: false }) brandRef: any;
  @ViewChild('modelRef', { static: false }) modelRef: any;
  @ViewChild('makeRef', { static: false }) makeRef: any;

  brandList: IBrand[];
  modelList: IModel[];
  makeList: IMake[];
  queryForm: FormGroup;
  buttonError: boolean = false;
  inputError: IInputError = {
    brand: false,
    model: false,
    make: false
  }

  searchKeyword = {
    brand: 'default_name',
    model: 'model_group',
    make: 'year_model'
  };

  isLoading = {
    brand: '',
    model: '',
    make: ''
  };

  private selected = {
    // set it to type IBrand, IModel & IMake
    brand: {},
    model: {},
    make: {}
  };

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
        console.error('Error Fetching from HTTP -', data);
      }
    })
  }


  fetchModels(brand: any) {
    this.isLoading.model = "true";
    this.inputError.brand = false;
    this.selected = Object.assign({}, this.selected, { brand: brand });

    this.options.listModels(brand.code).subscribe(data => {
      if (data['status']) {
        this.modelList = <IModel[]>data['return_value'];
        this.isLoading.model = "";
      } else {
        // Handle Errors
        console.error(`Error Fetching from HTTP - ${data}`);
      }
    })
  }

  fetchMakeYears(model: any) {
    this.isLoading.make = "true";
    this.inputError.model = false;
    this.selected = Object.assign({}, this.selected, { model: model });

    this.options.listMakeYears(model.brand_rid, model.model_group).subscribe(data => {
      if (data['status']) {
        this.makeList = <IMake[]>data['return_value'];
        this.isLoading.make = "";
      } else {
        // Handle Errors
        console.error(`Error Fetching from HTTP - ${data}`);
      }
    })
  }

  makeSelected(make: any) {
    this.inputError.make = false;
    this.selected = Object.assign({}, this.selected, { make: make });
  }

  onSubmit(finalData: any) {
    if (this.isEmpty(this.selected.brand)) {
      this.inputError.brand = true;
    } else if (this.isEmpty(this.selected.model)) {
      this.inputError.model = true;
    } else if (this.isEmpty(this.selected.make)) {
      this.inputError.make = true;
    } else {
      let formInfo = {
        brandId: finalData.brand.record_id,
        model: finalData.make.model,
        make: finalData.make.year_model
      };

      this.formSubmitted.emit(formInfo);
    }
  }

  onChangeSearch(val: string) {
    // Custom Search functionality goes here
  }

  onFocused(val: string) {
    if (val === "make") {
      if (this.isEmpty(this.selected.model)) {
        this.inputError.model = true;
        if (this.isEmpty(this.selected.brand)) { }
        this.inputError.brand = true;
      }
    } else if (val === "model") {
      if (this.isEmpty(this.selected.brand)) {
        this.inputError.brand = true;
        this.inputError.make = false;
      }
    } else {
      this.inputError.model = false;
      this.inputError.make = false;
    }
  }

  clearInputField(val: string) {
    if (val === "model") {
      this.makeRef.clear();
      this.makeList = [];
      this.selected.model = undefined;
    } else if (val === "brand") {
      this.modelRef.clear();
      this.modelList = [];
      this.selected.brand = undefined;
    } else if (val === "make") {
      this.selected.make = undefined;
    } else {
      this.brandRef.clear();
      // this.brandRef.close();
    }
  }

  validateBrand() {
    return this.inputError.brand || (this.queryForm.controls.brand.invalid && (this.queryForm.controls.brand.touched || this.buttonError));
  }

  validateModel() {
    return this.inputError.model || (this.queryForm.controls.model.invalid && (this.queryForm.controls.model.touched || this.buttonError));
  }

  validateMake() {
    return this.inputError.make || (this.queryForm.controls.make.invalid && (this.queryForm.controls.make.touched || this.buttonError));
  }

  isEmpty(obj): boolean {
    for (let key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }
}
