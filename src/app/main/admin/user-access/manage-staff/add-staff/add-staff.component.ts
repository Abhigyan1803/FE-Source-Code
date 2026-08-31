import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'app/service/admin/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { from } from 'rxjs';
import { filter, find } from 'rxjs/operators';
import { Constants } from 'app/Constants/Constants';



@Component({
  selector: 'ms-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.scss']
})
export class AddStaffComponent implements OnInit {
  role
  officersList: any[] = []
  departments = Constants.DEPARTMENTS;

  addStaffForm: FormGroup;
  id;

  pageTitle;
  memberObj;
  previewImg;
  isError: boolean = false;
  isCoyCmdr: boolean = false;

  AppId: any[] = [];

  subDepart: any[] = [];
  Department: any[] = [];
  Did: any;
  roles: any = []

  modules: any = [];

  battalionsList: any[] = [];
  companyList: [] = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private service: AdminService,
    private cdref: ChangeDetectorRef,
    private spinner: NgxSpinnerService) {

    this.addStaffForm = this.fb.group({
      // departmentId: [''],
      // subDepartmentId: [''],
      // roleId: ['0'],
      // password: [''],
      // userId: [''],

      name: ['', [Validators.required]],
      battalionId: ['0'],
      compId: ['0'],

      email: [''],
      hasRole: ['0'],
      loginId: [''],
      password: ['', [Validators.required]],
      status: ['1'],
      userId: [''],
      username: ['', [Validators.required]]

    });
    this.getOfficersList();
    this.getBattalions();

  }


  ngOnInit(): void {
    this.getDepart();
    this.getRole();

    if (this.router.url.includes('add-staff')) {
      this.pageTitle = 'Add Staff'
    }
    else if (this.router.url.includes('view-staff')) {
      this.spinner.show()
      this.f.password.clearValidators()
      this.f.password.updateValueAndValidity()

      this.pageTitle = 'View Staff';
      this.id = this.route.snapshot.queryParamMap.get('id');
      this.service.getStaffMember.subscribe(
        (res: any) => {
          // console.log("USER: ", res);
          if (res) {
            this.addStaffForm.patchValue(res);
            this.battalionSelected(res.battalionId)
            // this.addStaffForm.disable();
            this.setModule();
            this.roleArr = res.hasRole.split(',').map(function (item) {
              return parseInt(item, 10);
            });
          } else {
            this.goBack();
          }

        }
      )
      // this.service.getTRGBattalionMemberById(this.id).subscribe(
      //   res => {

      //     // console.log(res);
      //     // if (res.status == 'OK') {
      //     //   this.battalionSelected(res.object.battalionType.id)
      //     //   this.addStaffForm.patchValue({
      //     //     rank: res.object.rank,
      //     //     name: res.object.name,
      //     //     post: res.object.battalionPost.id,
      //     //     battalion: res.object.battalionType.id,
      //     //     company: res.object.companyId,
      //     //     status: res.object.status,
      //     //     awards: res.object.award
      //     //   })
      //     //   if (res.object.battalionPost.id == 3) {
      //     //     this.isCoyCmdr = true;
      //     //     this.addStaffForm.get('company').setValidators([Validators.required]);
      //     //     this.addStaffForm.get('company').updateValueAndValidity();
      //     //   }
      //     //   else {
      //     //     this.isCoyCmdr = false;
      //     //     this.addStaffForm.get('company').clearValidators();
      //     //     this.addStaffForm.get('company').updateValueAndValidity();
      //     //   }
      //     //   this.previewImg = res.object.image
      //     //   this.spinner.hide();
      //     // } else {
      //     //   this.spinner.hide();
      //     //   this.service.openSnackbar(res.message);
      //     // }

      //   }
      // )
    }

  }



  ngAfterViewInit() {

  }


  // ======== OFFICER'S LIST =======
  getOfficersList() {
    this.service.getOfficersList().subscribe(
      res => {
        this.officersList = res.object;
        this.cdref.detectChanges();
      },
      err => {

      }
    )
  }

  officerSelected(value) {
    // console.log(value);
    const source = from(this.officersList);
    const findOfficer = source.pipe(find((obj: any) => obj.id === parseInt(value)));
    const subscribeOfficerRecord = findOfficer.subscribe(
      val => {
        // console.log(val);
        if (val) {
          this.f.name.setValue(val.name);
        }
      }
    );
  }


  //===== GET BATTALION LIST=======
  getBattalions() {
    this.service.getBattalionList().subscribe(
      res => {
        // console.log(res);
        this.battalionsList = res.object
        this.cdref.detectChanges();
      },
      err => {

      }
    )
  }

  battalionSelected(id) {
    if (id != 0) {

      this.companyList = [];
      this.f.compId.setValue('')
      // this.f.compId.setValidators([Validators.required])
      // this.f.compId.updateValueAndValidity();

      this.getCompaniesList(id)
      // console.log(this.addStaffForm.value);

    } else if (id == 0) {

      this.companyList = [];
      this.f.compId.setValue('');
      // this.f.compId.clearValidators();
      // this.f.compId.updateValueAndValidity();

    }
  }


  //======== GET COMPANY LIST ========

  getCompaniesList(id) {
    this.service.getCompanyList(id).subscribe(
      res => {
        this.companyList = res.object;
      }
    )
  }




  goBack() {
    this.router.navigate(['main/admin/user-access/manage-staff']);
  }

  dj
  dj1

  newRolesArr: any[] = [];

  getRole() {
    this.service.getRole().subscribe(res => {
      if (res.status == "OK") {
        this.roles = res.object;

        // console.log("ALL ROLES: ",res);

        this.roles.forEach(
          element => {
            let dept = this.newRolesArr.find(el => el.department == element.department)
            if (!dept) {
              this.newRolesArr.push(
                {
                  department: element.department,
                  roles: [element]
                }
              )
            } else {
              dept.roles.push(element)
            }

          }
        )

        this.newRolesArr.map(
          element => {
            if (!element.department)
              element.department = 'Other'
          }
        )

        this.newRolesArr.sort(
          (a, b) => {
            var num;
            if (a.department < b.department)
              num = -1;
            if (a.department > b.department)
              num = 1;
            if (a.department == b.department)
              num = 0;
            return num;
          }
        )
        const otherIndex = this.newRolesArr.findIndex(element => element.department == 'Other')
        const otherDept = this.newRolesArr.splice(otherIndex, 1)[0];
        this.newRolesArr.splice(this.newRolesArr.length, 0, otherDept)
        console.log(this.newRolesArr);

        if (this.roles) {
          this.setModule()
        }
      }
    }, err => { })
  }



  setModule(value?) {


    // console.log(this.roles);
    // const role = this.roles.find(
    //   ele=>{
    //     if(ele.roleId == value){
    //       this.f.username.setValue(ele.roleName)
    //       return ele;
    //     }
    //   }
    // )
    // console.log("ROLE, ",role);
    // console.log("EVENT: ",event.target.value);

    // this.modules = [];
    if (this.addStaffForm.value.hasRole) {
      this.roles.forEach(rElement => {
        if (this.addStaffForm.value.hasRole == rElement['roleId']) {
          this.modules = rElement['modulesPayLoadList'];

          for (let index = 0; index < this.modules.length; index++) {
            const mElement = this.modules[index];
            if (mElement['isCreate'] || mElement['isView'] || mElement['isUpdate'] || mElement['isDelete']) {
              this.modules[index]['isModule'] = true;
            }

            if (mElement.subModules.length) {
              for (let subIndex = 0; subIndex < mElement.subModules.length; subIndex++) {
                const sElement = mElement.subModules[subIndex];
                if (sElement['isCreate'] || sElement['isView'] || sElement['isUpdate'] || sElement['isDelete']) {
                  this.modules[index]['subModules'][subIndex]['isSubModule'] = true;
                }
              }
            }
          }
        }
      });
    }
    console.log(this.modules);

  }

  getDepart() {
    this.service.getDepartmentLIST().subscribe(
      res => {

        this.spinner.show();
        if (res.status == 'OK') {
          this.Department = res.object
          // this.Did = res.object.id
          // console.log(this.Did,"did>........");

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


  getSubDepart(e: any) {
    this.dj = e
    this.spinner.show();

    this.service.getSubDepartmentLIST(this.dj).subscribe(
      res => {
        console.log(res)
        this.addStaffForm.patchValue({
          roleName: res.object.roleName,
        })
        if (res.status == 'OK') {
          this.subDepart = res.object
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

  getApptRole(e: any) {
    this.dj1 = e
    this.spinner.show();
    // console.log(this.dj1, "dj11");

    this.service.getApptRoleLIST(this.dj, this.dj1).subscribe(
      res => {
        console.log("APPT: ", res)
        if (res.status == 'OK') {
          this.AppId = res.object
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


  roleArr: any[] = [];

  roleSelected(e: any, role) {
    
    if(e.target.checked){
      this.roleArr.push(role.roleId)
    } else {
      if(this.roleArr.includes(role.roleId)){
        this.roleArr.splice(this.roleArr.findIndex(element=>element == role.roleId),1)
      }
    }
    
  }

  public get f() {
    return this.addStaffForm.controls;
  }

  addStaff() {
    console.log(this.addStaffForm.value);
    if (this.addStaffForm.invalid) {
      this.isError = true;
    } else {
      this.spinner.show();
      this.f.hasRole.setValue(this.roleArr.toString())
      console.log(this.addStaffForm.value);

      this.service.createStaff(this.addStaffForm.value).subscribe(
        res => {
          if (res.status == 'OK') {
            this.service.openSnackbar(res.message)
            this.cdref.detectChanges();
            this.spinner.hide();
            this.goBack()
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

    // if (this.addStaffForm.invalid) {
    //   this.isError = true;
    // } else {
    //   this.spinner.show();
    //   console.log(this.addStaffForm.value.hasRole);

    //   this.service.addRole(this.addStaffForm.value).subscribe(
    //     res => {
    //       if (res.status == 'OK') {
    //         this.service.openSnackbar(res.message)
    //         this.cdref.detectChanges();
    //         this.spinner.hide();
    //         this.router.navigate(['main/admin/role']);
    //       } else {
    //         this.spinner.hide();
    //         this.service.openSnackbar(res.message)
    //       }
    //     },
    //     err => {
    //       this.spinner.hide();
    //       this.service.openSnackbar('Error Occured.')
    //       console.log(JSON.stringify(err));
    //     }
    //   )
    // }

  }

  updateStaff() {
    if (this.addStaffForm.invalid) {
      this.isError = true;
    } else {
      this.spinner.show();
      this.f.hasRole.setValue(this.roleArr.toString())

      this.service.updateStaff(this.addStaffForm.value).subscribe(
        res => {
          if (res.status == 'OK') {
            this.service.openSnackbar(res.message)
            this.cdref.detectChanges();
            this.spinner.hide();
            this.goBack()
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
    // if (this.addStaffForm.invalid) {
    //   this.isError = true;
    // } else {
    //   this.spinner.show()
    //   this.service.updateTRGBattalionMember(this.id, this.addStaffForm.value).subscribe(
    //     res => {
    //       if (res.status == 'OK') {
    //         this.service.openSnackbar(res.message)
    //         this.cdref.detectChanges();
    //         this.spinner.hide();
    //         this.router.navigate(['main/admin/user-access/manage-staff'])
    //       } else {
    //         this.spinner.hide()
    //         this.service.openSnackbar(res.message);
    //       }
    //     },
    //     err => {
    //       this.spinner.hide()
    //       this.service.openSnackbar('Error Occured.')
    //     }
    //   )
    // }
  }









}
