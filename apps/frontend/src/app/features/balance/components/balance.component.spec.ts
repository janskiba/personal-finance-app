import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { BalanceComponent } from './balance.component';
import { SessionService } from '../../../session/session.service';

describe('BalanceComponent', () => {
  let component: BalanceComponent;
  let fixture: ComponentFixture<BalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BalanceComponent],
      providers: [
        provideMockStore({
          initialState: {
            balance: {
              data: null,
              loading: false,
              error: null,
            },
            transactions: {
              transactions: [],
              loading: false,
              error: null,
            },
          },
        }),
        SessionService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
