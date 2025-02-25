import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit{
  categoryForm: FormGroup;
  categories: Category[] = [];
  selectedCategory: Category | null = null;
  disabled=false;
  
  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService
  ) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    const  role = localStorage.getItem('role');
  if (role == 'admin') {
    this.disabled = false;
   }
  else{
    this.disabled = true;
  }
    this.loadCategories();
  }
  loadCategories(): void {
    this.categoryService.getCategories().subscribe(response => {
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
    if (this.categoryForm.valid) {
      const category: Category = this.categoryForm.value;
      if (this.selectedCategory) {
        category.categoryId = this.selectedCategory.categoryId;
        this.categoryService.updateCategory(category).subscribe(() => {
          this.loadCategories();
          this.resetForm();
        });
      } else {
        this.categoryService.addCategory(category).subscribe(() => {
          this.loadCategories();
          this.resetForm();
        });
      }
    }
  }

  onEditCategory(category: Category): void {
    this.selectedCategory = category;
    this.categoryForm.patchValue(category);
  }

  onDeleteCategory(id: number): void {
    this.categoryService.deleteCategory(id).subscribe(() => {
      this.loadCategories();
    });
  }

  resetForm(): void {
    this.categoryForm.reset();
    this.selectedCategory = null;
  }

}

export interface Category {
  categoryId: number;
  name: string;
}
export interface ProductApiResponse {
  isSuccess: boolean;
  message: string;
  result: Category[];
}
