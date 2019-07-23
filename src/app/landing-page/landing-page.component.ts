import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  salesValueReceived: boolean = false;
  formInfo: any;

  constructor() { }

  ngOnInit() {
  }

  displayInsuranceSales(info) {
    this.salesValueReceived = true;
    this.formInfo = info; // Object.assign({}, info);
  }
}
