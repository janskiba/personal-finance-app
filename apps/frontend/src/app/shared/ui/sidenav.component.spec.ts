import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { SidenavComponent } from './sidenav.component';

describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidenavComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(SidenavComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all three nav links', () => {
    const links = fixture.debugElement.queryAll(By.css('nav a'));
    const labels = links.map((l) => l.nativeElement.textContent.trim());
    expect(labels).toEqual(['Dashboard', 'Transactions', 'Account']);
  });

  it('should show the backdrop and hide the hamburger when open() is called', async () => {
    component.open();
    await fixture.whenStable();
    fixture.detectChanges();

    const backdrop = fixture.debugElement.query(By.css('[aria-hidden="true"]'));
    const hamburger = fixture.debugElement.query(By.css('app-button[ariaLabel="Open menu"]'));

    expect(backdrop).toBeTruthy();
    expect(hamburger).toBeNull();
  });

  it('should hide the backdrop when close() is called', async () => {
    component.open();
    await fixture.whenStable();
    fixture.detectChanges();

    component.close();
    await fixture.whenStable();
    fixture.detectChanges();

    const backdrop = fixture.debugElement.query(By.css('[aria-hidden="true"]'));
    expect(backdrop).toBeNull();
  });
});
