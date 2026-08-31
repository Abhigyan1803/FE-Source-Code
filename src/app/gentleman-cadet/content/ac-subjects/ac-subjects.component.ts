import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ms-ac-subjects',
  templateUrl: './ac-subjects.component.html',
  styleUrls: ['./ac-subjects.component.scss']
})
export class AcSubjectsComponent implements OnInit {

  componentsList: any[] = [
    {
      name: "Subjects",
      type:"link",
      link:"/gc/content/ac-subjects/subjects",
    },
    {
      name: "Assignments",
      type:'link',
      link: "/gc/content/ac-subjects/assignments"
    },
    {
      name: "Distribution of Marks",
      type:'link',
      link: "/gc/content/ac-subjects/distribution-of-marks"
    },
    // {
    //   name: "Achievements",
    //   type:'link',
    //   link: "/gc/content/ac-subjects/achievements"
    // },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
