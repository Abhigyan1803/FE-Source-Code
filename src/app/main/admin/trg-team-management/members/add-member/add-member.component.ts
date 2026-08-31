import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'app/service/admin/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss']
})
export class AddMemberComponent implements OnInit {


  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  addMemberForm: FormGroup;
  id;
  pageTitle;
  memberObj;
  previewImg;
  term: number;
  isError: boolean = false;

  posts: any[] = [];


  constructor(private router: Router, private fb: FormBuilder, private route: ActivatedRoute,
    private service: AdminService, private cdref: ChangeDetectorRef, private snackbar: MatSnackBar, private spinner: NgxSpinnerService) {
    this.addMemberForm = this.fb.group({
      rank: ['', [Validators.required, Validators.pattern(/^[\a-zA-Z0-9\s]+$/)]],
      name: ['', [Validators.required, Validators.pattern(/^[\a-zA-Z0-9\s]+$/)]],
      awards: ['', [ Validators.pattern(/^[\a-zA-Z0-9\s]+$/)]],
      position: ['', [Validators.required, Validators.pattern(/^[\a-zA-Z0-9\s]+$/)]],
      wa: this.fb.array([this.AddInternalMember()]),
      image: [],
      status: ['1', Validators.required]
    })

    this.id = this.route.snapshot.queryParamMap.get('id');

    this.service.getAllPositions().subscribe(
      res => {
        if (res.status == 'OK') {
          this.posts = res.object
          this.cdref.detectChanges();
        }
      },
      err => console.log(err)
    )

  }


  isPt: boolean = false;
  isWt: boolean = false;
  isEqnt: boolean = false;


  ngOnInit(): void {
    if (this.router.url.includes('add-member')) {
      this.pageTitle = 'Add Member'
    }
    else if (this.router.url.includes('view-member')) {
      this.spinner.show()
      this.pageTitle = 'View Member'
      this.service.getTRGMemberDetails(this.id).subscribe(
        res => {
          if (res.status == '1') {
            this.memberObj = res.List;
       console.log(res);
       
            this.addMemberForm.patchValue({
              rank: res.List.organizationChart.rank,
              name: res.List.organizationChart.name,
              position: res.List.organizationChart.position.id,
              status: res.List.organizationChart.status
            })

            let tempArr:any[]=[];
            if(res.List.memberList.length>1){
              res.List.memberList.forEach((element)=>{
                this.addnewMember();
                const tempObj = {
                  id:element.id,
                  team_rank:element.team_rank,
                  team_name:element.team_name,
                  team_position:element.team_position,
                  team_award:element.team_award,
                  status:element.status
                }
                tempArr.push(tempObj)
              })

              this.addMemberForm.patchValue({
                wa: tempArr
              })

            }

            this.previewImg = res.List.image;
            this.cdref.detectChanges();
            this.spinner.hide();
 
          }
        }
      )
    }
  }

  goBack() {
    this.router.navigate(['/main/admin/trg-team/members'])
  }

  selectChanged(e: any) {
    var sec = e.target.value;

    if (sec === 'PT SEC') {
      this.isPt = true;
      this.isEqnt = false;
      this.isWt = false;
      this.addMemberForm.patchValue({
        subPosition: ''
      })
    } else if (sec == 'WT SEC') {
      this.isWt = true;
      this.isEqnt = false;
      this.isPt = false;

      this.addMemberForm.patchValue({
        subPosition: ''
      })
    } else if (sec == 'eqntsec') {
      this.isEqnt = true;
      this.isPt = false;
      this.isWt = false;

      this.addMemberForm.patchValue({
        subPosition: ''
      })
    } else {
      this.isEqnt = false;
      this.isPt = false;
      this.isWt = false;

      this.addMemberForm.patchValue({
        subPosition: ''
      })
    }

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

    console.log(this.addMemberForm.value);
    if (this.addMemberForm.invalid) {
      this.isError = true
    } else {

      this.spinner.show()
      this.service.addTRGMember(this.addMemberForm.value).subscribe(
        res => {
          console.log(res);
          if (res.status == '1') {
            this.openSnackbar(res.msg)
            this.cdref.detectChanges();
            this.spinner.hide();
            this.router.navigate(['/main/admin/trg-team/members'])
          } else {
            this.spinner.hide()
            this.openSnackbar(res.msg)
          }
        },
        err => {
          this.spinner.hide()
          this.openSnackbar('Error Occured.')
          console.log(JSON.stringify(err));

        }
      )
    }

    console.log(this.wa.value, "================>");

  }

  updateMember() {
    console.log(this.addMemberForm.value);
    if (this.addMemberForm.invalid) {
      console.log('invalid');
      
      this.isError = true;
    } else {
      this.spinner.show()
      this.service.updateTRGMember(this.id, this.addMemberForm.value).subscribe(
        res => {
          console.log(res);
          if (res.status == '1') {
            this.openSnackbar(res.msg)
            this.cdref.detectChanges();
            this.spinner.hide();
            this.router.navigate(['/main/admin/trg-team/members'])
          } else {
            this.spinner.hide()
            this.openSnackbar(res.msg);
          }
        },
        err => {
          this.spinner.hide()
          this.openSnackbar('Error Occured.')
          console.log(JSON.stringify(err));

        }
      )
    }

  }


  openSnackbar(msg) {
    this.snackbar.open(msg, 'x', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    })
  }


  AddInternalMember() {
    return this.fb.group({
      id:[''],
      team_rank: [''],
      team_name: [''],
      team_award: [''],
      team_position: [''],
      status: ['1']
    })
  }

  get wa() {
    return this.addMemberForm.controls["wa"] as FormArray;
  }

  addnewMember(): void {
    this.wa.push(this.AddInternalMember());
  }

  deleteMember(i: number) {
    this.wa.removeAt(i);
  }


}