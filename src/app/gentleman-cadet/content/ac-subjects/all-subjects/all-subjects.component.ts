import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/service/auth-service/auth.service';
import { GcService } from 'app/service/gc/gc.service';
import { SharedService } from 'app/service/shared.service';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';

@Component({
  selector: 'ms-all-subjects',
  templateUrl: './all-subjects.component.html',
  styleUrls: ['./all-subjects.component.scss']
})
export class AllSubjectsComponent implements OnInit {

  cadetInfo: any;
  paper;
  subject;
  topics: any[] = [];
  termData:any=[
    {name:'Term I', id:1},
    {name:'Term II', id:2},
    {name:'Term III', id:3},
    {name:'Tech II', id:7},
  ]
  termId:any;
  selected:any="s"
  gcRoleId:any;
  constructor(private router: Router, private route: ActivatedRoute, private service: GcService,
     private dialog: MatDialog, private cdRef:ChangeDetectorRef) {
    this.cadetInfo = JSON.parse(localStorage.getItem("loginResponse"));
    //gc role hide instructor node work
    this.gcRoleId = localStorage.getItem('gcRoleId') ? localStorage.getItem('gcRoleId') : null
    // console.log("CADET INFO: ",this.cadetInfo);
    console.log('gc role id',this.gcRoleId);
    
   
    
  }


  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.route.params.subscribe(
      params => {
        console.log("Parameters: ", params);
        this.paper = params.paper;
        this.subject = params.subject;
        // this.ngAfterViewInit();
    this.getSubjectTopic()
     
      }
    )
  }
  getSubjectTopic() {
    console.log('this.termId',this.termId);
    //add condition for not sekected term
    if(this.termId=='s') this.termId=''
    // this.service.getSubjectsTopicsList(this.cadetInfo.object.term, this.paper, this.subject).subscribe(
      this.service.getSubjectsTopicsList(this.termId, this.paper, this.subject).subscribe(
      res => {
        // console.log(res);
        if (res.status == "OK") {
          this.topics = res.object;
          this.cdRef.detectChanges();
        }
      }
    )
  }

//term change work
onTermChange(e:any){
  console.log(e.value);
  this.termId=e.value
  this.getSubjectTopic()
}



  openDoc(url) {
    let type;
    const ext = url.substring(url.lastIndexOf('.') + 1)

    if (ext == "docx" || ext == "doc" || ext == "pdf" || ext == "pptx" || ext == "ppt") {
      type = 'document'
    } else if (ext == "apng" || ext == "png" || ext == "gif" ||
      ext == "jpg" || ext == "jpeg" || ext == "jfif" || ext == "pjpg" || ext == "pjpeg" ||
      ext == "svg" || ext == "tiff" || ext == "tif"
    ) {
      type = 'img'
    } else {
      type = 'video'
    }



    this.dialog.open(DialogComponent, {
      width: '1300px', height: '650px', data: {
        type: type, title: 'Notes', url: url
      }
    }

    )
  }
}
