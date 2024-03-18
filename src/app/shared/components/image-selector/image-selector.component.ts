import { Component, OnInit, ViewChild } from '@angular/core';
import { ImageService } from './image.service';
import { BlogImage } from '../../models/blog-image.model';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.css']
})
export class ImageSelectorComponent implements OnInit {

  imagedata$?:Observable<BlogImage[]>;
  @ViewChild('form',{static:false}) imageuploadform?:NgForm;

  constructor(private imageService:ImageService){

  }
  ngOnInit(): void {
    this.getImages();
  }
  private file?:File;
  fileName:string='';
  title:string='';
  onFileUploadChange(event:Event){
const element=event.currentTarget as HTMLInputElement;
this.file=element.files?.[0]
  }

  getImages(){
    this.imagedata$=this.imageService.getAllImages();
  }

  uploadImage(){
    if(this.file && this.fileName && this.title){
   this.imageService.uploadImage(this.file,this.fileName,this.title).subscribe({
    next:(response)=>{
      this.imageuploadform?.resetForm();
      this.getImages();
    }
   })
    }
  }
}
