import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from 'app/service/admin/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { EDossierService } from 'app/service/e-dossier/edossier-service.service';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { merge } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import {of as observableOf} from 'rxjs/observable/of';

@Component({
  selector: 'ms-gc-term-update',
  templateUrl: './gc-term-update.component.html',
  styleUrls: ['./gc-term-update.component.scss']
})
export class GcTermUpdateComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  terms: any[];
  terms2: any[]=[];
  companyList: any[] = [];
  candidateForUpdateterm: any[] = [];
  battalionList: any[] = [];
  termid: any =1;
  ischecked: any;
  ischeckedAll:boolean=false;
  
  setbattalion:any;
  setcompany:any;
  companyid:any;
  battleid: any;
  resultsLength: number;
  edCadetList: any[] = [];
  displayStyle: any = "none"; 
  count=0;
  //montag:boolean=true;
  //termisbase:boolean=true;
  
  constructor(private EDossierService: EDossierService,private router: Router, private fb: FormBuilder, private route: ActivatedRoute,
    private service: AdminService, private cdref: ChangeDetectorRef, private spinner: NgxSpinnerService) {

     // this.getALLLIST();
      // this.EdAllList();
      this.getNEWUPDATEBYTERM();
     }

     getNEWUPDATEBYTERM(){
      this.service.getGCTermList(this.termid,this.shortname,this.companyid,0, 1000).subscribe(data => {
        if(data.status == 'OK' && data.object==null){
          this.spinner.hide();
          this.edCadetList=[];
        }
        if (data.status == 'OK') {
          this.edCadetList = data.object.cadetFilterPayload;
          for(let i=0;i<this.edCadetList.length;i++){
            this.edCadetList[i].ischecked=false;
          }
          console.log(data,"call")
    
     
          this.cdref.detectChanges();
        }
        else {
          this.spinner.hide();
          this.service.openSnackbar(data.message) 
          this.edCadetList = []
        }
        this.spinner.hide()
        // var scrollElem = document.querySelector('#orders');
        // scrollElem.scrollIntoView();
      });
     }

    ngOnInit(): void {
   
    

      this.getTerms();
      this.service.getBattalionList().subscribe(
        res => {
          this.spinner.show();
          if (res.status == 'OK') {
            this.battalionList = res.object
            this.cdref.detectChanges();
            this.spinner.hide()
          } else {
            this.spinner.hide();
          }
        }, err => {
          this.spinner.hide();
        }
      )
    }
    ngAfterViewInit() {
      // this.EdAllList();    
       this.edSearch();
    }
    pageIndex:number ;pageSize:number
    // getALLLIST(){
      
    //   this.service.getAllTermsForUpdate(this.pageIndex=0, this.pageSize=1000).subscribe(
    //     res => {
          
    //       this.spinner.show();
    //       if (res.status == 'OK') {
    //         this.edCadetList = res.object.cadetFilterPayload
    //         console.log(this.edCadetList);
    //         for(let i=0;i<this.edCadetList.length;i++){

    //           this.edCadetList[i].ischecked=false;
    //         }
    //        console.log(this.edCadetList);
    //         this.cdref.detectChanges();
    //         this.spinner.hide()
    //       } else {
    //         this.spinner.hide();
    //       }
    //     }, err => {
    //       this.spinner.hide();
    //     }
    //   )
    // }
    
    
    EdAllList(){
      // alert("hello")
      console.log("EdAllList paginator");
      console.log("EdAllList paginator1");
      // this.EDossierService.getEDossierAllList(this.paginator.pageIndex,100).subscribe(
      //   res => {
      //     this.spinner.show();
      //     if (res.status == 'OK') {
      //       this.edCadetList = res.object
      //       this.cdref.detectChanges();
      //       this.spinner.hide()
      //     } else {
      //       this.spinner.hide();
      //     }
      //   }, err => {
      //     this.spinner.hide();
      //   }
      // )
  
      
    //   merge(/* this.sort.sortChange,  */this.paginator.page)
      
    // .pipe(
      
    //   startWith({}),
    //   switchMap(() => {
    //     this.spinner.show()
        
    //     return this.service.getAllTermsForUpdate(this.paginator.pageIndex, this.paginator.pageSize)
    //   }), map(data => {
    //     // this.getTotalRecords();
    //     this.resultsLength = data.object.totalRecords;
    //     return data;
    //   }),
    //   catchError(() => {
    //     console.log('Error here')
    //     this.spinner.hide()
    //     return observableOf([]);
    //     // return null;
    //   })
    // ).subscribe(data => {
    //   if (data.status == 'OK') {
    //     this.edCadetList = data.object.cadetFilterPayload;
    //     if (data.object.cadetFilterPayload.length > 0){
    //       this.edCadetList = data.object.cadetFilterPayload;
    //     console.log(this.edCadetList,"juned")
    //     }
    //     else{
    //       this.edCadetList = []}
    //     this.cdref.detectChanges();
    //   }
    //   else {
    //     this.edCadetList = []
    //   }
    //   this.spinner.hide()
    //   // var scrollElem = document.querySelector('#orders');
    //   // scrollElem.scrollIntoView();
    // });
  
    }

    checkAll(ev) {
      if (ev.target.checked) {
          console.log("True")
          for(let i=0;i<this.edCadetList.length;i++){

            this.edCadetList[i].ischecked=true;
          }
      } else {
          console.log("False");
          for(let i=0;i<this.edCadetList.length;i++){

            this.edCadetList[i].ischecked=false;
          }
      }
  }
  checkOne(ev) {
        let flag=false;
       
     
        for(let i=0;i<this.edCadetList.length;i++){
          console.log(this.edCadetList[i].ischecked);
         if(this.edCadetList[i].ischecked==false){
         // console.log('swapnil',this.edCadetList[i].ischecked,this.ischeckedAll);
           flag=true;
           break;
         }
        
        }
        console.log('swapnil',flag,this.ischeckedAll);
        if(flag==true){
          this.ischeckedAll=false;
        }
        else{
          this.ischeckedAll=true;
        }
       // console.log('swapnil',this.ischecked,this.ischeckedAll);
    }
  
