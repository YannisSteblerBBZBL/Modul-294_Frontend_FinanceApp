import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ManageTransactionsComponent } from './manage-transactions.component';
import { TransactionService } from '../../../../services/transaction.service';
import { CategoryService } from '../../../../services/category.service';
import { of } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Transaction, TransactionType } from '../../../../models/transaction.model';
import { Category } from '../../../../models/category.model';

describe('ManageTransactionsComponent', () => {
  let component: ManageTransactionsComponent;
  let fixture: ComponentFixture<ManageTransactionsComponent>;
  let mockTransactionService: jasmine.SpyObj<TransactionService>;
  let mockCategoryService: jasmine.SpyObj<CategoryService>;
  let mockModalService: jasmine.SpyObj<NgbModal>;

  const dummyTransactions: Transaction[] = [
    { id: 1, type: TransactionType.INCOME, amount: 100, category_id: 2 }
  ];

  const dummyCategories: Category[] = [
    { id: 2, name: 'Salary' }
  ];

  beforeEach(async () => {
    mockTransactionService = jasmine.createSpyObj('TransactionService', [
      'getAllTransactions',
      'createTransaction',
      'updateTransaction',
      'deleteTransaction'
    ]);
    mockCategoryService = jasmine.createSpyObj('CategoryService', ['getAllCategories']);
    mockModalService = jasmine.createSpyObj('NgbModal', ['open']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, ManageTransactionsComponent],
      providers: [
        { provide: TransactionService, useValue: mockTransactionService },
        { provide: CategoryService, useValue: mockCategoryService },
        { provide: NgbModal, useValue: mockModalService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageTransactionsComponent);
    component = fixture.componentInstance;

    // Default mock returns
    mockTransactionService.getAllTransactions.and.returnValue(of(dummyTransactions));
    mockCategoryService.getAllCategories.and.returnValue(of(dummyCategories));
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load transactions and categories on init', () => {
    expect(mockTransactionService.getAllTransactions).toHaveBeenCalled();
    expect(mockCategoryService.getAllCategories).toHaveBeenCalled();
    expect(component.transactions.length).toBeGreaterThan(0);
    expect(component.categories.length).toBeGreaterThan(0);
  });

  it('should call createTransaction on submit when not editing', () => {
    component.transactionForm.setValue({
      id: null,
      type: 'EXPENSE',
      amount: 50,
      category_id: 2
    });
    const fakeModalRef = { close: () => {} } as any;

    mockTransactionService.createTransaction.and.returnValue(of({ ...component.transactionForm.value }));

    component.submitForm(fakeModalRef);
    expect(mockTransactionService.createTransaction).toHaveBeenCalled();
  });

  it('should call updateTransaction on submit when editing', () => {
    component.editingTransactionId = 1;
    component.transactionForm.setValue({
      id: 1,
      type: 'INCOME',
      amount: 120,
      category_id: 2
    });
    const fakeModalRef = { close: () => {} } as any;

    mockTransactionService.updateTransaction.and.returnValue(of({ ...component.transactionForm.value }));

    component.submitForm(fakeModalRef);
    expect(mockTransactionService.updateTransaction).toHaveBeenCalledWith(1, jasmine.anything());
  });

  it('should call deleteTransaction', () => {
    mockTransactionService.deleteTransaction.and.returnValue(of(undefined));
    component.deleteTransaction(1);
    expect(mockTransactionService.deleteTransaction).toHaveBeenCalledWith(1);
  });

  it('should patch form and selected category when selectCategory is called', () => {
    const category: Category = { id: 2, name: 'Salary' };
    component.selectCategory(category);
    expect(component.selectedCategory).toBe('Salary');
    expect(component.transactionForm.value.category_id).toBe(2);
  });
});
