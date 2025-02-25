import { Component, OnInit } from '@angular/core';
import { ProductService, Product, ProductApiResponse, CategoryApiResponse } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  sortColumn = 'productId';
  sortDirection = 'asc';
  disabled=false;
  constructor(private productService: ProductService, private router: Router) {}
  
  ngOnInit(): void {
  const  role = localStorage.getItem('role');
 if (role == 'admin') {
    this.disabled = false;
 }
  else{
    this.disabled = true;
   }
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts(this.page, this.pageSize, this.sortColumn, this.sortDirection).subscribe(
      (response: ProductApiResponse) => {
        console.log('API response:', response);

        // Extract products from the response
        if (response.isSuccess && Array.isArray(response.result)) {
          this.products = [...response.result]; // Ensure immutability
          this.loadCategories();
          console.log('Products:', this.products);
        } else {
          console.error('API response does not contain a valid result array:', response);
        }
      },
      error => {
        console.error('Error loading products:', error);
      }
    );
  }

  loadCategories(): void {
    this.productService.getCategories().subscribe(
      (response: CategoryApiResponse) => {
        if (response.isSuccess && Array.isArray(response.result)) {
          const categories = response.result.reduce((acc: { [key: number]: string }, category) => {
            acc[category.categoryId] = category.name;
            return acc;
          }, {});

          this.products = this.products.map(product => ({
            ...product,
            categoryName: categories[product.categoryId] || 'Unknown'
          }));
        } else {
          console.error('Error loading categories:', response);
        }
      },
      error => {
        console.error('Error loading categories:', error);
      }
    );
  }
  
  addProduct(): void {
    this.router.navigate(['/product-form']);
  }

  editProduct(id: number): void {
    this.router.navigate(['/product-form', id]);
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(() => {
      this.loadProducts();
    });
  }
  onPageChange(page: number): void {
    this.page = page;
    this.loadProducts();
  }

  onSortChange(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.loadProducts();
  }

  getTotalPages(): number[] {
    return Array(Math.ceil(this.collectionSize / this.pageSize)).fill(0).map((x, i) => i + 1);
  }
  
}