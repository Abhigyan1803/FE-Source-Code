import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomePageService } from 'app/service/home/home-page.service';
import { SharedService } from 'app/service/shared.service';
import { NgxSpinnerService } from 'ngx-spinner';
import {DomSanitizer,SafeResourceUrl,} from '@angular/platform-browser';
import { Links } from 'app/links.module';


export interface Blog{
  approvedBy: string
  approvedDate: string
  author: string
  blogImage: string
  category: string
  description: string
  id: number
  isCadet: number
  minutesOfReading: string
  status: number
  title: string
  docs:any
}


@Component({
  selector: 'ms-read-blog',
  templateUrl: './read-blog.component.html',
  styleUrls: ['./read-blog.component.scss']
})
export class ReadBlogComponent implements OnInit {
  blog:Blog;
  recentBlogs:any[]=[];
  IP=Links.IP

  blogCategory: any[] = ['Lifestyle', 'Fitness', 'Sports', 'Warfare', 'Entertainment', 'Arts', 'Historical'];

  id
  loadedContent:boolean = false;
  
  
  constructor(private router:Router, private route:ActivatedRoute, private spinner:NgxSpinnerService, 
    private service:HomePageService, private sharedService:SharedService, private cdref:ChangeDetectorRef,
    public sanitizer:DomSanitizer
    ) { 
      // this.id = this.route.snapshot.queryParamMap.get('id')
   
  
    }

  ngOnInit(): void {
    document.getElementById('foot-id').style.position = 'relative';
  }

  ngAfterViewInit(){
       this.route.params.subscribe((params) => {
        this.id = params.id;
        this.getBlog()
    this.getRecentBlogs()
      });
  }

  getBlog(){
    this.service.getIMABlogById(this.id).subscribe(
      res=>{
      //   console.log("=============================")
      // console.log(res)
      //   console.log("=============================")

        if(res.status == "OK"){
          this.blog = res.object
          if(this.blog.docs){
 this.blog.docs = this.sanitizer.bypassSecurityTrustResourceUrl(this.IP+this.blog.docs);
          
          }
         
          this.cdref.detectChanges();
          
        }
      }
    )
  }

  contentLoaded(){
    this.loadedContent = true;
    // console.log('CONTENT LOADED...');
    
  }
  getRecentBlogs(){
    this.recentBlogs=[];
    this.service.getIMABlogList(0,5).subscribe(
      res => {
        console.log("RECENT BLOGS: ",res);
        if (res.status == 'OK') {
          if (res.object.blogList.length) {

            this.recentBlogs = res.object.blogList
            
            this.cdref.detectChanges()
          }
        }
        
      }
    ) }

  noImg(e:any){
    e.target.src = "assets/img/default-doc-image.jpg"
  }

  viewCat(cat){
    this.router.navigate(['/pages/ima-blog'],{queryParams:{cat:cat}})
  }

  readBlog(b) {
    // localStorage.setItem('blog',JSON.stringify(b))
    const urlArr =  this.router.url.split('/')
    let url = '';
     for(let i=0;i<urlArr.length-1;i++){
       url = url+'/'+urlArr[i];
     } 
      this.router.navigate([`${url}/${b.id}`]);
    }
}
