import { Component, Input, OnChanges } from '@angular/core';
import { OptionsService } from '../shared/options.service';
import { IInsurance } from '../shared/models/insurance.interface';

@Component({
  selector: 'app-list-insurance',
  templateUrl: './list-insurance.component.html',
  styleUrls: ['./list-insurance.component.scss']
})
export class ListInsuranceComponent implements OnChanges {
  @Input() info: any;
  insuranceList: IInsurance[];
  isLoading: boolean = true;
  isCard: boolean = true;

  constructor(private options: OptionsService) {
  }

  ngOnChanges() {
    this.isLoading = true;
    this.options.listInsurance(this.info.brandId, this.info.model, this.info.make).subscribe(data => {
      if (data['status']) {
        this.insuranceList = <IInsurance[]>data['return_value'];
        this.isLoading = false;
      } else {
        // Handle Errors
        console.log('Error Fetching data - API:', data);
      }
    })
  }
}