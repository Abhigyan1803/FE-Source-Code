import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CKEditor4 } from 'ckeditor4-angular/ckeditor';

import { AuthService } from 'app/service/auth-service/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'app/service/shared.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';

import { AcademicDeptService } from 'app/service/academic-dept/academic-dept.service'
import { AdminService } from 'app/service/admin/admin.service';
import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { Constants } from 'app/Constants/Constants';
import { Links } from 'app/links.module';

@Component({
  selector: 'ms-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.scss']
})
export class AddSubjectComponent implements OnInit {
  public IP = Links.IP;
  id;
  pTitle = "Add"
  term: string;
  termId: number;
  paper: string;
  subject: string
  terms: any[] = [];
  isError: boolean = false;


  docExtArr: string[] = Constants.DOC_EXTS;
  imgExtArr: string[] = Constants.IMG_EXTS;
  vidExtArr: string[] = Constants.VID_EXTS;

  papers: string[] = ['Paper 1', 'Paper 2', 'Paper 3', 'Paper 4', 'Paper 5', 'Paper 6'];

  sTitle
  addSubjectForm: FormGroup = new FormGroup({});
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private route: ActivatedRoute,
    private spinner: NgxSpinnerService, private cdref: ChangeDetectorRef, private dialog: MatDialog, private service: AcademicDeptService, private adminService: AdminService
    , public sharedService: SharedService) {
    this.route.params.subscribe((params) => {
      this.term = params.term;
      this.paper = params.paper;
      this.subject = params.subject;
      if (this.subject == "Science and Warfare") {
        this.sTitle = "Science & Warfare";
      } else {
        this.sTitle = params.subject;
      }


      if (this.term == "I Term") {
        this.termId = 1;
      } else if (this.term == "II Term") {
        this.termId = 2;
      } else if (this.term == "III Term") {
        this.termId = 3;
      } else if (this.term == "II Tech") {
        this.termId = 7;
      } else {
        this.sharedService.openErrorSnackbarWithSeconds('Error!', 5);
        this.router.navigate(['/main/academic-depart/dashboard'])
      }

      if (!this.papers.includes(this.paper)) {

        this.sharedService.openErrorSnackbarWithSeconds('Error!', 5);
        this.router.navigate(['/main/academic-depart/dashboard'])

      }



      this.addSubjectForm = this.fb.group({

        termId: [this.termId],
        paper: [this.paper],
        subjectName: [this.subject],
        termTopic: this.fb.array([this.getATopic()]),
        questionBank: this.fb.array([this.getAQuestionBank()]),
        previousTermPaper: this.fb.array([this.getAPreviousTermPaper()]),
      })




    });
  }

  ngOnInit(): void {

    if (this.router.url.includes('view-subject')) {

      this.id = this.route.snapshot.queryParamMap.get('id');
      // // console.log(this.id);
      this.pTitle = "View"

      if (this.id) {
        this.getSubjectTopicsById(this.id)
      }
    }
  }

  ngAfterViewInit() {

  }

  getSubjectTopicsById(id) {
    this.service.getSubjectById(id).subscribe(
      res => {
        // // console.log("Topic Response",res);
        if (res.status == "OK") {
          const obj = res.object;


          if (obj.termTopic.length) {
            // this.getAllTopics.clear();
            let tempArr: any[] = [];

            for (let i = 0; i <= obj.termTopic.length - 1; i++) {

              // const furl = obj.termTopic[i].notesUrl
              // // console.log("FILE URL: ", furl);

              let notesList: any[] = [];

              // // console.log("NOTES: ",obj.termTopic[i].notesList);

              obj.termTopic[i].notesList.forEach(element => {
                let ext = element.notesUrl.substring(element.notesUrl.lastIndexOf('.') + 1);

                let typeofnote;


                if (ext == "docx" || ext == "doc" || ext == "pdf" || ext == "pptx" || ext == "ppt") {
                  typeofnote = 'document'
                } else if (
                  ext == "apng" || ext == "png" || ext == "gif" || ext == "jpg" || ext == "jpeg" || ext == "jfif" ||
                  ext == "pjpg" || ext == "pjpeg" || ext == "svg" || ext == "tiff" || ext == "tif"
                ) {
                  typeofnote = 'img'
                } else if (
                  ext == "mp4" || ext == "mov" || ext == "wmv" || ext == "avi" || ext == "flv" || ext == "mkv"
                  || ext == "webm"
                ) {
                  typeofnote = 'video'
                }

                notesList.push({
                  noteId: element.noteId,
                  notesName: element.notesName,
                  notesUrl: element.notesUrl,
                  termTopicIdFk: element.termTopicIdFk,
                  noteType: typeofnote
                })




              });




              tempArr.push({
                academicTermIdfk: obj.termTopic[i].academicTermIdfk,
                termTopicId: obj.termTopic[i].termTopicId,
                bonesReading: obj.termTopic[i].bonesReading,
                instruction: obj.termTopic[i].instruction,
                learningOutcomes: obj.termTopic[i].learningOutcomes,
                // notesName: obj.termTopic[i].notesName,
                // notesUrl: obj.termTopic[i].notesUrl,

                notesList: notesList,

                requiredReading: obj.termTopic[i].requiredReading,
                topicName: obj.termTopic[i].topicName,

                // noteType: typeofnote
              })

              // console.log("TEMP ARRAY: ", tempArr);

            }

            for (let i = 1; i < obj.termTopic.length; i++) {
              this.addATopic()
              // // console.log(this.addSubjectForm.get('termTopic').value)
            }

            // // console.log("TEMPORARY ARRAY: ", tempArr);


            this.addSubjectForm.patchValue({
              termTopic: tempArr
            })


          }




          if (obj.questionBank.length) {
            // this.getAllTopics.clear();
            let tempArr: any[] = [];
            for (let i = 0; i <= obj.questionBank.length - 1; i++) {

              const furl = obj.questionBank[i].queBankurl
              // // console.log("FILE URL: ",furl);

              let ext = furl.substring(furl.lastIndexOf('.') + 1);
              // // console.log("FILE EXTENSION: ",ext);

              let typeofQB;

              if (ext == "docx" || ext == "doc" || ext == "pdf" || ext == "pptx" || ext == "ppt") {
                typeofQB = 'document'
              } else
                if (
                  ext == "apng" || ext == "png" || ext == "gif" || ext == "jpg" || ext == "jpeg" || ext == "jfif" ||
                  ext == "pjpg" || ext == "pjpeg" || ext == "svg" || ext == "tiff" || ext == "tif"
                ) {
                  typeofQB = 'img'
                }


              tempArr.push(
                {
                  academicTermIdfk: obj.questionBank[i].academicTermIdfk,
                  questionBankId: obj.questionBank[i].questionBankId,
                  queBankurl: obj.questionBank[i].queBankurl,
                  questionBankName: obj.questionBank[i].questionBankName,
                  type: typeofQB
                }
              )

            }

            for (let i = 1; i < obj.questionBank.length; i++) {
              this.addAQuestionBank()
            }

            // // console.log("TEMPORARY ARRAY QUESTION BANK: ", tempArr);
            this.addSubjectForm.patchValue({
              questionBank: tempArr
            })
            // // console.log(this.addSubjectForm.get('questionBank').value);

          }

          if (obj.previousTermPaper.length) {
            // this.getAllTopics.clear();
            let tempArr: any[] = [];
            for (let i = 0; i <= obj.previousTermPaper.length - 1; i++) {

              const furl = obj.previousTermPaper[i].url
              // // console.log("FILE URL: ",furl);

              let ext = furl.substring(furl.lastIndexOf('.') + 1);
              // // console.log("FILE EXTENSION: ",ext);

              let typeofPTP;

              if (ext == "docx" || ext == "doc" || ext == "pdf" || ext == "pptx" || ext == "ppt") {
                typeofPTP = 'document'
              } else if (
                ext == "apng" || ext == "png" || ext == "gif" || ext == "jpg" || ext == "jpeg" || ext == "jfif" ||
                ext == "pjpg" || ext == "pjpeg" || ext == "svg" || ext == "tiff" || ext == "tif"
              ) {
                typeofPTP = 'img'
              }


              tempArr.push(
                {
                  academicTermIdfk: obj.previousTermPaper[i].academicTermIdfk,
                  previousTermPaperId: obj.previousTermPaper[i].previousTermPaperId,
                  paperName: obj.previousTermPaper[i].paperName,
                  url: obj.previousTermPaper[i].url,
                  type: typeofPTP
                }
              )

            }
            for (let i = 1; i < obj.previousTermPaper.length; i++) {
              this.addAPreviousTermPaper()
            }

            // // console.log("TEMPORARY ARRAY: ", tempArr);


            this.addSubjectForm.patchValue({
              previousTermPaper: tempArr
            })


          }

        }
        // // console.log("At Update, Subject form value: ", this.addSubjectForm.value);

      }
    )
  }




  //================TOPICS=========================
  get getAllTopics(): FormArray {
    return this.addSubjectForm.get('termTopic') as FormArray;
  }
  getATopic(): FormGroup {
    return this.fb.group({
      academicTermIdfk: [''],
      termTopicId: [''],
      bonesReading: [''],
      instruction: [''],
      //new field add
      pdfDoc:[''],
      learningOutcomes: [''],
      // notesName: [''],
      // notesUrl: [''],
      notesList: this.fb.array([this.getNotes()]),
      requiredReading: [''],
      topicName: ['', Validators.required],
      preview: [''],
      // noteType: ['']
    })
  }
  addATopic(): void {
    this.getAllTopics.push(this.getATopic())
  }
  removeATopic(i): void {
    this.getAllTopics.removeAt(i)
  }

  //======= NOTES =========
  getAllNotes(i): FormArray {
    return this.getAllTopics.at(i).get('notesList') as FormArray;
  }

  getNotes(): FormGroup {
    return this.fb.group({
      noteId: [''],
      notesName: [''],
      notesUrl: [''],
      progress: 0,
      termTopicIdFk: [''],
      noteType: ['']
    })
  }

  addANotes(i): void {
    this.getAllNotes(i).push(this.getNotes());
  }

  removeNotes(i, j): void {
    this.getAllNotes(i).removeAt(j);
  }
  //===============================================

  /**========== QUESTION BANK ========= */
  get getAllQuestionBank(): FormArray {
    return this.addSubjectForm.get('questionBank') as FormArray;
  }
  getAQuestionBank(): FormGroup {
    return this.fb.group({
      progress:0,
      academicTermIdfk: [''],
      questionBankId: [''],
      queBankurl: [''],
      questionBankName: [''],
      preview: [''],
      type: ['']
    })
  }
  addAQuestionBank(): void {
    this.getAllQuestionBank.push(this.getAQuestionBank());
  }
  removeAQuestionBank(i): void {
    this.getAllQuestionBank.removeAt(i);
  }
  /** ================================= */


  /**========== PREVIOUS TERM PAPERS ========== */
  get getAllPreviousTermPapers(): FormArray {
    return this.addSubjectForm.get('previousTermPaper') as FormArray
  }
  getAPreviousTermPaper(): FormGroup {
    return this.fb.group({
      progress:0,
      academicTermIdfk: [''],
      previousTermPaperId: [''],
      paperName: [''],
      url: [''],
      preview: [''],
      type: ['']
    })
  }
  addAPreviousTermPaper(): void {
    this.getAllPreviousTermPapers.push(this.getAPreviousTermPaper());
  }
  removeAPreviousTermPaper(i): void {
    this.getAllPreviousTermPapers.removeAt(i)
  }
  /**============================================*/


  checkFileSize(mb: number, size: number): boolean {
    let bts = 1024 * 1024 * mb;
    if (size > bts) {
      this.sharedService.openSnackbar("File Size is Greater than " + mb + " MB.");
      return false;
    } else {
      return true;
    }
  }

  //===== SET NOTES UPLOADING PROGRESS=======
  setNotesProgress(i, j, progress) {
    this.getAllNotes(i).at(j).patchValue({
      progress: progress
    })
  }
  //===== SET NOTES URL=======
  setNoteUrl(i: number, j: number, url: string, type: string) {
    this.getAllNotes(i).at(j).patchValue({
      notesUrl: url,
      noteType: type
    })
  }

  //===== SET QUESTION BANK UPLOADING PROGRESS=======
  setQBProgress(i, progress) {
    this.getAllQuestionBank.controls[i].patchValue({
      progress: progress
    })
  }
  //===== SET QUESTION BANK URL=======
  setQBUrl(i: number, url: string, type: string) {
    this.getAllQuestionBank.controls[i].patchValue({
      queBankurl: url,
      type: type
    })
  }

  //===== SET QUESTION BANK UPLOADING PROGRESS=======
  setPaperProgress(i, progress) {
    this.getAllPreviousTermPapers.controls[i].patchValue({
      progress:progress
    })
  }
  //===== SET QUESTION BANK URL=======
  setPaperUrl(i: number, url: string, type: string) {
    this.getAllPreviousTermPapers.controls[i].patchValue({
      url: url,
      type: type
    })
  }


  addNotes(e: any, i, j) {
    if (e.target.files) {
      const file = (e.target as HTMLInputElement).files[0]
      const ext = file.name.substring(file.name.lastIndexOf('.') + 1)
      if (this.docExtArr.includes(ext) || this.imgExtArr.includes(ext) || this.vidExtArr.includes(ext)) {
        if (this.checkFileSize(1024, file.size)) {
          this.service.uploadFile(file).subscribe(
            (res: HttpEvent<any>) => {
              // // console.log(res);
              let _progress
              switch (res.type) {
                case HttpEventType.Sent:
                  this.authService.resetTime()
                  // console.log('Request has been made!');
                  break;
                case HttpEventType.ResponseHeader:
                  this.authService.resetTime()
                  // console.log('Response header has been received!');
                  break;
                case HttpEventType.UploadProgress:
                  _progress = Math.round(res.loaded / res.total * 100);
                  this.authService.resetTime()
                  // // console.log(`Uploaded! ${_progress}%`);
                  this.setNotesProgress(i, j, _progress)
                  break;
                case HttpEventType.Response: {
                  // // console.log('User successfully created!', res.body);
                  const obj = res.body;

                  if (obj.status == "OK") {
                    if (this.docExtArr.includes(ext)) {
                      this.setNoteUrl(i, j, obj.object.url, 'document')
                    } else if (this.imgExtArr.includes(ext)) {
                      this.setNoteUrl(i, j, obj.object.url, 'img')
                    } else if (this.vidExtArr.includes(ext)) {
                      this.setNoteUrl(i, j, obj.object.url, 'video')
                    }
                  }
                  // // console.log(this.addSubjectForm.value);
                  this.authService.resetTime()
                }
              }
            }
          )
        } else {
          this.sharedService.openAlertSnackbarWithSeconds('File Size Exceeded.', 3)
        }
      } else {
        this.sharedService.openAlertSnackbarWithSeconds("Please Select a Valid File or Document.", 5)
      }
    }
  }

  //pdf new feature of notes add
  addDocFile(e:any,i,j){
    console.log(e.target.files);
    const file = (e.target as HTMLInputElement).files[0]
    const ext = file.name.substring(file.name.lastIndexOf('.') + 1)
    console.log(file);
    // this.service.uploadFile(file).subscribe(
    //   (res: HttpEvent<any>) => {
    //     // // console.log(res);
    //     let _progress
    //     switch (res.type) {
    //       case HttpEventType.Sent:
    //         this.authService.resetTime()
    //         // console.log('Request has been made!');
    //         break;
    //       case HttpEventType.ResponseHeader:
    //         this.authService.resetTime()
    //         // console.log('Response header has been received!');
    //         break;
    //       case HttpEventType.UploadProgress:
    //         _progress = Math.round(res.loaded / res.total * 100);
    //         this.authService.resetTime()
    //         // // console.log(`Uploaded! ${_progress}%`);
    //         this.setNotesProgress(i, j, _progress)
    //         break;
    //       case HttpEventType.Response: {
    //         // // console.log('User successfully created!', res.body);
    //         const obj = res.body;

    //         if (obj.status == "OK") {
    //           if (this.docExtArr.includes(ext)) {
    //             this.setNoteUrl(i, j, obj.object.url, 'document')
    //           } 
    //         }
    //         // // console.log(this.addSubjectForm.value);
    //         this.authService.resetTime()
    //       }
    //     }
    //   }
    // )
    
    if (file.size > 202428800) { 
      this.sharedService.openSnackbar('Document Should Be Maximum 200 MB in Size')
    }else{
      this.service.uploadFile(file).subscribe(
        res => {
          console.log(res);
          
          console.log(res.object.url);
        
        },
        err => {
          console.log(JSON.stringify(err));
        }
      )
    }
  }


  addQuestionBank(e: any, i) {
    if (e.target.files) {
      const file = e.target.files[0]
      const ext = file.name.substring(file.name.lastIndexOf('.') + 1)
      if (this.docExtArr.includes(ext) || this.imgExtArr.includes(ext)) {

        if (this.checkFileSize(150, file.size)) {
          this.service.uploadFile(file).subscribe(
            (res: HttpEvent<any>) => {
              // // console.log(res);
              let _progress
              switch (res.type) {
                case HttpEventType.Sent:
                  this.authService.resetTime()
                  // console.log('Request has been made!');
                  break;
                case HttpEventType.ResponseHeader:
                  this.authService.resetTime()
                  // console.log('Response header has been received!');
                  break;
                case HttpEventType.UploadProgress:
                  _progress = Math.round(res.loaded / res.total * 100);
                  this.authService.resetTime()
                  // // console.log(`Uploaded! ${_progress}%`);
                  this.setQBProgress(i, _progress)
                  break;
                case HttpEventType.Response: {
                  // // console.log('User successfully created!', res.body);
                  const obj = res.body;

                  if (obj.status == "OK") {
                    if (this.docExtArr.includes(ext)) {
                      this.setQBUrl(i, obj.object.url, 'document')
                    } else if (this.imgExtArr.includes(ext)) {
                      this.setQBUrl(i, obj.object.url, 'img')
                    } 
                  }
                  // console.log(this.addSubjectForm.value);
                  this.authService.resetTime()
                }
              }
            }
          )
        } else {
          this.sharedService.openAlertSnackbarWithSeconds('File Size Exceeded.', 3)
        }


      } else {
        this.sharedService.openAlertSnackbarWithSeconds("Please Select a Valid File or Document.", 5)
      }


      //  const type = file.name.substring(file.name.lastIndexOf('.') + 1)
      // if (
      //   type == "docx" || type == "doc" || type == "pdf" || type == "pptx" || type == "ppt" ||
      //   type == "apng" || type == "png" || type == "gif" || type == "jpg" || type == "jpeg" || type == "jfif" ||
      //   type == "pjpg" || type == "pjpeg" || type == "svg" || type == "tiff" || type == "tif" || type == "mp4" ||
      //   type == "mov" || type == "wmv" || type == "avi" || type == "flv" || type == "mkv" || type == "webm") {

      //   if (type == "docx" || type == "doc" || type == "pdf") {

      //     if (this.checkFileSize(5, file.size)) {
      //       this.spinner.show();
      //       this.service.uploadFile(e.target.files[0]).subscribe(
      //         res => {
      //           // // console.log(res.object.url);
      //           if (res.status == "OK") {
      //             var reader = new FileReader();
      //             reader.readAsDataURL(e.target.files[0])
      //             reader.onload = (event: any) => {
      //               this.getAllQuestionBank.controls[i].patchValue({
      //                 preview: event.target.result,
      //                 queBankurl: res.object.url,
      //                 type: 'document'
      //               })
      //             }
      //             this.spinner.hide();
      //           }
      //         }
      //       )
      //     }



      //   } else if (type == "pptx" || type == "ppt") {

      //     if (this.checkFileSize(50, file.size)) {
      //       this.spinner.show();
      //       this.service.uploadFile(e.target.files[0]).subscribe(
      //         res => {
      //           // // console.log(res.object.url);
      //           if (res.status == "OK") {
      //             var reader = new FileReader();
      //             reader.readAsDataURL(e.target.files[0])
      //             reader.onload = (event: any) => {
      //               this.getAllQuestionBank.controls[i].patchValue({
      //                 preview: event.target.result,
      //                 queBankurl: res.object.url,
      //                 type: 'document'
      //               })
      //             }
      //             this.spinner.hide();
      //           }
      //         }
      //       )
      //     }

      //   } else if (type == "apng" || type == "png" || type == "gif" ||
      //     type == "jpg" || type == "jpeg" || type == "jfif" || type == "pjpg" || type == "pjpeg" ||
      //     type == "svg" || type == "tiff" || type == "tif"
      //   ) {

      //     if (this.checkFileSize(5, file.size)) {
      //       this.spinner.show();
      //       this.service.uploadFile(e.target.files[0]).subscribe(
      //         res => {
      //           // // console.log(res.object.url);
      //           if (res.status == "OK") {
      //             var reader = new FileReader();
      //             reader.readAsDataURL(e.target.files[0])
      //             reader.onload = (event: any) => {
      //               this.getAllQuestionBank.controls[i].patchValue({
      //                 preview: event.target.result,
      //                 queBankurl: res.object.url,
      //                 type: 'img'
      //               })
      //             }
      //             this.spinner.hide();
      //           }
      //         }
      //       )
      //     }


      //   } else if (type == "mp4" || type == "mov" || type == "wmv" || type == "avi" || type == "flv" || type == "mkv" || type == "webm") {

      //     if (this.checkFileSize(150, file.size)) {
      //       this.spinner.show();
      //       this.service.uploadFile(e.target.files[0]).subscribe(
      //         res => {
      //           // // console.log(res.object.url);
      //           if (res.status == "OK") {
      //             var reader = new FileReader();
      //             reader.readAsDataURL(e.target.files[0])
      //             reader.onload = (event: any) => {
      //               this.getAllQuestionBank.controls[i].patchValue({
      //                 preview: event.target.result,
      //                 queBankurl: res.object.url,
      //                 type: 'video'
      //               })
      //             }
      //             this.spinner.hide();
      //           }
      //         }
      //       )

      //     }


      //   }
      //   // // console.log(this.getAllTopics.controls[i]);
      // } else {
      //   this.sharedService.openSnackbar("Please Select a Valid File or Document.")
      // }
    }
  }

  addPreviousTermPaper(e: any, i) {
    const file = e.target.files[0]
    const ext = file.name.substring(file.name.lastIndexOf('.') + 1)
    if (this.docExtArr.includes(ext) || this.imgExtArr.includes(ext)) {

      if (this.checkFileSize(150, file.size)) {
        this.service.uploadFile(file).subscribe(
          (res: HttpEvent<any>) => {
            // // console.log(res);
            let _progress
            switch (res.type) {
              case HttpEventType.Sent:
                this.authService.resetTime()
                // console.log('Request has been made!');
                break;
              case HttpEventType.ResponseHeader:
                this.authService.resetTime()
                // console.log('Response header has been received!');
                break;
              case HttpEventType.UploadProgress:
                _progress = Math.round(res.loaded / res.total * 100);
                this.authService.resetTime()
                // // console.log(`Uploaded! ${_progress}%`);
                this.setPaperProgress(i, _progress)
                break;
              case HttpEventType.Response: {
                // // console.log('User successfully created!', res.body);
                const obj = res.body;

                if (obj.status == "OK") {
                  if (this.docExtArr.includes(ext)) {
                    this.setPaperUrl(i, obj.object.url, 'document')
                  } else if (this.imgExtArr.includes(ext)) {
                    this.setPaperUrl(i, obj.object.url, 'img')
                  } 
                }
                console.log(this.addSubjectForm.value);
                this.authService.resetTime()
              }
            }
          }
        )
      } else {
        this.sharedService.openAlertSnackbarWithSeconds('File Size Exceeded.', 3)
      }


    } else {
      this.sharedService.openAlertSnackbarWithSeconds("Please Select a Valid File or Document.", 5)
    }



    // const type = file.name.substring(file.name.lastIndexOf('.') + 1)
    // if (
    //   type == "docx" || type == "doc" || type == "pdf" || type == "pptx" || type == "ppt" ||
    //   type == "apng" || type == "png" || type == "gif" || type == "jpg" || type == "jpeg" || type == "jfif" ||
    //   type == "pjpg" || type == "pjpeg" || type == "svg" || type == "tiff" || type == "tif" || type == "mp4" ||
    //   type == "mov" || type == "wmv" || type == "avi" || type == "flv" || type == "mkv" || type == "webm") {

    //   if (type == "docx" || type == "doc" || type == "pdf") {
    //     //DOCUMENT FORMAT
    //     if (this.checkFileSize(5, file.size)) {
    //       this.spinner.show();
    //       this.service.uploadFile(e.target.files[0]).subscribe(
    //         res => {
    //           // // console.log(res.object.url);
    //           if (res.status == "OK") {
    //             var reader = new FileReader();
    //             reader.readAsDataURL(e.target.files[0])
    //             reader.onload = (event: any) => {
    //               this.getAllPreviousTermPapers.controls[i].patchValue({
    //                 preview: event.target.result,
    //                 url: res.object.url,
    //                 type: 'document'
    //               })
    //             }
    //             this.spinner.hide();
    //           }
    //         }
    //       )
    //     }



    //   } else if (type == "pptx" || type == "ppt") {
    //     //PPT FORMAT
    //     if (this.checkFileSize(50, file.size)) {
    //       this.spinner.show();
    //       this.service.uploadFile(e.target.files[0]).subscribe(
    //         res => {
    //           // // console.log(res.object.url);
    //           if (res.status == "OK") {
    //             var reader = new FileReader();
    //             reader.readAsDataURL(e.target.files[0])
    //             reader.onload = (event: any) => {
    //               this.getAllPreviousTermPapers.controls[i].patchValue({
    //                 preview: event.target.result,
    //                 url: res.object.url,
    //                 type: 'document'
    //               })
    //             }
    //             this.spinner.hide();
    //           }
    //         }
    //       )
    //     }

    //   } else if (type == "apng" || type == "png" || type == "gif" ||
    //     type == "jpg" || type == "jpeg" || type == "jfif" || type == "pjpg" || type == "pjpeg" ||
    //     type == "svg" || type == "tiff" || type == "tif"
    //   ) {
    //     //IMAGE FORMAT
    //     if (this.checkFileSize(5, file.size)) {
    //       this.spinner.show();
    //       this.service.uploadFile(e.target.files[0]).subscribe(
    //         res => {
    //           // // console.log(res.object.url);
    //           if (res.status == "OK") {
    //             var reader = new FileReader();
    //             reader.readAsDataURL(e.target.files[0])
    //             reader.onload = (event: any) => {
    //               this.getAllPreviousTermPapers.controls[i].patchValue({
    //                 preview: event.target.result,
    //                 url: res.object.url,
    //                 type: 'img'
    //               })
    //             }
    //             this.spinner.hide();
    //           }
    //         }
    //       )
    //     }


    //   } else if (type == "mp4" || type == "mov" || type == "wmv" || type == "avi" || type == "flv" || type == "mkv" || type == "webm") {

    //     if (this.checkFileSize(150, file.size)) {

    //       this.spinner.show();
    //       this.service.uploadFile(e.target.files[0]).subscribe(
    //         res => {
    //           // // console.log(res.object.url);
    //           if (res.status == "OK") {
    //             var reader = new FileReader();
    //             reader.readAsDataURL(e.target.files[0])
    //             reader.onload = (event: any) => {
    //               this.getAllPreviousTermPapers.controls[i].patchValue({
    //                 preview: event.target.result,
    //                 url: res.object.url,
    //                 type: 'video'
    //               })
    //             }
    //             this.spinner.hide();
    //           }
    //         }
    //       )

    //     }


    //   }


    //   // // console.log(this.getAllTopics.controls[i]);


    // } else {
    //   this.sharedService.openSnackbar("Please Select a Valid File or Document.")
    // }


    // // console.log(this.getAllPreviousTermPapers.controls[i])
  }

  public get f() {
    return this.addSubjectForm.controls;
  }



  addTopics() {
    if (this.addSubjectForm.valid) {
      this.spinner.show()
      this.service.addSubject(this.addSubjectForm.value).subscribe(
        res => {
          this.apiRes(res)
        }
      )
    } else {
      this.isError = true;
      this.sharedService.openSnackbar("Please Fill All Required Fields.")
    }
  }

  updateTopics() {
    // console.log(this.addSubjectForm.value);
    if (this.addSubjectForm.valid) {
      this.spinner.show()
      this.service.updateSubjectById(this.id, this.addSubjectForm.value).subscribe(
        res => {
          this.apiRes(res)
        }
      )
    } else {
      this.isError = true;
      this.sharedService.openSnackbar("Please Fill All Required Fields.")
    }

  }



  apiRes(res) {
    if (res.status == "OK") {
      this.spinner.hide();
      this.sharedService.openSnackbar(res.message)
      this.goBack()
    }
  }



  goBack() {
    // this.router.navigate(['/main/academic-depart/subjects/' + this.term + '/' + this.paper + '/' + this.subject])
    //change in route add term last
    this.router.navigate(['/main/academic-depart/subjects/' + this.paper + '/' + this.subject+'/' + this.term])
  }





  public onChange(event: CKEditor4.EventInfo) {
    this.authService.resetTime()
    // // console.log(event.editor.getData());
    // // console.log(event.editor)
  }

  mouseEvent(e, t) {
    // // console.log(t)
    this.authService.resetTime()
  }

  openDialog(type, url) {
    this.dialog.open(DialogComponent, {
      width: '1300px', height: '650px', data: {
        type: type, title: 'Notes', url: url
      }
    }

    )
  }

  openVideo(url) {
    window.open(this.IP + url, "_blank", "width=700,height=500")
  }




}
