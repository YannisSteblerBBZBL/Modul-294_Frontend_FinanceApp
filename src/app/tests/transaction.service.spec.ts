import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Transaction, TransactionType } from '../models/transaction.model';
import { TransactionService } from '../services/transaction.service';

describe('TransactionService', () => {
  let service: TransactionService;
  let httpMock: HttpTestingController;

  const dummyTransaction: Transaction = {
    id: 1,
    type: TransactionType.INCOME,
    amount: 100,
    category_id: 2,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TransactionService],
    });

    service = TestBed.inject(TransactionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // ensure no outstanding requests
  });

  it('should retrieve all transactions', () => {
    const mockData: Transaction[] = [dummyTransaction];

    service.getAllTransactions().subscribe((transactions) => {
      expect(transactions.length).toBe(1);
      expect(transactions).toEqual(mockData);
    });

    const req = httpMock.expectOne('http://localhost:9090/api/transactions');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should retrieve a transaction by ID', () => {
    service.getTransactionById(1).subscribe((transaction) => {
      expect(transaction).toEqual(dummyTransaction);
    });

    const req = httpMock.expectOne('http://localhost:9090/api/transactions/1');
    expect(req.request.method).toBe('GET');
    req.flush(dummyTransaction);
  });

  it('should create a transaction', () => {
    service.createTransaction(dummyTransaction).subscribe((transaction) => {
      expect(transaction).toEqual(dummyTransaction);
    });

    const req = httpMock.expectOne('http://localhost:9090/api/transactions');
    expect(req.request.method).toBe('POST');
    req.flush(dummyTransaction);
  });

  it('should update a transaction', () => {
    service.updateTransaction(1, dummyTransaction).subscribe((transaction) => {
      expect(transaction).toEqual(dummyTransaction);
    });

    const req = httpMock.expectOne('http://localhost:9090/api/transactions/1');
    expect(req.request.method).toBe('PUT');
    req.flush(dummyTransaction);
  });
});
