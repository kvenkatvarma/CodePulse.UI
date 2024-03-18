import { Component, OnInit } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { BlogPostService } from '../services/blog-post.service';
import { Router } from '@angular/router';
import { CategoryService } from '../../category/services/category.service';
import { category } from '../../category/Models/category.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css']
})
export class AddBlogpostComponent implements OnInit {
model:AddBlogPost;
categories$?: Observable<category[]>;
constructor(private blogpostService:BlogPostService,private router:Router,private categoryService:CategoryService){
  this.model={
    title:'',author:'',content:'',featuredImageUrl:'',shortDescription:'',urlHandle:'',isVisible:true,publishedDate:new Date(),categories:[]

  }
}
  ngOnInit(): void {
   this.categories$=this.categoryService.getAllCategories();
  }
onFormSubmit(){
this.blogpostService.createBlogPost(this.model).subscribe({
  next:(response)=>{
    this.router.navigateByUrl('admin/blogposts');
  }
});

}
}
