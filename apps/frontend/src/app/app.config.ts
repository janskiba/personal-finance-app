import {
  ApplicationConfig,
  isDevMode,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { appRoutes } from './app.routes';
import { initTheme } from '@packages/ui';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { balanceFeature } from './features/balance/state/balance.reducer';
import { BalanceEffects } from './features/balance/state/balance.effects';
import { transactionsFeature } from './features/transactions/state/transactions.reducer';
import { TransactionsEffects } from './features/transactions/state/transactions.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(appRoutes),
    provideHttpClient(),
    provideStore({
      [balanceFeature.name]: balanceFeature.reducer,
      [transactionsFeature.name]: transactionsFeature.reducer,
    }),
    provideEffects([BalanceEffects, TransactionsEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
    }),
    provideAppInitializer(initTheme),
  ],
};
