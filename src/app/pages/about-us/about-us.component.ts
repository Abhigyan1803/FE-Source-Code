import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ms-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
		document.getElementById('foot-id').style.position='relative';
  
  }

}
