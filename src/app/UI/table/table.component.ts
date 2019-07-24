import { Component, OnInit, Input } from '@angular/core';
import { IInsurance } from 'src/app/shared/models/insurance.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() dataList: IInsurance[];

  constructor() { }

  ngOnInit() {
  }

}
