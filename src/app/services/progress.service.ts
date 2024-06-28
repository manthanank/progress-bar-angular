import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProgressService {
  private progress = new BehaviorSubject<number>(0);

  constructor() {}

  getProgress() {
    return this.progress.asObservable();
  }

  setProgress(progress: number) {
    this.progress.next(progress);
  }

  reset() {
    this.progress.next(0);
  }

  complete() {
    this.progress.next(100);
  }
}
