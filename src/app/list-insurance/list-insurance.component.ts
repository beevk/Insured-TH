import { Component, OnInit } from '@angular/core';
import { OptionsService } from '../shared/options.service';
import { IInsurance } from '../shared/models/insurance.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-insurance',
  templateUrl: './list-insurance.component.html',
  styleUrls: ['./list-insurance.component.scss']
})
export class ListInsuranceComponent implements OnInit {
  insuranceList: IInsurance[];
  isLoading: boolean = true;

  private brandId: number;
  private model: string;
  private year: string;

  constructor(private options: OptionsService, private route: ActivatedRoute) {
    this.brandId = this.route.snapshot.params.brandId;
    this.model = this.route.snapshot.params.model;
    this.year = this.route.snapshot.params.make;
  }

  ngOnInit() {
    this.options.listInsurance(this.brandId, this.model, this.year).subscribe(data => {
      if (data['status']) {
        this.insuranceList = <IInsurance[]>data['return_value'];
        this.isLoading = false;
        console.log('List Insurance response:', this.insuranceList)
      } else {
        // Handle Errors
        console.log('Error Fetching data - API:', data);
      }
    })
  }
}