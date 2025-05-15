import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { BudgetService } from '../../../../services/budget.service';
import { CategoryService } from '../../../../services/category.service';

import { Budget } from '../../../../models/budget.model';
import { Category } from '../../../../models/category.model';

@Component({
  selector: 'app-manage-budgets',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './manage-budgets.component.html',
  styleUrl: './manage-budgets.component.scss',
})
export class ManageBudgetsComponent implements OnInit {
  budgets: Budget[] = [];
  categories: Category[] = [];
  budgetForm: FormGroup;
  editingBudgetId: number | null = null;
  selectedCategoryName: string | null = null;

  constructor(
    private fb: FormBuilder,
    private budgetService: BudgetService,
    private categoryService: CategoryService,
    private modalService: NgbModal
  ) {
    this.budgetForm = this.fb.group({
      id: [null],
      category_id: [null, Validators.required],
      limit: [0, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.loadBudgets();
    this.loadCategories();
  }

  loadBudgets(): void {
    this.budgetService.getAllBudgets().subscribe((data) => {
      this.budgets = data;
    });
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

  openEditModal(budget: Budget, content: any): void {
    this.editingBudgetId = budget.id!;
    this.budgetForm.patchValue(budget);
    const matchedCategory = this.categories.find(cat => cat.id === budget.category_id);
    this.selectedCategoryName = matchedCategory ? matchedCategory.name : null;
    this.modalService.open(content, { centered: true, backdrop: 'static' });
  }

  submitForm(modal: NgbModalRef): void {
    const formValue = this.budgetForm.value;

    if (this.editingBudgetId) {
      this.budgetService.updateBudget(this.editingBudgetId, formValue).subscribe(() => {
        this.loadBudgets();
        modal.close();
        this.resetForm();
      });
    } else {
      this.budgetService.createBudget(formValue).subscribe(() => {
        this.loadBudgets();
        modal.close();
        this.resetForm();
      });
    }
  }

  deleteBudget(id: number): void {
    this.budgetService.deleteBudget(id).subscribe(() => {
      this.loadBudgets();
    });
  }

  selectCategory(category: Category): void {
    this.selectedCategoryName = category.name;
    this.budgetForm.patchValue({ category_id: category.id });
  }

  getCategoryName(categoryId: number): string {
    const match = this.categories.find(cat => cat.id === categoryId);
    return match ? match.name : 'Unknown';
  }

  private resetForm(): void {
    this.budgetForm.reset({
      id: null,
      category_id: null,
      limit: 0,
    });
    this.editingBudgetId = null;
    this.selectedCategoryName = null;
  }
}
