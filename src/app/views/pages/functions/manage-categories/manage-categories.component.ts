import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from '../../../../services/category.service';
import { Category } from '../../../../models/category.model';

@Component({
  selector: 'app-manage-categories',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './manage-categories.component.html',
  styleUrl: './manage-categories.component.scss',
})
export class ManageCategoriesComponent implements OnInit {
  categories: Category[] = [];
  categoryForm: FormGroup;
  editingCategoryId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private modalService: NgbModal
  ) {
    this.categoryForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  openNewModal(content: any): void {
    this.resetForm();
    this.modalService.open(content, { centered: true, backdrop: 'static' });
  }

  openEditModal(category: Category, content: any): void {
    this.editingCategoryId = category.id!;
    this.categoryForm.patchValue(category);
    this.modalService.open(content, { centered: true, backdrop: 'static' });
  }

  submitForm(modal: NgbModalRef): void {
    const formValue = this.categoryForm.value;

    if (this.editingCategoryId) {
      this.categoryService.updateCategory(this.editingCategoryId, formValue).subscribe(() => {
        this.loadCategories();
        modal.close();
        this.resetForm();
      });
    } else {
      this.categoryService.createCategory(formValue).subscribe(() => {
        this.loadCategories();
        modal.close();
        this.resetForm();
      });
    }
  }

  deleteCategory(id: number): void {
    this.categoryService.deleteCategory(id).subscribe(() => {
      this.loadCategories();
    });
  }

  private resetForm(): void {
    this.categoryForm.reset({ id: null, name: '' });
    this.editingCategoryId = null;
  }
}
