import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { OptionsService } from '../shared/options.service';
import { IBrand, IModel, IMake, IInputError, IFormData } from '../shared/models/index.interface';

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
  buttonError = false;
  inputError: IInputError = {
    brand: false,
    model: false,
    make: false
  };

  searchKeyword: IFormData<string> = {
    brand: 'default_name',
    model: 'model_group',
    make: 'year_model'
  };

  isLoading: IFormData<string> = {
    brand: '',
    model: '',
    make: ''
  };

  private selected: IFormData<{}> = {
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
    this.isLoading.brand = 'true';
    this.options.listBrands().subscribe(data => {
      if (data.status) {
        this.brandList = data['return_value'] as IBrand[];
        this.isLoading.brand = '';
      } else {
        // Handle Errors
        console.error('Error Fetching from HTTP -', data);
      }
    });
  }


  fetchModels(brand: any) {
    this.isLoading.model = 'true';
    this.inputError.brand = false;
    this.selected = Object.assign({}, this.selected, { brand });

    this.options.listModels(brand.code).subscribe(data => {
      if (data.status) {
        this.modelList = data['return_value'] as IModel[];
        this.isLoading.model = '';
      } else {
        // Handle Errors
        console.error(`Error Fetching from HTTP - ${data}`);
      }
    });
  }

  fetchMakeYears(model: any) {
    this.isLoading.make = 'true';
    this.inputError.model = false;
    this.selected = Object.assign({}, this.selected, { model });

    this.options.listMakeYears(model.brand_rid, model.model_group).subscribe(data => {
      if (data.status) {
        this.makeList = data['return_value'] as IMake[];
        this.isLoading.make = '';
      } else {
        // Handle Errors
        console.error(`Error Fetching from HTTP - ${data}`);
      }
    });
  }

  makeSelected(make: any) {
    this.inputError.make = false;
    this.selected = Object.assign({}, this.selected, { make });
  }

  onSubmit(finalData: any) {
    if (this.isEmpty(this.selected.brand)) {
      this.inputError.brand = true;
    } else if (this.isEmpty(this.selected.model)) {
      this.inputError.model = true;
    } else if (this.isEmpty(this.selected.make)) {
      this.inputError.make = true;
    } else {
      const formInfo = {
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
    if (val === 'make') {
      if (this.isEmpty(this.selected.model)) {
        this.inputError.model = true;
        if (this.isEmpty(this.selected.brand)) { }
        this.inputError.brand = true;
      }
    } else if (val === 'model') {
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
    if (val === 'model') {
      this.makeRef.clear();
      this.makeList = [];
      this.selected.model = undefined;
    } else if (val === 'brand') {
      this.modelRef.clear();
      this.modelList = [];
      this.selected.brand = undefined;
    } else if (val === 'make') {
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
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }
}
