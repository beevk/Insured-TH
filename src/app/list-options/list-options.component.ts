import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list-options',
  templateUrl: './list-options.component.html',
  styleUrls: ['./list-options.component.scss']
})
export class ListOptionsComponent implements OnInit {
  @Input() listItems;
  @Output() valueSelected = new EventEmitter();

  constructor() { }

  ngOnInit() {
    console.log('From list-item:', this.listItems)
  }

  onClick(event) {
    console.log("Ready to output", event)
    this.valueSelected.emit(event);
  }

}