//   checkOne(ev) {
//     let flag=false;
   

//     //this.ischeckedAll=false;
//     for(let i=0;i<this.edCadetList.length;i++){
//       console.log(this.edCadetList[i].ischecked);
//      if(this.edCadetList[i].ischecked==false){
//      // console.log('swapnil',this.edCadetList[i].ischecked,this.ischeckedAll);
//        flag=true;
//        break;
//      }
    
//     }
//     console.log('swapnil',flag,this.ischeckedAll);
//     if(flag==true){
//       this.ischeckedAll=false;
//     }
//     else{
//       this.ischeckedAll=true;
//     }
//    // console.log('swapnil',this.ischecked,this.ischeckedAll);
// }
    termChange(e:any){
      console.log(e,"t id");
//alert('hello')
      this.battleid=0;
      this.battalionList=[];
      this.service.getBattalionList().subscribe(
        res => {
         // alert('hello battalion')
          this.spinner.show();
          if (res.status == 'OK') {
            this.battalionList = res.object
            this.cdref.detectChanges();
            this.spinner.hide()
          } else {
            this.spinner.hide();
          }
        }, err => {
          this.spinner.hide();
        }
      )
    //   alert(this.battleid)
    this.companyList=[];
    //  this.companyid=0;
    //  this.battalionSelected(e);
    //   this.service.getCompanyList(e).subscribe(
    //     res => {
    //       alert('hello company')
    //       this.spinner.show();
    //       console.log(res)
    //       if (res.status == 'OK') {
    //         this.companyList = res.object
    //         this.cdref.detectChanges();
    //         this.spinner.hide();
    //       } else {
    //         this.spinner.hide()
    //       }
    //     },
    //     err => {
    //       this.spinner.hide();
    //     }
    //   )
    //  alert(this.companyid)
     // this.setbattalion=0;
     // this.setcompany=0;
   //  this.battalionList=[];
    // this.companyList=[];
      this.termid=e;
      this.ischeckedAll=false;
      for(let i=0;i<this.edCadetList.length;i++){

        this.edCadetList[i].ischecked=false;
      }
    }
    termidNew:any;
    termChange2(e:any){
      console.log(e,"t id");
     // alert(e)
      this.termidNew=e;
    }

    UpdateTerm(){
      
      for(let i=0;i<this.candidateForUpdateterm.length;i++){
        this.candidateForUpdateterm[i].term=this.termidNew;
      }
      this.service.updateTerm(this.candidateForUpdateterm).subscribe(
        res => {
          
          this.spinner.show();
          if (res.status == 'OK') {
          //   this.edCadetList = res.object.cadetFilterPayload
          //   console.log(this.edCadetList);
          //   for(let i=0;i<this.edCadetList.length;i++){

          //     this.edCadetList[i].ischecked=false;
          //   }
          //  console.log(this.edCadetList);
          //   this.cdref.detectChanges();
            
         // alert('term updated')
          this.getNEWUPDATEBYTERM();
          this.spinner.hide();
          this.closePopup();

          } else {
            this.spinner.hide();
          }
        }, err => {
          this.spinner.hide();
        }
      )

    }

    battalionSelected(e: any) {
      //alert(e);
      this.battleid=e;
      this.companyid=null;
      // if(this.battleid==0){
      //   this.companyid=null;
      //   this.spinner.show();
      //   this.service.getCompanyList(e).subscribe(
      //     res => {
      //       this.spinner.show();
      //       console.log(res)
      //       if (res.status == 'OK') {
      //         this.companyList = res.object
      //         this.cdref.detectChanges();
      //         this.spinner.hide();
      //       } else {
      //         this.spinner.hide()
      //       }
      //     },
      //     err => {
      //       this.spinner.hide();
      //     }
      //   )
      // }
      if(this.battleid!=0){
        //alert(this.companyid);
        this.spinner.show();
        this.service.getCompanyList(e).subscribe(
          res => {
            this.spinner.show();
            console.log(res)
            if (res.status == 'OK') {
              this.companyList = res.object
              this.cdref.detectChanges();
              this.spinner.hide();
            } else {
              this.spinner.hide()
            }
          },
          err => {
            this.spinner.hide();
          }
        )
      }
      else{
       
       this.companyList=[]
      //  alert('this.companyid');

      }
         
        }

        companySelected(e: any) {
          this.companyid=e;
         // alert(this.companyid)
              console.log(e,"juned junes");
              
            }

  getTermsForUpdate() {
    this.service.getAllTerms().subscribe(
      res => {
        // console.log(res);
        //this.terms2 = res.List;
        if (res.status == '1') {
        
        console.log(this.candidateForUpdateterm);
        console.log(res.List[1]);
     
      for(let i=0;i<1;i++){
        console.log(this.candidateForUpdateterm[0].term,"11111111111");
        
        if(this.candidateForUpdateterm[0].term==1){
          this.terms2.push(res.List[1]);
        }
        else  if(this.candidateForUpdateterm[0].term==2){
          this.terms2.push(res.List[3]);
        }
        else  if(this.candidateForUpdateterm[0].term==7){
          this.terms2.push(res.List[3]);
        }
      }
          
         
          this.cdref.detectChanges();
        }

      }
    )
  }

  getTerms() {
    this.service.getAllTermsNew().subscribe(
      res => {
        // console.log(res);
        if (res.status == '1') {

         this.terms=res.List;  
          
         
          this.cdref.detectChanges();
        }

      }
    )
  }

  shortname;

  termupdateSearch(event?:PageEvent){
   // this.candidateForUpdateterm=[];

    if(this.battleid == 0){
      this.shortname = null;
      
    }
    
    if(this.battleid == 1){
      this.shortname = 'CA';
    }
    if(this.battleid == 2){
      this.shortname = 'TH';
    }
    if(this.battleid == 3){
      this.shortname = 'MA';
    }
    if(this.battleid == 4){
      this.shortname = 'BH';
    }

    // if(this.termid != undefined || this.termid != null || this.termid!=''){
    //  alert(this.termid)
    //   this.montag=false;
    // }
    // if(this.termid == undefined || this.termid == null || this.termid==''){
    //   this.montag=true;
    // }
    // else if(this.termid != undefined || this.termid != null || this.termid!=''){
    //   this.montag=false;
    // }

    this.spinner.show();

    this.service.getGCTermList(this.termid,this.shortname,this.companyid,0, 1000).subscribe(data => {
      if(data.status == 'OK' && data.object==null){
        this.spinner.hide();
        this.edCadetList=[];
      }
      if (data.status == 'OK') {
        this.edCadetList = data.object.cadetFilterPayload;
        for(let i=0;i<this.edCadetList.length;i++){
          this.edCadetList[i].ischecked=false;
        }
        console.log(data,"call")
  
   
        this.cdref.detectChanges();
      }
      else {
        this.spinner.hide();
        this.service.openSnackbar(data.message) 
        this.edCadetList = []
      }
      this.spinner.hide()
      // var scrollElem = document.querySelector('#orders');
      // scrollElem.scrollIntoView();
    });

  }

  edSearch(event?:PageEvent) {
    if(this.battleid == 1){
      this.shortname = 'CA';
    }
    if(this.battleid == 2){
      this.shortname = 'TH';
    }
    if(this.battleid == 3){
      this.shortname = 'MA';
    }
    if(this.battleid == 4){
      this.shortname = 'BH';
    }
    this.spinner.show();
   // console.log(this.paginator.pageIndex,"paginator");
   // console.log(this.paginator.pageSize,"paginator1");
    
    // this.EDossierService.getEDossierList(this.termid,this.shortname,this.paginator.pageIndex,this.paginator.pageSize).subscribe(

    //   res => {
    //     console.log(res)
    //     if (res.status == "OK") {
    //       this.edCadetList = res.object;
    //       // this.edCadetList = this.edCadetList.map((res) => ({ id: res.id, date: res.createdAt, rank: res.rank, name: res.name, post: res.position?.name, image: res.image, status: res.status }))
    //       this.spinner.hide()
    //     } else {
    //       this.spinner.hide();
    //       this.service.openSnackbar(res.message)
    //     }
    //   },
    //   err => {
    //     this.spinner.hide();
    //     console.log(JSON.stringify(err));
    //   }
    // )


    
  merge(/* this.sort.sortChange,  */)
  .pipe(
    startWith({}),
    switchMap(() => {
      this.spinner.show()
      return this.EDossierService.getEDossierList(this.termid,this.shortname,this.companyid,0, 1000)

    }), map(data => {
      console.log(data,"my data")
      // this.getTotalRecords();
      this.resultsLength = data.object.totalRecords;
      console.log(this.resultsLength,"------------------------------------------------");
      
      return data;
    }),
    catchError(() => {
      console.log('Error here')
      this.spinner.hide()
      return observableOf([]);
      // return null;
    })
  ).subscribe(data => {
    if (data.status == 'OK') {
      this.edCadetList = data.object.cadetFilterPayload;
      console.log(data,"call")

      // if (data.object.length > 0){
      //   this.edCadetList = data.object;
      // console.log(this.edCadetList,"call")
      // }
      // else{
      //   this.spinner.hide();
      //         this.service.openSnackbar(data.message) 
      // }
      this.cdref.detectChanges();
    }
    else {
      this.spinner.hide();
      this.service.openSnackbar(data.message) 
      this.edCadetList = []
    }
    this.spinner.hide()
    // var scrollElem = document.querySelector('#orders');
    // scrollElem.scrollIntoView();
  });

  }

candidateObj={};
  openPopup() {
    this.getTermsForUpdate();
    this.displayStyle = "block";
    
    for(let i=0;i<this.edCadetList.length;i++){
       console.log('swapnil')
       console.log(this.edCadetList)
      // this.count=0;
      if(this.edCadetList[i].ischecked==true){
       var cid=this.edCadetList[i].id;
       var cterm=this.edCadetList[i].termId;
       this.candidateObj={id:cid,term:cterm}
       console.log(this.candidateObj)
      this.candidateForUpdateterm.push(this.candidateObj)
      console.log(this.candidateForUpdateterm);
        this.count++;
      }
    }
  }

  closePopup() {
    
    this.count=0;
    this.terms2=[];
  
    this.displayStyle = "none";
  }
}
