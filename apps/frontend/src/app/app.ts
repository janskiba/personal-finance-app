import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '@packages/ui';

@Component({
  imports: [RouterModule, HeaderComponent],
  selector: 'app-root',
  template: `<div class="flex min-h-screen bg-(--color-bg)">

    <div class="flex flex-1 flex-col min-w-0">
      <lib-header />

      <main class="flex-1 mx-auto max-w-5xl w-full p-4">
        <router-outlet />
      </main>
    </div>
  </div>`,
})
export class App {}
