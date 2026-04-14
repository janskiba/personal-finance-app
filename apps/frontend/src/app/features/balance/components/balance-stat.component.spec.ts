import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { BalanceStatComponent } from './balance-stat.component';

const initialState = {
  balance: { data: null, loading: false, error: null },
};

describe('BalanceStatComponent', () => {
  let fixture: ComponentFixture<BalanceStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BalanceStatComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(BalanceStatComponent);
  });


    it('should create', () => {
      expect(fixture.componentInstance).toBeTruthy();
    });
  });
