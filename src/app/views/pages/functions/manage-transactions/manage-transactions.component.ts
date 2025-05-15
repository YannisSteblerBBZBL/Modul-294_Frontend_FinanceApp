import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { Transaction } from '../../../../models/transaction.model';
import { TransactionService } from '../../../../services/transaction.service';
import { CategoryService } from '../../../../services/category.service';
import { Category } from '../../../../models/category.model';

@Component({
  selector: 'app-manage-transactions',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './manage-transactions.component.html',
  styleUrl: './manage-transactions.component.scss',
})
export class ManageTransactionsComponent implements OnInit {
  transactions: Transaction[] = [];
  categories: Category[] = [];
  transactionForm: FormGroup;
  editingTransactionId: number | null = null;
  selectedCategory: string | null = null;

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService,
    private categoryService: CategoryService,
    private modalService: NgbModal
  ) {
    this.transactionForm = this.fb.group({
      id: [null],
      type: [''],
      amount: [0],
      category_id: [null],
    });
  }

  ngOnInit(): void {
    this.loadTransactions();
    this.loadCategories();
  }

  loadTransactions(): void {
    this.transactionService.getAllTransactions().subscribe((data) => {
      this.transactions = data;
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

  openEditModal(transaction: Transaction, content: any): void {
    this.editingTransactionId = transaction.id!;
    this.transactionForm.patchValue(transaction);
    const matchedCategory = this.categories.find(cat => cat.id === transaction.category_id);
    this.selectedCategory = matchedCategory ? matchedCategory.name : null;
    this.modalService.open(content, { centered: true, backdrop: 'static' });
  }

  submitForm(modal: NgbModalRef): void {
    const formValue = this.transactionForm.value;

    if (this.editingTransactionId) {
      this.transactionService.updateTransaction(this.editingTransactionId, formValue).subscribe(() => {
        this.loadTransactions();
        modal.close();
        this.resetForm();
      });
    } else {
      this.transactionService.createTransaction(formValue).subscribe(() => {
        this.loadTransactions();
        modal.close();
        this.resetForm();
      });
    }
  }

  deleteTransaction(id: number): void {
    this.transactionService.deleteTransaction(id).subscribe(() => {
      this.loadTransactions();
    });
  }

  selectCategory(category: Category): void {
    this.selectedCategory = category.name;
    this.transactionForm.patchValue({ category_id: category.id });
  }

  private resetForm(): void {
    this.transactionForm.reset({
      id: null,
      type: '',
      amount: 0,
      category_id: null,
    });
    this.editingTransactionId = null;
    this.selectedCategory = null;
  }
}
