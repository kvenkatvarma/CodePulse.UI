import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, subscribeOn } from 'rxjs';
import { BlogPostService } from '../services/blog-post.service';
import { BlogPost } from '../models/blog-post.model';
import { CategoryService } from '../../category/services/category.service';
import { category } from '../../category/Models/category.model';
import { updateBlogPost } from '../models/update-blog-post.model';

@Component({
  selector: 'app-edit-blogposts',
  templateUrl: './edit-blogposts.component.html',
  styleUrls: ['./edit-blogposts.component.css']
})
export class EditBlogpostsComponent implements OnInit,OnDestroy {

  id:string | null=null;
  paramsubscription?:Subscription;
  updatepostsubscription?:Subscription;
  getbyIdSubscription?:Subscription;
isImageSelectorVisible:boolean=false;
  deletepost?:Subscription;
  constructor(private router:ActivatedRoute,private blogservice:BlogPostService,private categoryservice:CategoryService,private route:Router){}
  ngOnDestroy(): void {
    this.paramsubscription?.unsubscribe();
    this.updatepostsubscription?.unsubscribe();
     this.getbyIdSubscription?.unsubscribe();
     this.deletepost?.unsubscribe();
  }
  model?:BlogPost;
  categories$?:Observable<category[]>;
    selectedCategories?:string[];
  onFormSubmit()
  {

     if(this.model && this.id){
      var updatepost:updateBlogPost={
        author:this.model.author,
        content:this.model.content,
        shortDescription:this.model.shortDescription,
        featuredImageUrl:this.model.featuredImageUrl,
        isVisible:this.model.isVisible,
        publishedDate:this.model.publishedDate,
        title:this.model.title,
        urlHandle:this.model.urlHandle,
        categories:this.selectedCategories ?? []
      };
     this.updatepostsubscription= this.blogservice.updateBlogPost(this.id,updatepost).subscribe({
        next:(response)=>{
          this.route.navigateByUrl('/admin/blogposts');
        }
      });
     }
  }

  onDelete(){
      if(this.id){
  this.deletepost=this.blogservice.DeletePost(this.id).subscribe({
    next:(response)=>{
        this.route.navigateByUrl('/admin/blogposts');
    }
  })
      }
  }

  closepopup(){
    this.isImageSelectorVisible=false;
  }

  openImageSelector(){
    this.isImageSelectorVisible=true;
  }
  ngOnInit(): void {

     this.categories$=this.categoryservice.getAllCategories();
        this.paramsubscription=this.router.paramMap.subscribe({
          next:(param)=>{
          this.id=  param.get('id')
          if(this.id){
               this.getbyIdSubscription= this.blogservice.getBlogPostById(this.id).subscribe({
                  next:(response)=>{
                      this.model=response;
                      this.selectedCategories=this.model.categories.map(x=>x.id);
                  }
                });
          }
          }
        })
  }
}
