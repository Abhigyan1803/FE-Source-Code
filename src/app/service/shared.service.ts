import { Injectable } from '@angular/core';
import { Links } from '../links.module'
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { DomSanitizer, SafeResourceUrl, } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public IP =  Links.IP;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  fileSize:string='200'

  constructor(private http: HttpClient, private snackbar: MatSnackBar,
    public sanitizer: DomSanitizer
    ) {

    this.jwtToken = localStorage.getItem('jwtToken')

    // console.log('shared service initialized');
   }


  
  compare(a: number | string | any, b: number | string | any, isAsc: boolean) {
    console.log("a", a);
    console.log("b", b)
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  getCompanies(id) {
    const formData = new FormData();
    formData.append('id', id);
    return this.http.post(Links.GET_COMPANY_BY_BATTALION, formData).pipe(map((response: any) => response));
  }

  getBattalionList() {
    return this.http.get(Links.GET_BATTALION_LIST).pipe(map((response: any) => response));
  }

  getAllWeeks(){
    return this.http.get(Links.GET_ALL_WEEK).pipe(map((response: any) => response));
  }

  getAllSeasonTerms(){
    return this.http.get(Links.GET_ALL_TERMS).pipe(map((response: any) => response));
  }
  getAllExerciseType(){
    return this.http.get(Links.GET_EXERCISE_Types).pipe(map((response: any) => response));
  }
  jwtToken = "";

  getAllGcappt(){
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.jwtToken}`)
    };
    return this.http.get(Links.GET_GCAPPT,httpOptions).pipe(map((response: any) => response));
  }
  getAllEntryType(){
    return this.http.get(Links.GET_ENTRY_Type).pipe(map((response: any) => response));

  }

  getAllTerms(){
    return this.http.get(Links.GET_TERMS).pipe(map((response: any) => response));
  }

  getFileUrl(url){
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.IP + url);
  }

  openSnackbar(msg) {
    this.snackbar.open(msg, 'x', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    })
  }
  openSnackbarWithSeconds(msg:string,seconds:number){

    this.snackbar.open(msg, 'X', {
      duration: seconds*1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    })
    
  }

  openErrorSnackbarWithSeconds(msg:string,seconds:number){

    this.snackbar.open(msg, 'OK', {
      duration: seconds*1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass:'error-snackbar'
    })
    
  }
  
  openAlertSnackbarWithSeconds(msg:string,seconds:number){

    this.snackbar.open(msg, 'X', {
      duration: seconds*1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass:'alert-snackbar'
    })
    
  }
  //

  //check image size for 200 mb 
  checkFileSize(fileData:any){
    console.log(fileData);
        
    if (fileData.size > 202428800) { 
      return false
    }else return true
  }


}
