import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IBrand } from './shared/models/brand.interface';
import { IModel } from './shared/models/model.interface';
import { IMake } from './shared/models/make.interface';
import { IInsurance } from './shared/models/insurance.interface';
import { OptionsService } from './shared/options.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	focusedElement: Object = {};

	queryForm: FormGroup;
	brandList: IBrand[];
	modelList: IModel[];
	makeList: IMake[];
	insuranceList: IInsurance[];

	private brand: FormControl;
	private model: FormControl;
	private make: FormControl;

	constructor(private options: OptionsService) { }

	ngOnInit() {
		this.brand = new FormControl(null, Validators.required);
		this.model = new FormControl(null, Validators.required);
		this.make = new FormControl(null, [Validators.required, Validators.pattern('[1-2].*')]);

		this.queryForm = new FormGroup({
			brand: this.brand,
			model: this.model,
			make: this.make
		});

		this.options.listBrands().subscribe(data => {
			if (data['status']) {
				this.brandList = <IBrand[]>data['return_value'];
			} else {
				// Handle Errors
				console.log('Error Fetching from HTTP -', data);
			}
		})
	}

	fetchModels(brand: string) {
		console.log(brand)
		this.options.listModels(brand).subscribe(data => {
			if (data['status']) {
				this.modelList = <IModel[]>data['return_value'];
				console.log(`modelList: ${this.modelList}`)
			} else {
				// Handle Errors
				console.log(`Error Fetching from HTTP - ${data}`);
			}
		})
	}

	fetchMakeYears(brandId: number, model: string) {
		this.options.listMakeYears(brandId, model).subscribe(data => {
			if (data['status']) {
				this.makeList = <IMake[]>data['return_value'];
				console.log(`Server response: ${this.makeList}`)
			} else {
				// Handle Errors
				console.log(`Error Fetching from HTTP - ${data}`);
			}
		})
	}

	fetchInsurance(brandId: number, model: string, year: string) {
		this.options.listInsurance(brandId, model, year).subscribe(data => {
			if (data['status']) {
				this.insuranceList = <IInsurance[]>data['return_value'];
				console.log(`Server response: ${this.insuranceList}`)
			} else {
				// Handle Errors
				console.log(`Error Fetching from HTTP - ${data}`);
			}
		})
	}

	onSubmit(values) {
		// Search for final result here
		console.log(values);
	}

	enableDropdown(val: string) {
		this.focusedElement[val] = true;
	}

	disableDropdown(val: string) {
		this.focusedElement[val] = false;
	}


	validateBrand() {
		return this.brand.valid || this.brand.untouched;
	}
	validateModel() {
		return this.model.valid || this.model.untouched;
	}
	validateMake() {
		return this.make.valid || this.make.untouched;
	}
}
