import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogPostService } from '../../blog-post/services/blog-post.service';
import { Observable } from 'rxjs';
import { BlogPost } from '../../blog-post/models/blog-post.model';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {
constructor(private route:ActivatedRoute,private blogpostservice:BlogPostService){

}
blogPost$?:Observable<BlogPost>;
url:string | null=null;
  ngOnInit(): void {

    this.route.paramMap.subscribe({
      next:(params)=>{
       this.url= params.get('url');
      }
    })
    alert(this.url);
    if(this.url){
      this.blogPost$=this.blogpostservice.getBlogPostByurlHandle(this.url);
    }
  }
}
