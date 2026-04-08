import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  LucideDynamicIcon,
  LucideLayoutDashboard,
  LucideMenu,
  LucideReceipt,
  LucideUser,
  LucideX,
} from '@lucide/angular';
import { ButtonComponent } from './button.component';

const NAV_ITEMS = [
  { label: 'Dashboard', icon: LucideLayoutDashboard, route: '/' },
  { label: 'Transactions', icon: LucideReceipt, route: '/transactions' },
  { label: 'Account', icon: LucideUser, route: '/account' },
] as const;

@Component({
  selector: 'lib-sidenav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, LucideDynamicIcon, ButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Hamburger: only visible when sidebar is closed on mobile -->
    @if (!isOpen()) {
      <lib-button
        class="fixed top-2.5 left-3 z-60 lg:hidden"
        variant="ghost"
        size="sm"
        [icon]="menuIcon"
        ariaLabel="Open menu"
        (click)="open()"
      />
    }

    <!-- Backdrop -->
    @if (isOpen()) {
      <div
        class="fixed inset-0 z-40 bg-black/40 lg:hidden"
        aria-hidden="true"
        (click)="close()"
      ></div>
    }

    <!-- Sidebar -->
    <aside
      class="fixed top-0 left-0 z-50 flex h-full w-75 lg:w-64 flex-col bg-(--color-sidenav-bg) border-r border-(--color-border)
             transition-transform duration-200 ease-in-out
             lg:translate-x-0"
      [class]="{ '-translate-x-full': !isOpen() }"
      aria-label="Main navigation"
    >
      <!-- Branding -->
      <div class="flex items-start justify-between px-6 py-6">
        <div class="flex flex-col gap-0.5">
          <h1 class="text-2xl font-bold text-(--color-primary) tracking-tight">Personal Finance</h1>
          <span class="text-(--color-text-muted)">Financial Mindfulness</span>
        </div>
        <!-- Close button: mobile only, inside branding row -->
        <lib-button
          class="lg:hidden -mr-2 -mt-1 shrink-0"
          variant="ghost"
          size="sm"
          [icon]="closeIcon"
          ariaLabel="Close menu"
          (click)="close()"
        />
      </div>

      <!-- Nav links -->
      <nav class="flex flex-col gap-1 p-3 flex-1">
        @for (item of navItems; track item.route) {
          <a
            [routerLink]="item.route"
            routerLinkActive="active-nav-link"
            [routerLinkActiveOptions]="{ exact: item.route === '/' }"
            class="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium
                   text-(--color-text-muted) transition-colors
                   hover:bg-(--color-bg) hover:text-(--color-text)
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary)"
            (click)="close()"
          >
            <svg [lucideIcon]="item.icon" [size]="18" aria-hidden="true" class="shrink-0"></svg>
            {{ item.label }}
          </a>
        }
      </nav>
    </aside>

    <!-- Spacer for desktop layout push -->
    <div class="hidden lg:block lg:w-64 shrink-0"></div>
  `,
  styles: `
    :host {
      display: contents;
    }

    .active-nav-link {
      background-color: color-mix(in srgb, var(--color-primary) 12%, transparent);
      color: var(--color-primary);
      font-weight: 600;
    }
  `,
})
export class SidenavComponent {
  protected readonly navItems = NAV_ITEMS;
  protected readonly isOpen = signal(false);
  protected readonly menuIcon = LucideMenu;
  protected readonly closeIcon = LucideX;

  toggle(): void {
    this.isOpen.update((v) => !v);
  }

  open(): void {
    this.isOpen.set(true);
  }

  close(): void {
    this.isOpen.set(false);
  }
}
