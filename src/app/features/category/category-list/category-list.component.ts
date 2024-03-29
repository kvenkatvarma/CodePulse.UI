import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { category } from '../Models/category.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
 // categories?:category[];

 categories$?: Observable<category[]>;
constructor(private categoryService:CategoryService){}

  ngOnInit(): void {
    this.categories$=this.categoryService.getAllCategories();
  }
}
