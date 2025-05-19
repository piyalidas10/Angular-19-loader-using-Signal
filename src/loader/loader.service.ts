import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  #loadingSignal = signal<boolean>(false);
  loading = this.#loadingSignal.asReadonly();

  loadingOn() {
    console.log('loadingOn');
    this.#loadingSignal.set(true);
  }

  loadingOff() {
    console.log('loadingOff');
    this.#loadingSignal.set(false);
  }
}
