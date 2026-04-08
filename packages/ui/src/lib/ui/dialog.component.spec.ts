import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DialogComponent } from './dialog.component';

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders a dialog element with role="dialog"', () => {
    const dialog = fixture.debugElement.query(By.css('[role="dialog"]'));
    expect(dialog).toBeTruthy();
  });

  it('sets aria-modal="true" on the dialog', () => {
    const dialog = fixture.debugElement.query(By.css('[role="dialog"]'))
      .nativeElement as HTMLElement;
    expect(dialog.getAttribute('aria-modal')).toBe('true');
  });

  it('renders a close button with aria-label', () => {
    const closeBtn = fixture.debugElement.query(By.css('button[aria-label="Close dialog"]'));
    expect(closeBtn).toBeTruthy();
  });

  it('emits closeDialog when the close button is clicked', () => {
    const emitSpy = vi.spyOn(component.closeDialog, 'emit');
    const closeBtn = fixture.debugElement.query(By.css('button[aria-label="Close dialog"]'))
      .nativeElement as HTMLButtonElement;
    closeBtn.click();
    expect(emitSpy).toHaveBeenCalledTimes(1);
  });

  it('emits closeDialog when the backdrop is clicked', () => {
    const emitSpy = vi.spyOn(component.closeDialog, 'emit');
    const backdrop = fixture.debugElement.query(By.css('[aria-hidden="true"]'))
      .nativeElement as HTMLElement;
    backdrop.click();
    expect(emitSpy).toHaveBeenCalledTimes(1);
  });

  it('applies md max-width class by default', () => {
    const panel = fixture.debugElement.query(By.css('[role="dialog"] > div'))
      .nativeElement as HTMLElement;
    expect(panel.className).toContain('max-w-md');
  });

  it('applies sm max-width class when width is sm', () => {
    fixture.componentRef.setInput('width', 'sm');
    fixture.detectChanges();
    const panel = fixture.debugElement.query(By.css('[role="dialog"] > div'))
      .nativeElement as HTMLElement;
    expect(panel.className).toContain('max-w-sm');
  });

  it('applies lg max-width class when width is lg', () => {
    fixture.componentRef.setInput('width', 'lg');
    fixture.detectChanges();
    const panel = fixture.debugElement.query(By.css('[role="dialog"] > div'))
      .nativeElement as HTMLElement;
    expect(panel.className).toContain('max-w-lg');
  });

  it('applies xl max-width class when width is xl', () => {
    fixture.componentRef.setInput('width', 'xl');
    fixture.detectChanges();
    const panel = fixture.debugElement.query(By.css('[role="dialog"] > div'))
      .nativeElement as HTMLElement;
    expect(panel.className).toContain('max-w-xl');
  });

  it('applies max-h-[80vh] to the panel', () => {
    const panel = fixture.debugElement.query(By.css('[role="dialog"] > div'))
      .nativeElement as HTMLElement;
    expect(panel.className).toContain('max-h-[80vh]');
  });

  it('renders the blurred backdrop', () => {
    const backdrop = fixture.debugElement.query(By.css('.backdrop-blur-sm'));
    expect(backdrop).toBeTruthy();
  });
});
