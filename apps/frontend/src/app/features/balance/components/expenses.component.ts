import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-expenses',
  imports: [],
  template: `<p>expenses.component works!</p>`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpensesComponent {}
