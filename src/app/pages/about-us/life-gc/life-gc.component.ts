import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ms-life-gc',
  templateUrl: './life-gc.component.html',
  styleUrls: ['./life-gc.component.scss']
})
export class LifeGCComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
		document.getElementById('foot-id').style.position='relative';

  }

}
