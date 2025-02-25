import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Category {
  categoryId: number;
  name: string;
}

export interface CategoryApiResponse {
  isSuccess: boolean;
  message: string;
  result: Category[];
}

export interface SingleCategoryApiResponse {
  isSuccess: boolean;
  message: string;
  result: Category;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  
  private categoryUrl = 'http://localhost:5188/api/Category'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  getCategories(): Observable<CategoryApiResponse> {
    return this.http.get<CategoryApiResponse>(this.categoryUrl);
  }

  getCategory(id: number): Observable<SingleCategoryApiResponse> {
    return this.http.get<SingleCategoryApiResponse>(`${this.categoryUrl}/${id}`);
  }

  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.categoryUrl, category);
  }

  updateCategory(category: Category): Observable<SingleCategoryApiResponse> {
    return this.http.put<SingleCategoryApiResponse>(`${this.categoryUrl}`, category);
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.categoryUrl}/${id}`);
  }
}