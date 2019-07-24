import { Component, OnInit, Input } from '@angular/core';
import { IInsurance } from 'src/app/shared/models/insurance.interface';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  @Input() dataList: IInsurance[];

  constructor() { }

  ngOnInit() {
  }


}
