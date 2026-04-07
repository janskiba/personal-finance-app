import { TestBed } from '@angular/core/testing';

import { ThemeService } from './theme.service';
import { APP_THEME_STORAGE_KEY } from './init-theme';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    localStorage.clear();

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockReturnValue({ matches: false }),
    });

    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should toggle theme from light to dark', () => {
    service.setTheme('light');
    service.toggleTheme();
    expect(service.theme()).toBe('dark');
  });

  it('should toggle theme from dark to light', () => {
    service.setTheme('dark');
    service.toggleTheme();
    expect(service.theme()).toBe('light');
  });

  it('should persist theme to localStorage when set', () => {
    service.setTheme('dark');
    expect(localStorage.getItem(APP_THEME_STORAGE_KEY)).toBe('dark');
  });

  it('should apply data-theme attribute to document element', () => {
    service.setTheme('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });
});
