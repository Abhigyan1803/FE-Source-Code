import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ms-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.scss']
})
export class EntriesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
		document.getElementById('foot-id').style.position='relative';
  }

}
