import { Injectable, signal } from '@angular/core';

export type SessionMode = 'guest' | 'authenticated';

@Injectable({ providedIn: 'root' })
export class SessionService {
  readonly mode = signal<SessionMode>('guest');
}
