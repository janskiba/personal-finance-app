import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LucideSave } from '@lucide/angular';
import { ButtonComponent } from './button.component';

describe('Button', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('defaults to type="button"', () => {
    const button = fixture.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;
    expect(button.type).toBe('button');
  });

  it('applies the type attribute', () => {
    fixture.componentRef.setInput('type', 'submit');
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;
    expect(button.type).toBe('submit');
  });

  it('disables the button when disabled is true', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;
    expect(button.disabled).toBe(true);
  });

  it('sets the aria-label attribute', () => {
    fixture.componentRef.setInput('ariaLabel', 'Close dialog');
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;
    expect(button.getAttribute('aria-label')).toBe('Close dialog');
  });

  it('includes primary variant classes by default', () => {
    const button = fixture.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;
    expect(button.className).toContain('bg-(--color-primary)');
  });

  it('applies secondary variant classes', () => {
    fixture.componentRef.setInput('variant', 'secondary');
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;
    expect(button.className).toContain('border-(--color-border)');
  });

  it('applies danger variant classes', () => {
    fixture.componentRef.setInput('variant', 'danger');
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;
    expect(button.className).toContain('bg-red-600');
  });

  it('applies size classes for sm', () => {
    fixture.componentRef.setInput('size', 'sm');
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;
    expect(button.className).toContain('h-8');
  });

  it('applies size classes for lg', () => {
    fixture.componentRef.setInput('size', 'lg');
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;
    expect(button.className).toContain('h-12');
  });

  it('applies w-full when fullWidth is true', () => {
    fixture.componentRef.setInput('fullWidth', true);
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;
    expect(button.className).toContain('w-full');
  });

  it('renders the icon svg when icon is provided', () => {
    fixture.componentRef.setInput('icon', LucideSave);
    fixture.detectChanges();
    const svg = fixture.debugElement.query(By.css('svg'));
    expect(svg).toBeTruthy();
  });

  it('does not render an svg when icon is null', () => {
    const svg = fixture.debugElement.query(By.css('svg'));
    expect(svg).toBeNull();
  });
});
