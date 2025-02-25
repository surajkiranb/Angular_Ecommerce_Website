import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService, Product, Category } from '../services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  productId: number | null = null;
  categories: Category[] = [];
  product: Product = { productId: 0, name: '', description: '', price: 0, stock: 0, categoryId: 0 };

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, Validators.required],
      stock: [0, Validators.required],
      categoryId: [0, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCategories();
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      console.log('Product ID:', id);
      if (id) {
        this.productId = +id;
        console.log('Load ID')
        this.loadProduct(this.productId);
      }
    });
  } 

  loadProduct(id: number): void {
    this.productService.getProduct(id).subscribe(response => {
      if (response.isSuccess) {
        console.log(response.result);
        this.product = response.result;
        this.productForm.patchValue(this.product);
      } else {
        console.error('Failed to load product:', response.message);
      }
    }, error => {
      console.error('Error loading product:', error);
    });
  }

  loadCategories(): void {
    this.productService.getCategories().subscribe(response => {
      if (response.isSuccess && Array.isArray(response.result)) {
        this.categories = response.result;
      } else {
        console.error('Failed to load categories:', response.message);
      }
    }, error => {
      console.error('Error loading categories:', error);
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      debugger;
      console.log('update');
      const product: Product = this.productForm.value;
      if (this.productId) {
        product.productId = this.productId;
        console.log(product);
        this.productService.updateProduct(product).subscribe(() => {
          this.router.navigate(['/product']);
        });
      } else {
        this.productService.addProduct(product).subscribe(() => {
          this.router.navigate(['/product']);
        });
      }
    }
  }
}