import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './shared/ui/header.component';
import { SidenavComponent } from './shared/ui/sidenav.component';

@Component({
  imports: [RouterModule, HeaderComponent, SidenavComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
