import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { HomePageService } from 'app/service/home/home-page.service';
import { SharedService } from 'app/service/shared.service';
import { NgxSpinnerService } from 'ngx-spinner';

import { merge } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { of as observableOf } from 'rxjs/observable/of';
import { Links } from 'app/links.module';
import { AuthService } from 'app/service/auth-service/auth.service';

@Component({
  selector: 'ms-ima-blog',
  templateUrl: './ima-blog.component.html',
  styleUrls: ['./ima-blog.component.scss']
})
export class ImaBlogComponent implements OnInit {
  IP = Links.IP;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  resultsLength:number
  imaBlogsList: any[] = [];
  category: string = '';
  catName: string = "All Category"
  isLoggedIn:boolean;
  userDetails:any;

  constructor(private service: HomePageService, private sharedService: SharedService, private spinner: NgxSpinnerService,
    private router: Router, private route: ActivatedRoute, private cdref:ChangeDetectorRef,private authService:AuthService ) {
  }
 
  ngOnInit(): void {
    // document.getElementById('foot-id').style.position = 'relative';
    if(localStorage.getItem('jwtToken')){
      this.authService.isLoggedIn = true;
      this.isLoggedIn = true;
      this.userDetails = JSON.parse(localStorage.getItem('loginResponse')).object
    }
  }

  ngAfterViewInit() {
    this.route.queryParams.subscribe(p => {
console.log(p);
      if(p.cat){
    this.category = p.cat;

        this.catName = this.category;
        this.getBlogsByCategory()
      
      } else {
        this.catName = "All Category"
        this.getImaBlogList();
      }

    
    }
    );
  }
  addBlog() {
    this.router.navigate([`/pages/add-imablog`])
  }
  getImaBlogList() {


    merge(/* this.sort.sortChange,  */this.paginator.page)
    .pipe(
      startWith({}),
      switchMap(() => {
        this.spinner.show()
        return this.service.getIMABlogList(this.paginator.pageIndex,this.paginator.pageSize)
      })
      , map(data => {
        this.resultsLength = data.object.totalRecords;
        // console.log("DATA: ",data);
        return data;
      }),
      catchError(() => {
        console.log('===========Error here============')
        this.spinner.hide()
        return observableOf([]);
        // return null;
      })
    ).subscribe(data => {
      // console.log("DATA RECIEVED: ", data)
      if (data.status == 'OK') {
        this.resultsLength = data.object.totalRecords;
        this.imaBlogsList = data.object.blogList;
        if (data.object.blogList.length > 0) {
          this.imaBlogsList = data.object.blogList;
        } else {
          this.imaBlogsList = [];
        }
        this.cdref.detectChanges();
      }
      else {
        this.imaBlogsList = []
      }
      this.spinner.hide()
    
    });


    // this.service.getIMABlogList(0,10).subscribe(
    //   res => {
    //     console.log("BLOGS: ",res);
    //     if (res.status == 'OK') {
    //       if (res.object.blogList.length) {
    //         this.imaBlogsList = res.object.blogList
    //       }
    //     }
    //   }
    // )
  }

  getBlogsByCategory() {
    this.service.getIMABlogByCategory(this.category).subscribe(
      res => {
        console.log(res);
        if (res.status == 'OK') {
          if (res.object.length) {
            this.imaBlogsList = res.object
          }
        }
      }
    )
  }

  readBlog(b) {
    const url = this.router.url
      this.router.navigate([`/pages/read-blog/${b.id}`]);
    }



}
