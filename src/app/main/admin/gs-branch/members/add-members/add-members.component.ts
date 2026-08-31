import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'app/service/admin/admin.service';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-add-members',
  templateUrl: './add-members.component.html',
  styleUrls: ['./add-members.component.scss']
})
export class AddMembersComponent implements OnInit {

  addMemberForm: FormGroup;
  id;

  pageTitle="Add Member";
  memberObj;
  previewImg;
  isError: boolean = false;
  isCoyCmdr: boolean = false;

  appts:any[]=[];

  constructor(private router: Router, private fb: FormBuilder, private route: ActivatedRoute,
    private service: AdminService, private cdref: ChangeDetectorRef, private spinner: NgxSpinnerService) {

    this.addMemberForm = this.fb.group({
      rank: ['', Validators.required],
      icNum:['',Validators.required],
      name: ['', Validators.required],
      awards: [''],
      appt: ['', Validators.required],
      
      image: [],

      status: ['1', Validators.required]
    });

   
  }

  ngOnInit(): void {
    this.getAppts();

    if (this.router.url.includes('add-member')) {
      this.pageTitle = 'Add Member';
    }
    else if (this.router.url.includes('view-member')) {
      this.spinner.show()
      this.pageTitle = 'View Member';
      this.id = this.route.snapshot.queryParamMap.get('id');
      this.service.getGSBranchMemberById(this.id).subscribe(
        res => {

          console.log(res);

          if (res.status == 'OK') {

            this.addMemberForm.patchValue({
              rank: res.object.gsRank,
              icNum: res.object.icnum,
              name: res.object.name,
              awards: res.object.award,
              appt: res.object.gsPosition.id,


              status: res.object.status

             
            })

            this.previewImg = res.object.image
            this.spinner.hide();
          } else {
            this.spinner.hide();
            this.service.openSnackbar(res.message);
          }
        }
      )
    }
  }


  omit_number(event) {
    var key;
    key = event.charCode;  //         key = event.keyCode;  (Both can be used)
    return ((key > 47 && key < 58) || key == 45 || key == 46);
}
  getAppts(){
    this.service.getAllGSBranchPosts(1).subscribe(
      res=>{
        console.log(res);
        if(res.status == "OK"){
          this.appts = res.object
          this.cdref.detectChanges();
        }
        
      }
    )
  }



  goBack() {
    this.router.navigate(['/main/admin/GS-Branch/members']);
  }

  onSelectImage(e) {
    this.addMemberForm.patchValue({
      image: e.target.files[0]
    })
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = (event: any) => {
      this.previewImg = event.target.result;
    }
  }

  public get f() {
    return this.addMemberForm.controls;
  }

  addMember() {
    if (this.addMemberForm.invalid) {
      this.isError = true;
    } else {
      this.spinner.show();
      this.service.addGSBranchMembers(this.addMemberForm.value).subscribe(
        res => {
          if (res.status == 'OK') {
            this.service.openSnackbar(res.message)
            this.cdref.detectChanges();
            this.spinner.hide();
            this.router.navigate(['/main/admin/BS-Branch/members']);
          } else {
            this.spinner.hide();
            this.service.openSnackbar(res.message)
          }
        },
        err => {
          this.spinner.hide();
          this.service.openSnackbar('Error Occured.')
          console.log(JSON.stringify(err));
        }
      )
    }
  }

  updateMember() {
    if (this.addMemberForm.invalid) {
      this.isError = true;
    } else {
      this.spinner.show()
      this.service.updateGSBranchMembers(this.id, this.addMemberForm.value).subscribe(
        res => {
          if (res.status == 'OK') {
            this.service.openSnackbar(res.message)
            this.cdref.detectChanges();
            this.spinner.hide();
            this.router.navigate(['/main/admin/GS-Branch/members'])
          } else {
            this.spinner.hide()
            this.service.openSnackbar(res.message);
          }
        },
        err => {
          this.spinner.hide()
          this.service.openSnackbar('Error Occured.')
        }
      )
    }
  }

}
