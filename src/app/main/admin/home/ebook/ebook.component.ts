import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AdminService } from 'app/service/admin/admin.service';
import { SharedService } from 'app/service/shared.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { EbookDeleteComponent } from './ebook-delete/ebook-delete.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'ms-ebook',
  templateUrl: './ebook.component.html',
  styleUrls: ['./ebook.component.scss']
})
export class ebook implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  displayedColumns: string[] = ['number','name','desc','visit','status','action'];
  eBookList:any[]=[];
  dataSource:any=[];
  addEbookForm: FormGroup = new FormGroup({});
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  
  constructor(
    private fb: FormBuilder, private router:Router, private service:AdminService,  private sharedService:SharedService,
     private cdref: ChangeDetectorRef, private spinner:NgxSpinnerService,private dialog: MatDialog, private snackbar:MatSnackBar){
      this.addEbookForm = this.fb.group({
        id:[''],
        status:['2']

      })
     }

  ngOnInit(): void {  
  }

  ngAfterViewInit(){
    this.getEbookList();
  }

  //get e-book list
  getEbookList(){
    console.log('get fn called');
    
    this.service.getEbookList().subscribe(
      res=>{
        this.spinner.show();
        console.log(res);
        if(res.status == "OK"){
          this.eBookList = res.object;
          this.dataSource= new MatTableDataSource(res.object);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.cdref.detectChanges();
          this.spinner.hide();
        } else{
          this.service.openSnackbar(res.message)
          this.spinner.hide();
        }
        
      },
      err=>{
        this.spinner.hide()
        this.service.openSnackbar('Error Occured.')
      }
    )
  }

  sortData(sort: Sort) {
    // const datalist = this.centralLibraryList.slice();
    // if (!sort.active || sort.direction === '') {
    //   this.centralLibraryList = datalist;
    //   return;
    // }
    // this.centralLibraryList = datalist.sort((a: any, b: any) => {
    //   const isAsc = this.sort.direction === 'asc';
    //   switch (this.sort.active) {
    //     case 'name': return this.sharedService.compare(a.tabName.toLowerCase(), b.tabName.toLowerCase(), isAsc);  
    //     default: return 0;
    //   }
    // });
    // this.dataSource = new MatTableDataSource(this.centralLibraryList);
    // this.dataSource.paginator=this.paginator;
    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }
  
  openDialog(data:any) {
    const dialogRef = this.dialog.open(EbookDeleteComponent,{
      data:{
        message: 'Are you sure want to delete?',
        buttonText: {
          ok: 'Yes',
          cancel: 'No'
        }
      }
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      console.log(confirmed);
      
      if (confirmed) {
        
          console.log("delete",data.id);
        this.addEbookForm.patchValue({
          id: data.id,
        }) 
        this.service.updateEbook(this.addEbookForm.value).subscribe((res:any)=>{
          console.log(res);
          this.openSnackbar(res.message)
          this.getEbookList();
         },(err:any)=>{
          console.log(err);
          
         })
      }
         this.spinner.hide();

       })
  }
  
 
  
  addLink(){
    this.router.navigate(['/main/admin/home/ebook/add-ebook'])
  }

  viewLink(a){
    this.router.navigate(['/main/admin/home/ebook/view-ebook'],{queryParams:{id:a.id}})
  }
  visitURL(l){
    window.open(l.ebookUrl,'_blank')
  }
  openSnackbar(msg){
    this.snackbar.open(msg,'x', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    })
  }


}
