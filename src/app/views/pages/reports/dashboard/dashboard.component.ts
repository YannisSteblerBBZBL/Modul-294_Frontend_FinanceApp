import { Component, OnInit } from '@angular/core';
import { Budget } from '../../../../models/budget.model';
import { Category } from '../../../../models/category.model';
import { Transaction, TransactionType } from '../../../../models/transaction.model';
import { BudgetService } from '../../../../services/budget.service';
import { CategoryService } from '../../../../services/category.service';
import { TransactionService } from '../../../../services/transaction.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class DashboardComponent implements OnInit {
  budgets: Budget[] = [];
  categories: Category[] = [];
  transactions: Transaction[] = [];
  recentTransactions: Transaction[] = [];

  incomeTransactionsCount = 0;
  expenseTransactionsCount = 0;

  constructor(
    private budgetService: BudgetService,
    private categoryService: CategoryService,
    private transactionService: TransactionService
  ) {}

  ngOnInit(): void {
    this.loadBudgets();
    this.loadCategories();
    this.loadTransactions();
  }

  loadBudgets() {
    this.budgetService.getAllBudgets().subscribe(budgets => {
      this.budgets = budgets;
    });
  }

  loadCategories() {
    this.categoryService.getAllCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  loadTransactions() {
    this.transactionService.getAllTransactions().subscribe(transactions => {
      this.transactions = transactions;
      this.recentTransactions = transactions.slice(0, 5);
      this.calculateTransactionTypes();
    });
  }

  calculateTransactionTypes() {
    this.incomeTransactionsCount = this.transactions.filter(
      transaction => transaction.type === TransactionType.INCOME
    ).length;
    
    this.expenseTransactionsCount = this.transactions.filter(
      transaction => transaction.type === TransactionType.EXPENSE
    ).length;
  }

  getExpensesForBudget(categoryId: number): number {
    const budgetTransactions = this.transactions.filter(transaction => transaction.category_id === categoryId);
    return budgetTransactions.reduce((sum, transaction) => {
      if (transaction.type === TransactionType.EXPENSE) {
        return sum + transaction.amount;
      }
      return sum;
    }, 0);
  }

  getCategoryNameById(categoryId: number): string {
    const category = this.categories.find(c => c.id === categoryId);
    return category ? category.name : 'Unbekannt';
  }

  getBudgetUsagePercentage(categoryId: number): number {
    const totalBudget = this.budgets.find(b => b.category_id === categoryId)?.limit_amount || 0;
    const totalExpenses = this.getExpensesForBudget(categoryId);
    return totalBudget > 0 ? (totalExpenses / totalBudget) * 100 : 0;
  }

  get totalBalance(): number {
    return this.transactions.reduce((balance, transaction) => {
      if (transaction.type === TransactionType.INCOME) {
        return balance + transaction.amount;
      } else if (transaction.type === TransactionType.EXPENSE) {
        return balance - transaction.amount;
      }
      return balance;
    }, 0);
  }

  get totalTransactionsCount(): number {
    return this.transactions.length;
  }

  get averageExpenseAmount(): number {
    const expenseTransactions = this.transactions.filter(transaction => transaction.type === TransactionType.EXPENSE);
    const totalExpenseAmount = expenseTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);
    return expenseTransactions.length ? totalExpenseAmount / expenseTransactions.length : 0;
  }
}
