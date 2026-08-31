import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { HomePageService } from 'app/service/home/home-page.service';
import { SharedService } from 'app/service/shared.service';

@Component({
  selector: 'ms-study-material',
  templateUrl: './study-material.component.html',
  styleUrls: ['./study-material.component.scss']
})
export class StudyMaterialComponent implements OnInit {

  syllabusData = {
    type: '',
    data: '',
  };

  academicSyllabus: any; 
  serviceSubjectsSyllabus: any;


  term_Id: number = 1;
  paperName: string = 'Paper 1';
  subject: string = 'Military History'

  selectedTermIndex: number = 0;
  selectedPaperIndex: number = 0;
  selectedSubjectIndex: number = 0;

  serviceSubSyllabusName: string;


  constructor(private spinner: NgxSpinnerService, private cdref: ChangeDetectorRef, private dialog: MatDialog,
    private service: HomePageService, private sharedService: SharedService) {
  }

  ngOnInit(): void {
    document.getElementById('foot-id').style.position = 'relative';


  }

  ngAfterViewInit() {
    this.getServiceSubSyllabus('Soldierly')

  }



  mainSyllabusChanged(e: any) {
    this.selectedTermIndex = 0;
  
    this.term_Id = 1;

    if (e.index == '0') {

      this.getServiceSubSyllabus('Soldierly')
    }

  }

  serviceSubSyllabusChanged(e: any) {
    this.serviceSubSyllabusName = e.tab.textLabel
    if (this.serviceSubSyllabusName != 'BMT-2') {
      if (this.serviceSubSyllabusName == 'BMT-1') {
        this.getBMT_Syllabus('BMT-1');
      } else {
        this.getServiceSubSyllabus(this.serviceSubSyllabusName)
      }

    } else {
      this.getBMT_Syllabus('Map Reading')
    }
  }



  bmt2SyllabusChanged(e: any) {

    const type = e.tab.textLabel
    let sType;
    if (type == "O&A and I&S") {
      sType = "OnA and InS"
    } else {
      sType = type;
    }
    console.log("before: ", type);

    console.log("after: ", sType);

    this.getServiceSubSyllabus(sType);
  }


  
  getServiceSubSyllabus(type) {
    Object.assign(this.syllabusData, { type: '', data: '' })

    this.service.getStudyMaterialList(type, this.term_Id, 2).subscribe(
      res => {
        this.service.setHomePageSyllabus(
          Object.assign(this.syllabusData, { type: 'service', data: res.object })
        )
      },
      err => {
        this.sharedService.openErrorSnackbarWithSeconds('ERROR!', 3)
      }
    )
  }


  getBMT_Syllabus(type) {
    console.log(type);
    this.getServiceSubSyllabus(type);
  }

  selectedSerSubIndex:number=0;

  serviceSubjectTermChanged(e: any) {
    this.selectedSerSubIndex = 0;
    const tName = e.tab.textLabel;
    if (tName == "I Term") {
      this.term_Id = 1;
    } else if (tName == "II Term") {
      this.term_Id = 2;
    } else if (tName == "II Tech") {
      this.term_Id = 7;
    } else if (tName == "III Term") {
      this.term_Id = 3;
    }
    this.getServiceSubSyllabus('Soldierly')
  }



}