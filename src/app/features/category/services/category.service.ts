import { Injectable } from '@angular/core';
import { AddCategoryRequest } from '../Models/add-Category-request.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { category } from '../Models/category.model';
import { environment } from 'src/environments/environment.development';
import { updateCategoryRequest } from '../Models/update-category-request.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }


  getAllCategories():Observable<category[]>{
    return this.http.get<category[]>(`${environment.apiBaseUrl}/api/Categories`);
  }

  getCategoryById(id:string):Observable<category>{
    return this.http.get<category>(`${environment.apiBaseUrl}/api/Categories/${id}`);
  }
  updateCategory(id:string,updateRequest:updateCategoryRequest):Observable<category>{
    return this.http.put<category>(`${environment.apiBaseUrl}/api/Categories/${id}?addAuth=true`,updateRequest);
  }
  addCategory(model:AddCategoryRequest):Observable<void>
  {
  return this.http.post<void>(`${environment.apiBaseUrl}/api/Categories?addAuth=true`,model);
  }
  deleteCategory(id:string):Observable<category>{
    return this.http.delete<category>(`${environment.apiBaseUrl}/api/Categories/${id}?addAuth=true`);
  }
}
