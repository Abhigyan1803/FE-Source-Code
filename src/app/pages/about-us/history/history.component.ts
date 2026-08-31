import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ms-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
		document.getElementById('foot-id').style.position='relative';

  }
}
