import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';

import { IBrand } from './shared/models/brand.interface';
import { IModel } from './shared/models/model.interface';
import { IMake } from './shared/models/make.interface';
import { IInsurance } from './shared/models/insurance.interface';
import { OptionsService } from './shared/options.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	@ViewChild('modelRef', { static: false }) modelRef: any;
	@ViewChild('makeRef', { static: false }) makeRef: any;

	searchKeyword: Object = {
		brand: 'default_name',
		model: 'model_group',
		make: 'year_model'
	}

	brandList: IBrand[];
	modelList: IModel[];
	makeList: IMake[];
	insuranceList: IInsurance[];
	queryForm: FormGroup;

	buttonError: boolean = false

	private selected: any = {};


	constructor(private options: OptionsService, private fb: FormBuilder, private router: Router) {
		this.queryForm = fb.group({
			brand: ['', Validators.required],
			model: ['', Validators.required],
			make: ['', Validators.required]
		});
	}

	ngOnInit() {
		this.options.listBrands().subscribe(data => {
			if (data['status']) {
				this.brandList = <IBrand[]>data['return_value'];
			} else {
				// Handle Errors
				console.log('Error Fetching from HTTP -', data);
			}
		})
	}


	fetchModels(brand: any) {
		this.selected = Object.assign({}, this.selected, { brand: brand });
		// console.log("From brand", brand.code);
		this.options.listModels(brand.code).subscribe(data => {
			if (data['status']) {
				this.modelList = <IModel[]>data['return_value'];
				// console.log(`modelList: ${this.modelList}`)
			} else {
				// Handle Errors
				console.log(`Error Fetching from HTTP - ${data}`);
			}
		})
	}

	fetchMakeYears(model: any) {
		this.selected = Object.assign({}, this.selected, { model: model });
		// console.log("From make years", model);
		this.options.listMakeYears(model.brand_rid, model.model_group).subscribe(data => {
			if (data['status']) {
				this.makeList = <IMake[]>data['return_value'];
				// console.log(`Server response: ${this.makeList}`)
			} else {
				// Handle Errors
				console.log(`Error Fetching from HTTP - ${data}`);
			}
		})
	}

	onSubmit(finalData: any) {
		this.selected = Object.assign({}, this.selected, { make: finalData.make });

		this.router.navigate([`${this.selected.brand.record_id}`, `${finalData.make.model}`, `${finalData.make.year_model}`])
		// console.log("Submitted values", values);
	}

	onChangeSearch(val: string) {
		console.log('Input field changed', val);
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
