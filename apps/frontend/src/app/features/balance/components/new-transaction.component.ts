import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-new-transaction',
  imports: [],
  template: `<p>new-transaction.component works!</p>`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewTransactionComponent {}
