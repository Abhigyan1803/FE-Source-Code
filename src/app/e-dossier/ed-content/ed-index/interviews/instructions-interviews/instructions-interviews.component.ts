import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ms-instructions-interviews',
  templateUrl: './instructions-interviews.component.html',
  styleUrls: ['./instructions-interviews.component.scss']
})
export class InstructionsInterviewsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  goBack() {
    window.history.back()
  }
}
