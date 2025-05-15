import { Component, OnInit } from '@angular/core';
import { Transaction } from '../../../../models/transaction.model';
import { Category } from '../../../../models/category.model';
import { CategoryService } from '../../../../services/category.service';
import { TransactionService } from '../../../../services/transaction.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transactions-overview',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './transactions-overview.component.html',
  styleUrl: './transactions-overview.component.scss',
})
export class TransactionsOverviewComponent implements OnInit {
  transactions: Transaction[] = [];
  categories: Category[] = [];

  constructor(
    private transactionService: TransactionService,
    private categoryService: CategoryService
  ) {}

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

  getCategoryName(categoryId: number): string {
    const category = this.categories.find((cat) => cat.id === categoryId);
    return category ? category.name : 'Unknown';
  }
}
