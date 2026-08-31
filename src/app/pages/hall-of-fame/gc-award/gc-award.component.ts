import { Component, OnInit } from '@angular/core';
import { HomePageService } from 'app/service/home/home-page.service';
import { SharedService } from 'app/service/shared.service';
import { NgxSpinner } from 'ngx-spinner';

@Component({
  selector: 'ms-gc-award',
  templateUrl: './gc-award.component.html',
  styleUrls: ['./gc-award.component.scss']
})
export class GcAwardComponent implements OnInit {

  constructor(private service:HomePageService,private spinner:NgxSpinner, private sharedService:SharedService) { }

  ngOnInit(): void {
    document.getElementById('foot-id').style.position='relative';
  }

  ngAfterViewInit(){

  }


}
