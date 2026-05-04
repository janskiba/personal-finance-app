import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChipComponent } from './chip.component';

describe('ChipComponent', () => {
  let component: ChipComponent;
  let fixture: ComponentFixture<ChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChipComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChipComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('value', 'test');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render as span by default', () => {
    expect(fixture.debugElement.nativeElement.querySelector('span')).toBeTruthy();
  });

  it('should render as button when selectable', () => {
    fixture.componentRef.setInput('selectable', true);
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('button')).toBeTruthy();
  });

  it('should emit select event on click', () => {
    let emittedValue: string | undefined;
    component.clicked.subscribe((value) => {
      emittedValue = value;
    });

    fixture.componentRef.setInput('selectable', true);
    fixture.detectChanges();

    fixture.debugElement.nativeElement.querySelector('button').click();
    expect(emittedValue).toBe('test');
  });
});
