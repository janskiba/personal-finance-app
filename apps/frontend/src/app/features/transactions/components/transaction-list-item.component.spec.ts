import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionListItemComponent } from './transaction-list-item.component';
import { Transaction } from '@packages/types';

describe('TransactionListItemComponent', () => {
  let component: TransactionListItemComponent;
  let fixture: ComponentFixture<TransactionListItemComponent>;

  const mockTransaction: Transaction = {
    id: '1',
    amount: 100,
    date: '2024-01-01',
    category: 'Food',
    type: 'expense',
    description: 'Test transaction',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionListItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionListItemComponent);
    component = fixture.componentInstance;
    TestBed.runInInjectionContext(() => {
      fixture.componentRef.setInput('transaction', mockTransaction);
      fixture.componentRef.setInput('mode', 'full');
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
