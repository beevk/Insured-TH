import { Component, OnInit, Input } from '@angular/core';
import { OptionsService } from '../shared/options.service';
import { IInsurance } from '../shared/models/insurance.interface';

@Component({
  selector: 'app-list-insurance',
  templateUrl: './list-insurance.component.html',
  styleUrls: ['./list-insurance.component.scss']
})
export class ListInsuranceComponent implements OnInit {
  @Input() info: any;
  insuranceList: IInsurance[];
  isLoading: boolean = true;

  constructor(private options: OptionsService) {
  }

  ngOnInit() {
    this.options.listInsurance(this.info.brandId, this.info.model, this.info.make).subscribe(data => {
      if (data['status']) {
        this.insuranceList = <IInsurance[]>data['return_value'];
        this.isLoading = false;
      } else {
        // Handle Errors
        console.log('Error Fetching data - API:', data);
      }
    })
    // });

  }
}