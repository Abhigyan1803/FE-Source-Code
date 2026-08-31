import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'app/service/admin/admin.service';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
import { PostmanService } from 'app/Shared/postman-service';
import { NgxSpinnerService } from 'ngx-spinner';
import {Constants} from 'app/Constants/Constants'

@Component({
  selector: 'ms-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss']
})
export class AddRoleComponent implements OnInit {

  addRoleForm: FormGroup;
  pageTitle: any = 'Add Role';
  modules: any[] = [];
  departments:string[]=Constants.DEPARTMENTS


  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private service: AdminService,
    private cdref: ChangeDetectorRef,    
    public postmanService: PostmanService,
    private spinner: NgxSpinnerService) {
    this.addRoleForm = this.fb.group({
      roleId: ['0'],
      roleName: [''],
      modulesPayLoadList: [''],
      department:[''],
      appointment:[''],
      status: ['1']

    });    

    let rowData: any = this.postmanService.getRowData();

    if (rowData.length != 0) {
      this.getAllModules(rowData.modulesPayLoadList);
      this.addRoleForm.patchValue({
        roleId: rowData.roleId,
        roleName: rowData.roleName,
        department:rowData.department,
        appointment:rowData.appointment,
        status: rowData.status,

      });
      this.pageTitle = 'Update Role';
    } else {
      this.getAllModules();
    }
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.postmanService.setRowData([]);
  }

  // ngAfterViewInit() {
  //   this.getDepart();
  // }
  getPreviousRouote():string{
    const routeArr = this.router.url.split('/');
    let navRoute='';
    for(let i=0;i<routeArr.length-1;i++){
      if(routeArr[i]){
        navRoute = navRoute+'/'+routeArr[i];
      }  
    }
    return navRoute;
  }

  goBack() {
    this.router.navigate([this.getPreviousRouote()]);
  }

  getAllModules(permissions: any = []) {
    this.spinner.show();
    this.service.getAllModuleList().subscribe(
      res => {
        if (res.status == 'OK') {
          this.modules = res.object;

          if ((this.addRoleForm.value.roleId != 0) && (permissions.length != 0)) {
            permissions.forEach((pmElement: any) => {
              for (let index = 0; index < this.modules.length; index++) {
                const mElement = this.modules[index];
  
                if (pmElement['id'] == mElement['id']) {
                  if (pmElement['isCreate'] || pmElement['isView'] || pmElement['isUpdate'] || pmElement['isDelete']) {
                    this.modules[index]['isModule'] = true;
                  }
                  
                  this.modules[index]['isCreate'] = pmElement['isCreate'];
                  this.modules[index]['isView'] = pmElement['isView'];
                  this.modules[index]['isUpdate'] = pmElement['isUpdate'];
                  this.modules[index]['isDelete'] = pmElement['isDelete'];

                  if(pmElement.subModules.length != 0) {
                    pmElement.subModules.forEach(psElement => {
                      for (let subIndex = 0; subIndex < mElement.subModules.length; subIndex++) {
                        const sElement = mElement.subModules[subIndex];
          
                        if (psElement['id'] == sElement['id']) {
                          if (psElement['isCreate'] || psElement['isView'] || psElement['isUpdate'] || psElement['isDelete']) {
                            this.modules[index]['subModules'][subIndex]['isSubModule'] = true;
                          }
                          
                          this.modules[index]['subModules'][subIndex]['isCreate'] = psElement['isCreate'];
                          this.modules[index]['subModules'][subIndex]['isView'] = psElement['isView'];
                          this.modules[index]['subModules'][subIndex]['isUpdate'] = psElement['isUpdate'];
                          this.modules[index]['subModules'][subIndex]['isDelete'] = psElement['isDelete'];
                        }
                      }
                    });
                  }
                }
              }
            });
  
            this.addRoleForm.patchValue({
              modulesPayLoadList: this.modules
            });
          }
        }
        this.spinner.hide();
      }, () => {
        this.spinner.hide();
      }
    )
  }

  manageRole() {
    this.spinner.show();

    if(this.pageTitle == 'Add Role') {
      this.service.addRole(this.addRoleForm.value).subscribe(
        res => {
          if (res.status == 'OK') {
            this.service.openSnackbar(res.message)
            this.cdref.detectChanges();
            this.spinner.hide();
            this.router.navigate(['main/admin/user-access/manage-role']);
          } else {
            this.spinner.hide();
            this.service.openSnackbar(res.message);
          }
        },
        () => {
          this.spinner.hide();
          this.service.openSnackbar('Error Occured.');
        }
      )
    } else {
      this.service.updateRole(this.addRoleForm.value).subscribe(
        res => {
          if (res.status == 'OK') {
            this.service.openSnackbar(res.message)
            this.cdref.detectChanges();
            this.spinner.hide();
            this.router.navigate(['main/admin/user-access/manage-role']);
          } else {
            this.spinner.hide();
            this.service.openSnackbar(res.message);
          }
        },
        () => {
          this.spinner.hide();
          this.service.openSnackbar('Error Occured.');
        }
      )
    }
  }

  trackInputRecord(index: any, type: any, e: any) {
    this.modules[index][type] = e.target.checked;
    if (e.target.checked == true) {
      if (type == 'isModule') {
        this.modules[index]['isView'] = e.target.checked;
      } else if (type == 'isCreate' || type == 'isView' || type == 'isUpdate' || type == 'isDelete') {
        this.modules[index]['isModule'] = e.target.checked;
        this.modules[index]['isView'] = e.target.checked;
      }
    } else {
      if ((type == 'isModule') || (type == 'isView')) {
        this.modules[index]['isModule'] = e.target.checked;
        this.modules[index]['isCreate'] = e.target.checked;
        this.modules[index]['isView'] = e.target.checked;
        this.modules[index]['isUpdate'] = e.target.checked;
        this.modules[index]['isDelete'] = e.target.checked;

        if(this.modules[index]['subModules'].length != 0) {
          for (let subIndex = 0; subIndex < this.modules[index]['subModules'].length; subIndex++) {
            this.modules[index]['subModules'][subIndex]['isSubModule'] = e.target.checked;
            this.modules[index]['subModules'][subIndex]['isCreate'] = e.target.checked;
            this.modules[index]['subModules'][subIndex]['isView'] = e.target.checked;
            this.modules[index]['subModules'][subIndex]['isUpdate'] = e.target.checked;
            this.modules[index]['subModules'][subIndex]['isDelete'] = e.target.checked;
          }
        }
      }
    }

    this.addRoleForm.patchValue({
      modulesPayLoadList: this.modules
    });
  }

  trackSubInputRecord(index: any, subIndex: any, type: any, e: any) {
    this.modules[index]['subModules'][subIndex][type] = e.target.checked;

    if (e.target.checked == true) {      
      this.modules[index]['isModule'] = e.target.checked;
      this.modules[index]['isView'] = e.target.checked;

      if (type == 'isSubModule') {
        this.modules[index]['subModules'][subIndex]['isView'] = e.target.checked;
      } else if (type == 'isCreate' || type == 'isView' || type == 'isUpdate' || type == 'isDelete') {
        this.modules[index]['subModules'][subIndex]['isSubModule'] = e.target.checked;
        this.modules[index]['subModules'][subIndex]['isView'] = e.target.checked;
      }
    } else {
      if ((type == 'isSubModule') || (type == 'isView')) {
        this.modules[index]['subModules'][subIndex]['isSubModule'] = e.target.checked;
        this.modules[index]['subModules'][subIndex]['isCreate'] = e.target.checked;
        this.modules[index]['subModules'][subIndex]['isView'] = e.target.checked;
        this.modules[index]['subModules'][subIndex]['isUpdate'] = e.target.checked;
        this.modules[index]['subModules'][subIndex]['isDelete'] = e.target.checked;
      }
    }

    this.addRoleForm.patchValue({
      modulesPayLoadList: this.modules
    });
  }

  selectUnselectAll(e: any) {
    for (let index = 0; index < this.modules.length; index++) {
      this.modules[index]['isModule'] = e.target.checked;
      this.modules[index]['isCreate'] = e.target.checked;
      this.modules[index]['isView'] = e.target.checked;
      this.modules[index]['isUpdate'] = e.target.checked;
      this.modules[index]['isDelete'] = e.target.checked;

      if(this.modules[index]['subModules'].length != 0) {
        for (let subIndex = 0; subIndex < this.modules[index]['subModules'].length; subIndex++) {
          this.modules[index]['subModules'][subIndex]['isSubModule'] = e.target.checked;
          this.modules[index]['subModules'][subIndex]['isCreate'] = e.target.checked;
          this.modules[index]['subModules'][subIndex]['isView'] = e.target.checked;
          this.modules[index]['subModules'][subIndex]['isUpdate'] = e.target.checked;
          this.modules[index]['subModules'][subIndex]['isDelete'] = e.target.checked;
        }
      }
    }
  }
}
