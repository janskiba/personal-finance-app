import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent, SidenavComponent } from '@packages/ui';

@Component({
  imports: [RouterModule, HeaderComponent, SidenavComponent],
  selector: 'app-root',
  template: `<div class="flex min-h-screen bg-(--color-bg)">
    <lib-sidenav />

    <div class="flex flex-1 flex-col min-w-0">
      <lib-header />

      <main class="flex-1 p-6">
        <router-outlet />
      </main>
    </div>
  </div>`,
})
export class App {}
