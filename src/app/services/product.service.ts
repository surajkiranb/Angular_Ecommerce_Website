import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  productId: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: number;
  categoryName?: string;
  releaseDate?: string; 
  futureStock?: number; 
}

export interface Category {
  categoryId: number;
  name: string;
}

export interface ProductApiResponse {
  isSuccess: boolean;
  message: string;
  result: Product[];
}

export interface CategoryApiResponse {
  isSuccess: boolean;
  message: string;
  result: Category[];
}

export interface SingleProductApiResponse {
  isSuccess: boolean;
  message: string;
  result: Product;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:5188/api/Product'; // Replace with your API URL
  private categoryUrl = 'http://localhost:5188/api/Category'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = 'your-bearer-token-here'; // Replace this with the actual token retrieval logic
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getProducts(page: number, pageSize: number, sortColumn: string, sortDirection: string): Observable<ProductApiResponse> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString())
      .set('sortColumn', sortColumn)
      .set('sortDirection', sortDirection);

    return this.http.get<ProductApiResponse>(this.apiUrl,{ headers: this.getHeaders(),params });
  }

  getProduct(id: number): Observable<SingleProductApiResponse> {
    return this.http.get<SingleProductApiResponse>(`${this.apiUrl}/${id}`,{ headers: this.getHeaders() });
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product,{ headers: this.getHeaders() });
  }

  updateProduct(product: Product): Observable<SingleProductApiResponse> {
    debugger;
    return this.http.put<SingleProductApiResponse>(`${this.apiUrl}`, product,{ headers: this.getHeaders() });
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`,{ headers: this.getHeaders() });
  }

  getCategories(): Observable<CategoryApiResponse> {
    return this.http.get<CategoryApiResponse>(this.categoryUrl,{ headers: this.getHeaders() });
  }
}