import { Component, Input, OnChanges } from '@angular/core';
import { OptionsService } from '../shared/options.service';
import { IInsurance } from '../shared/models/insurance.interface';
import { IFormData } from '../shared/models/form-data.interface';

@Component({
  selector: 'app-list-insurance',
  templateUrl: './list-insurance.component.html',
  styleUrls: ['./list-insurance.component.scss']
})
export class ListInsuranceComponent implements OnChanges {
  @Input() info: Pick<IFormData<string>, 'make' | 'model'> & { brandId: number };
  insuranceList: IInsurance[];
  isLoading = true;
  isCard = true;

  constructor(private options: OptionsService) {
  }

  ngOnChanges() {
    this.isLoading = true;
    this.options.listInsurance(this.info.brandId, this.info.model, this.info.make).subscribe(data => {
      if (!data.status) {
        // Handle Errors
        console.log('Error Fetching data - API:', data);
        return;
      }
      this.insuranceList = data['return_value'] as IInsurance[];
      this.isLoading = false;
    });
  }

  printPage() {
    window.print();
  }
}
